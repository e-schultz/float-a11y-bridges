
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SchemaEditor from "@/components/SchemaEditor";
import SchemaRenderer from "@/components/SchemaRenderer";
import { schemaExamples, simpleFormSchema, continuityBridgeSchema, clinicalFormSchema } from "@/lib/schema-examples";
import { UISchema } from "@/components/SchemaRenderer";

const SchemaExplorer = () => {
  const [activeSchema, setActiveSchema] = useState<UISchema>(schemaExamples[0]);
  const [mode, setMode] = useState<"explore" | "edit">("explore");

  const handleSchemaSelect = (schemaId: string) => {
    const selected = schemaExamples.find(schema => schema.id === schemaId);
    if (selected) {
      setActiveSchema(selected);
    }
  };

  const handleModeToggle = () => {
    setMode(mode === "explore" ? "edit" : "explore");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <header className="border-b border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-pink-500 font-bold text-xl mr-2">FLOAT</span>
          <span className="text-gray-400 text-sm">Schema Explorer</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleModeToggle}
        >
          {mode === "explore" ? "Edit Mode" : "Explore Mode"}
        </Button>
      </header>

      <main className="p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Schema-Driven UI</CardTitle>
              <CardDescription className="text-gray-400">
                Explore and edit UI schemas that drive dynamic interface generation
              </CardDescription>
              <div className="mt-4">
                <Select onValueChange={handleSchemaSelect} defaultValue={activeSchema.id}>
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Select a schema example" />
                  </SelectTrigger>
                  <SelectContent>
                    {schemaExamples.map((schema) => (
                      <SelectItem key={schema.id} value={schema.id}>
                        {schema.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-400 mb-6">
                <p>Schema-driven UIs allow dynamic reconfiguration based on context, following your principle that "form fields are cognitive interfaces, moments of care".</p>
              </div>
              
              {mode === "explore" ? (
                <SchemaRenderer schema={activeSchema} />
              ) : (
                <SchemaEditor initialSchema={activeSchema} />
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>About Schema-Driven UIs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Form Fields as Moments of Care</h3>
                <p className="text-gray-300">
                  This schema-driven approach embodies your philosophy that form fields aren't just data containers but moments of care—touchpoints where practitioners interact with patients through the medium of technology.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Integration vs. Conquest</h3>
                <p className="text-gray-300">
                  By separating the schema (data and structure) from the presentation (UI components), we support practitioner workflow rather than forcing rigid processes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Shacks not Cathedrals</h3>
                <p className="text-gray-300">
                  Each component is focused, modular, and adaptable—following your "shacks not cathedrals" philosophy with flexible, adaptable structures over rigid monoliths.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SchemaExplorer;
