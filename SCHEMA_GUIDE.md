# Schema-Driven UI Guide

## Overview

The FLOAT Continuity System uses a powerful schema-driven UI approach that allows dynamic generation of user interfaces based on JSON configurations. This approach embodies the core philosophy that "form fields are moments of care" - each field represents a meaningful interaction point in the healthcare workflow.

## Core Philosophy

### Form Fields as Moments of Care

Traditional forms treat fields as mere data containers. In FLOAT, each field is a **moment of care** - a touchpoint where practitioners interact with patients through technology. This philosophical shift influences every aspect of the schema design.

### Integration vs. Conquest

Rather than forcing users to adapt to rigid interfaces, the schema system adapts to support existing workflows. The separation of schema (data structure) from presentation (UI components) enables this flexibility.

### Shacks not Cathedrals

The schema system follows modular, focused design principles. Each schema is purpose-built for specific contexts rather than trying to be a monolithic solution for all use cases.

## Schema Structure

### Basic Schema Definition

```typescript
interface UISchema {
  id: string;           // Unique identifier
  title: string;        // Display title
  description?: string; // Optional description
  fields: SchemaField[]; // Array of field definitions
}
```

### Field Definition

```typescript
interface SchemaField {
  id: string;                    // Unique field identifier
  type: SchemaFieldType;         // Field type (see below)
  label?: string;                // Display label
  placeholder?: string;          // Input placeholder
  value?: string | number | boolean; // Default/current value
  options?: SelectOption[];      // For select fields
  required?: boolean;            // Validation flag
  variant?: string;              // Styling variant
  level?: 1 | 2 | 3;            // For heading levels
}
```

## Supported Field Types

### 1. Text Input (`"text"`)

Basic text input for string data.

```typescript
{
  id: "patient-name",
  type: "text",
  label: "Patient Name",
  placeholder: "Enter full name",
  required: true
}
```

**Use Cases:**
- Patient names
- Notes and comments
- Address fields
- Free-form text entry

### 2. Number Input (`"number"`)

Numeric input with validation.

```typescript
{
  id: "age",
  type: "number",
  label: "Age",
  placeholder: "Enter age in years",
  required: true
}
```

**Use Cases:**
- Age, weight, height
- Dosage amounts
- Numeric scores
- Quantities

### 3. Select Dropdown (`"select"`)

Dropdown selection from predefined options.

```typescript
{
  id: "gender",
  type: "select",
  label: "Gender",
  options: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-binary", value: "non-binary" },
    { label: "Prefer not to say", value: "not-specified" }
  ]
}
```

**Use Cases:**
- Categorical data
- Status selections
- Classification choices
- Predefined options

### 4. Boolean Toggle (`"boolean"`)

Yes/No or True/False selections.

```typescript
{
  id: "has-allergies",
  type: "boolean",
  label: "Has Known Allergies",
  value: false
}
```

**Use Cases:**
- Yes/No questions
- Feature toggles
- Consent flags
- Binary choices

### 5. Badge Display (`"badge"`)

Visual indicators for metadata and status.

```typescript
{
  id: "priority-badge",
  type: "badge",
  label: "HIGH PRIORITY",
  variant: "destructive"
}
```

**Variants:**
- `"default"` - Standard styling
- `"secondary"` - Muted appearance
- `"destructive"` - Red/warning
- `"outline"` - Outlined style

**Use Cases:**
- Status indicators
- Priority levels
- Category tags
- Metadata display

### 6. Heading (`"heading"`)

Section headers for content organization.

```typescript
{
  id: "section-header",
  type: "heading",
  label: "Patient Information",
  level: 2
}
```

**Levels:**
- `1` - Main heading (h1)
- `2` - Section heading (h2)
- `3` - Subsection heading (h3)

**Use Cases:**
- Form sections
- Content organization
- Visual hierarchy
- Information grouping

### 7. Paragraph (`"paragraph"`)

Static text content for information display.

```typescript
{
  id: "instructions",
  type: "paragraph",
  value: "Please complete all required fields before submitting."
}
```

**Use Cases:**
- Instructions
- Help text
- Information display
- Context provision

### 8. Separator (`"separator"`)

Visual dividers for content sections.

```typescript
{
  id: "divider-1",
  type: "separator"
}
```

**Use Cases:**
- Section separation
- Visual breaks
- Content organization
- Layout structure

## Pre-built Schema Examples

### 1. Patient Information Form

```typescript
export const patientFormSchema: UISchema = {
  id: "patient-form",
  title: "Patient Information",
  description: "Basic patient demographics and contact information",
  fields: [
    {
      id: "full-name",
      type: "text",
      label: "Full Name",
      placeholder: "Enter patient's full name",
      required: true
    },
    {
      id: "date-of-birth",
      type: "text",
      label: "Date of Birth",
      placeholder: "MM/DD/YYYY"
    },
    {
      id: "age",
      type: "number",
      label: "Age",
      placeholder: "Age in years"
    },
    {
      id: "gender",
      type: "select",
      label: "Gender",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Non-binary", value: "non-binary" },
        { label: "Prefer not to say", value: "not-specified" }
      ]
    },
    {
      id: "emergency-contact",
      type: "boolean",
      label: "Emergency contact information on file"
    }
  ]
};
```

### 2. Continuity Bridge Schema

```typescript
export const continuityBridgeSchema: UISchema = {
  id: "continuity-bridge",
  title: "Continuity Bridge",
  description: "FLOAT continuity bridge for context preservation",
  fields: [
    {
      id: "bridge-id",
      type: "heading",
      label: "CB-20250124-1553-B7F9",
      level: 1
    },
    {
      id: "description",
      type: "paragraph",
      value: "This bridge preserves conversational context across sessions."
    },
    {
      id: "separator-1",
      type: "separator"
    },
    {
      id: "mode-badge",
      type: "badge",
      label: "mode: bridge_transition",
      variant: "outline"
    },
    {
      id: "context-markers",
      type: "heading",
      label: "Context Markers",
      level: 3
    }
  ]
};
```

