
import { UISchema } from "@/components/SchemaRenderer";

// Example schema for a simple form
export const simpleFormSchema: UISchema = {
  id: "simple-form",
  title: "Patient Information",
  description: "Basic patient information form",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      placeholder: "Enter patient name",
      required: true
    },
    {
      id: "age",
      type: "number",
      label: "Age",
      placeholder: "Enter age",
      required: true
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
    }
  ]
};

// Example schema for a continuity bridge
export const continuityBridgeSchema: UISchema = {
  id: "continuity-bridge",
  title: "Continuity Bridge",
  description: "Schema for representing a FLOAT continuity bridge",
  fields: [
    {
      id: "bridge-id",
      type: "heading",
      label: "CB-20250514-1553-B7F9",
      level: 1
    },
    {
      id: "description",
      type: "paragraph",
      value: "This anchor preserves the conversational context developed during the Jane application project setup."
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
      id: "ctx-marker-1",
      type: "badge",
      label: "ctx::project_setup"
    },
    {
      id: "ctx-marker-2",
      type: "badge",
      label: "ctx::jane_application"
    },
    {
      id: "separator-2",
      type: "separator"
    },
    {
      id: "active-threads-heading",
      type: "heading",
      label: "Active Threads",
      level: 3
    },
    {
      id: "thread-1",
      type: "text",
      label: "Thread Name",
      value: "jane_application_project"
    },
    {
      id: "thread-2",
      type: "text",
      label: "Thread Name",
      value: "clinical_forms_philosophy"
    }
  ]
};

// Example schema for a clinical form concept
export const clinicalFormSchema: UISchema = {
  id: "clinical-form-concept",
  title: "Form Fields as Moments of Care",
  description: "A conceptual framework for clinical forms",
  fields: [
    {
      id: "concept-heading",
      type: "heading",
      label: "Systems as Relationships",
      level: 2
    },
    {
      id: "concept-description",
      type: "paragraph",
      value: "In FLOAT, systems are viewed as relationship networks, not just technical implementations. This perspective sees form fields not merely as data containers but as moments of care - touchpoints where practitioners interact with patients through the medium of technology."
    },
    {
      id: "separator-1",
      type: "separator"
    },
    {
      id: "implementation-heading",
      type: "heading",
      label: "Technical Implementation",
      level: 3
    },
    {
      id: "metaphor-1",
      type: "badge",
      label: "Form fields as moments of care",
      variant: "outline"
    },
    {
      id: "metaphor-2",
      type: "badge",
      label: "Integration vs conquest",
      variant: "outline"
    },
    {
      id: "metaphor-3",
      type: "badge",
      label: "Shacks not cathedrals",
      variant: "outline"
    }
  ]
};

// All examples as an array
export const schemaExamples = [
  simpleFormSchema,
  continuityBridgeSchema,
  clinicalFormSchema
];
