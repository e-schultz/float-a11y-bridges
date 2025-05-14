
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Define the schema types we'll support
type SchemaFieldType = 
  | "text" 
  | "number" 
  | "select" 
  | "boolean" 
  | "badge" 
  | "heading" 
  | "paragraph"
  | "separator";

// Interface for field options
interface SelectOption {
  label: string;
  value: string;
}

// Interface for a single field in our schema
interface SchemaField {
  id: string;
  type: SchemaFieldType;
  label?: string;
  placeholder?: string;
  value?: string | number | boolean;
  options?: SelectOption[];
  required?: boolean;
  variant?: string;
  level?: 1 | 2 | 3;
}

// Interface for the entire schema
export interface UISchema {
  id: string;
  title: string;
  description?: string;
  fields: SchemaField[];
}

interface SchemaRendererProps {
  schema: UISchema;
  onValueChange?: (fieldId: string, value: any) => void;
}

const SchemaRenderer = ({ schema, onValueChange }: SchemaRendererProps) => {
  // Handler for value changes
  const handleValueChange = (fieldId: string, value: any) => {
    if (onValueChange) {
      onValueChange(fieldId, value);
    }
  };

  // Render a field based on its type
  const renderField = (field: SchemaField) => {
    switch (field.type) {
      case "text":
        return (
          <div className="space-y-2" key={field.id}>
            {field.label && <Label htmlFor={field.id}>{field.label}</Label>}
            <Input
              id={field.id}
              placeholder={field.placeholder}
              defaultValue={field.value as string}
              onChange={(e) => handleValueChange(field.id, e.target.value)}
              required={field.required}
            />
          </div>
        );
      
      case "number":
        return (
          <div className="space-y-2" key={field.id}>
            {field.label && <Label htmlFor={field.id}>{field.label}</Label>}
            <Input
              id={field.id}
              type="number"
              placeholder={field.placeholder}
              defaultValue={field.value as number}
              onChange={(e) => handleValueChange(field.id, parseFloat(e.target.value))}
              required={field.required}
            />
          </div>
        );
      
      case "select":
        return (
          <div className="space-y-2" key={field.id}>
            {field.label && <Label htmlFor={field.id}>{field.label}</Label>}
            <Select 
              defaultValue={field.value as string}
              onValueChange={(value) => handleValueChange(field.id, value)}
            >
              <SelectTrigger id={field.id}>
                <SelectValue placeholder={field.placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case "boolean":
        return (
          <div className="flex items-center space-x-2" key={field.id}>
            <Button
              variant={field.value ? "default" : "outline"}
              onClick={() => handleValueChange(field.id, true)}
            >
              Yes
            </Button>
            <Button
              variant={!field.value ? "default" : "outline"}
              onClick={() => handleValueChange(field.id, false)}
            >
              No
            </Button>
            {field.label && <Label>{field.label}</Label>}
          </div>
        );
      
      case "badge":
        return (
          <Badge 
            key={field.id} 
            variant={field.variant as any || "default"}
            className="my-1"
          >
            {field.label || field.value}
          </Badge>
        );
      
      case "heading":
        const HeadingTag = `h${field.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag 
            key={field.id}
            className={`font-semibold ${field.level === 1 ? 'text-2xl' : field.level === 3 ? 'text-lg' : 'text-xl'} mb-2`}
          >
            {field.label || field.value}
          </HeadingTag>
        );
      
      case "paragraph":
        return (
          <p key={field.id} className="text-gray-300 mb-4">
            {field.value as string}
          </p>
        );
      
      case "separator":
        return <Separator key={field.id} className="my-4" />;
      
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle>{schema.title}</CardTitle>
        {schema.description && <p className="text-gray-400">{schema.description}</p>}
      </CardHeader>
      <CardContent className="space-y-6">
        {schema.fields.map(renderField)}
      </CardContent>
    </Card>
  );
};

export default SchemaRenderer;