### 3. Clinical Assessment Form

```typescript
export const clinicalAssessmentSchema: UISchema = {
  id: "clinical-assessment",
  title: "Clinical Assessment",
  description: "Structured clinical evaluation form",
  fields: [
    {
      id: "assessment-date",
      type: "text",
      label: "Assessment Date",
      required: true
    },
    {
      id: "chief-complaint",
      type: "text",
      label: "Chief Complaint",
      placeholder: "Primary reason for visit"
    },
    {
      id: "pain-scale",
      type: "number",
      label: "Pain Scale (0-10)",
      placeholder: "0 = no pain, 10 = severe pain"
    },
    {
      id: "urgent-care",
      type: "boolean",
      label: "Requires urgent care"
    },
    {
      id: "priority-level",
      type: "select",
      label: "Priority Level",
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
        { label: "Critical", value: "critical" }
      ]
    }
  ]
};
```

## Schema Rendering Process

### 1. Schema Loading

```typescript
// Load schema from various sources
const schema = await loadSchema(schemaId);
// or
const schema = predefinedSchemas[schemaType];
// or
const schema = JSON.parse(schemaJson);
```

### 2. Field Rendering

```typescript
const renderField = (field: SchemaField) => {
  switch (field.type) {
    case "text":
      return <TextInput {...field} />;
    case "number":
      return <NumberInput {...field} />;
    case "select":
      return <SelectInput {...field} />;
    // ... other field types
  }
};
```

### 3. Value Management

```typescript
const [formData, setFormData] = useState({});

const handleValueChange = (fieldId: string, value: any) => {
  setFormData(prev => ({
    ...prev,
    [fieldId]: value
  }));
};
```

## Advanced Schema Features

### 1. Conditional Fields

```typescript
{
  id: "allergy-details",
  type: "text",
  label: "Allergy Details",
  showIf: {
    fieldId: "has-allergies",
    value: true
  }
}
```

### 2. Field Validation

```typescript
{
  id: "email",
  type: "text",
  label: "Email Address",
  validation: {
    type: "email",
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
}
```

### 3. Dynamic Options

```typescript
{
  id: "department",
  type: "select",
  label: "Department",
  optionsSource: "api://departments",
  dependsOn: ["facility-id"]
}
```

## Schema Editor Usage

### 1. Interactive Editing

The Schema Editor provides real-time editing and preview:

```typescript
<SchemaEditor
  initialSchema={schema}
  onSave={(updatedSchema) => {
    saveSchema(updatedSchema);
  }}
/>
```

### 2. Preview Mode

Switch between edit and preview modes:
- **Edit Mode**: JSON schema editing with syntax highlighting
- **Preview Mode**: Live rendering of the schema

### 3. Validation

Real-time validation ensures schema correctness:
- JSON syntax validation
- Schema structure validation
- Field type validation
- Required property checking

## Best Practices

### 1. Schema Design

- **Single Responsibility**: Each schema should serve one specific purpose
- **Logical Grouping**: Group related fields together
- **Clear Labeling**: Use descriptive labels and placeholders
- **Consistent Naming**: Follow consistent ID naming conventions

### 2. Field Organization

- **Visual Hierarchy**: Use headings and separators for organization
- **Logical Flow**: Order fields in a logical sequence
- **Required Fields**: Mark required fields clearly
- **Help Text**: Provide context with paragraphs

### 3. User Experience

- **Progressive Disclosure**: Show complex fields only when needed
- **Sensible Defaults**: Provide helpful default values
- **Clear Feedback**: Use badges and validation messages
- **Accessibility**: Ensure proper labeling and keyboard navigation

### 4. Performance

- **Lazy Loading**: Load schemas on demand
- **Memoization**: Cache rendered field components
- **Minimal Re-renders**: Optimize state updates
- **Schema Validation**: Validate schemas at build time

## Integration Patterns

### 1. With React Query

```typescript
const { data: schema } = useQuery({
  queryKey: ['schema', schemaId],
  queryFn: () => fetchSchema(schemaId)
});

if (schema) {
  return <SchemaRenderer schema={schema} />;
}
```

### 2. With Form Libraries

```typescript
const form = useForm();

const handleSchemaValueChange = (fieldId: string, value: any) => {
  form.setValue(fieldId, value);
};

return (
  <SchemaRenderer
    schema={schema}
    onValueChange={handleSchemaValueChange}
  />
);
```

### 3. With State Management

```typescript
const { updateFormData } = useFormStore();

const handleValueChange = (fieldId: string, value: any) => {
  updateFormData(fieldId, value);
};
```

## Troubleshooting

### Common Issues

1. **Missing React Import**: Ensure components import React
2. **Type Mismatches**: Verify field types match expected values
3. **Validation Errors**: Check required fields and data types
4. **Rendering Issues**: Validate schema structure

### Debugging Tools

1. **Schema Validator**: Built-in JSON schema validation
2. **React DevTools**: Inspect component state and props
3. **Console Logging**: Enable debug logging for schema processing
4. **Error Boundaries**: Catch and display schema rendering errors

## Future Enhancements

### Planned Features

- **Schema Versioning**: Support for schema migrations
- **Field Dependencies**: Advanced conditional field logic
- **Custom Field Types**: Plugin system for custom fields
- **Schema Templates**: Library of common schema patterns
- **Real-time Collaboration**: Multi-user schema editing
- **Schema Analytics**: Usage tracking and optimization insights
