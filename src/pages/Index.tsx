
import { useEffect, useState } from "react";
import LogViewer from "@/components/LogViewer";
import ThreadsSidebar from "@/components/ThreadsSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { toast } from "sonner";

// Sample data structure for our entries
export type LogEntry = {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  contextMarkers: string[];
  mode: string;
  activeThreads: string[];
  content?: string;
  type: "bridge" | "thread" | "concept" | "note";
};

// Sample data
const sampleData: LogEntry[] = [
  {
    id: "CB-20250513-1553-AD7F",
    title: "Project configuration and clinical forms philosophy",
    timestamp: "2025-05-13T15:53:00Z",
    description: "Development of the clinical forms philosophy and project setup",
    contextMarkers: ["project_setup", "jane_application", "environment_configuration"],
    mode: "bridge_transition",
    activeThreads: ["jane_application_project", "clinical_forms_philosophy", "mcp_system_improvements"],
    content: "This anchor preserves the conversational context developed during the Jane application project setup. It maintains awareness of the FLOAT methodology, special command patterns, and the conceptual framework connecting schema-based UIs to clinical forms as moments of care.",
    type: "bridge"
  },
  {
    id: "CB-250512-0039-C618",
    title: "Jane Interview Hub interactive artifact creation",
    timestamp: "2025-05-12T00:39:00Z",
    description: "Interactive artifact creation and interview preparation",
    contextMarkers: ["evening-work", "interview-preparation", "artifact-creation"],
    mode: "bridge_transition",
    activeThreads: ["jane_interview_preparation", "daily_context_collection", "float_dispatch_implementations"],
    content: "This anchor preserves the conversational context with emphasis on the Jane interview preparation. It maintains the interactive artifact and preparation context while supporting a clean resumption of the 30-minute ritual check-in process.",
    type: "bridge"
  },
  {
    id: "CB-20250511-2000-7B3D",
    title: "Initial conceptualization phase",
    timestamp: "2025-05-11T20:00:00Z",
    description: "System boot and continuity implementation",
    contextMarkers: ["brain-boot", "chores", "laundry", "system-alignment"],
    mode: "bridge_transition",
    activeThreads: ["float_continuity_implementation", "jane_interview_preparation", "daily_context_collection", "chroma_mcp_integration"],
    content: "This anchor preserves the conversational context without forcing premature structure. It maintains the drift → mass → shape workflow pattern while providing clean resumption capability.",
    type: "bridge"
  },
  {
    id: "TT-20250514-1200",
    title: "Schema-Driven UI Architecture ⟶ Patient Care Philosophy",
    timestamp: "2025-05-14T12:00:00Z",
    description: "Technical and philosophical foundations for schema-driven UI approaches",
    contextMarkers: ["schema_ui", "care_philosophy", "technical_implementation"],
    mode: "thread_development",
    activeThreads: ["schema_driven_ui", "patient_care_philosophy"],
    content: "Systems are viewed as relationship networks... form fields not merely as data containers but as moments of care - touchpoints where practitioners interact with patients through the medium of technology.",
    type: "thread"
  },
  {
    id: "TT-20250514-1300",
    title: "Progressive Disclosure ⟶ Cognitive Load Management",
    timestamp: "2025-05-14T13:00:00Z",
    description: "Patterns for managing cognitive load in complex interfaces",
    contextMarkers: ["ui_patterns", "cognitive_load", "information_design"],
    mode: "thread_development",
    activeThreads: ["progressive_disclosure", "cognitive_anchors"],
    content: "Context isn't noise—it's gravitational mass. The right information at the right time creates cognitive anchors that support rather than overwhelm.",
    type: "thread"
  }
];

const Index = () => {
  const [entries, setEntries] = useState<LogEntry[]>(sampleData);
  const [selectedEntry, setSelectedEntry] = useState<LogEntry | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    // Set the first entry as selected by default
    if (entries.length > 0 && !selectedEntry) {
      setSelectedEntry(entries[0]);
    }
  }, [entries, selectedEntry]);

  const handleEntrySelect = (entry: LogEntry) => {
    setSelectedEntry(entry);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
    toast(`Viewing: ${entry.title}`);
  };

  const filterByThread = (threadName: string | null) => {
    setActiveFilter(threadName);
    if (!threadName) return;
    
    const filtered = sampleData.filter(entry => 
      entry.activeThreads.includes(threadName)
    );
    setEntries(filtered);
    
    if (filtered.length > 0) {
      setSelectedEntry(filtered[0]);
    }
  };

  const clearFilter = () => {
    setActiveFilter(null);
    setEntries(sampleData);
    if (sampleData.length > 0) {
      setSelectedEntry(sampleData[0]);
    }
  };

  // Extract all unique threads
  const allThreads = Array.from(
    new Set(sampleData.flatMap(entry => entry.activeThreads))
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">
      <header className="border-b border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden mr-2" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <span className="text-pink-500 font-bold text-xl mr-2">FLOAT</span>
            <span className="text-gray-400 text-sm">Continuity System</span>
          </div>
        </div>
        
        {activeFilter && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearFilter}
            className="text-xs"
          >
            Clear Filter: {activeFilter}
          </Button>
        )}
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <ThreadsSidebar 
          isOpen={sidebarOpen} 
          entries={entries} 
          selectedEntry={selectedEntry}
          onEntrySelect={handleEntrySelect}
          threads={allThreads}
          onThreadSelect={filterByThread}
          activeFilter={activeFilter}
        />
        
        <main className="flex-1 overflow-auto p-4">
          {selectedEntry ? (
            <LogViewer entry={selectedEntry} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select an entry to view details
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
