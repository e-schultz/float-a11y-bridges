
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UISchema } from "./SchemaRenderer";
import SchemaRenderer from "./SchemaRenderer";
import { toast } from "sonner";

interface SchemaEditorProps {
  initialSchema?: UISchema;
  onSave?: (schema: UISchema) => void;
}

const SchemaEditor = ({ initialSchema, onSave }: SchemaEditorProps) => {
  const [activeTab, setActiveTab] = useState<string>("preview");
  const [schemaText, setSchemaText] = useState<string>(
    initialSchema ? JSON.stringify(initialSchema, null, 2) : ""
  );
  const [currentSchema, setCurrentSchema] = useState<UISchema | null>(initialSchema || null);
  const [error, setError] = useState<string | null>(null);

  const handleSchemaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSchemaText(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value) as UISchema;
      setCurrentSchema(parsed);
      setError(null);
    } catch (err) {
      setError("Invalid JSON schema");
    }
  };

  const handleSave = () => {
    if (!currentSchema) {
      toast.error("No valid schema to save");
      return;
    }
    
    if (onSave) {
      onSave(currentSchema);
      toast.success("Schema saved successfully");
    } else {
      toast.info("Schema validated successfully");
    }
  };

  const handleValueChange = (fieldId: string, value: any) => {
    if (!currentSchema) return;
    
    const updatedSchema = {
      ...currentSchema,
      fields: currentSchema.fields.map(field => 
        field.id === fieldId ? { ...field, value } : field
      )
    };
    
    setCurrentSchema(updatedSchema);
    setSchemaText(JSON.stringify(updatedSchema, null, 2));
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="edit">Edit Schema</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="mt-4">
          {currentSchema ? (
            <SchemaRenderer schema={currentSchema} onValueChange={handleValueChange} />
          ) : (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>No Schema</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Switch to the "Edit Schema" tab to create or paste a JSON schema.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="edit" className="mt-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Schema Editor</span>
                <Button onClick={handleSave} disabled={!!error || !currentSchema}>
                  Validate
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-900/30 border border-red-800 text-red-300 p-2 mb-4 rounded-md">
                  {error}
                </div>
              )}
              <textarea
                className="w-full h-96 bg-gray-800 text-gray-300 p-4 font-mono text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-700"
                value={schemaText}
                onChange={handleSchemaChange}
                placeholder="Enter JSON schema here..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchemaEditor;
