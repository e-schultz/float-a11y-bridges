
import { useState } from "react";
import LogViewer from "@/components/LogViewer";
import ThreadsSidebar from "@/components/ThreadsSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useLogEntries } from "@/hooks/useLogEntries";
import { LogEntry } from "@/types/LogEntry";

const Index = () => {
  const {
    entries,
    selectedEntry,
    setSelectedEntry,
    activeFilter,
    allThreads,
    filterByThread,
    clearFilter,
    navigateToPrevious,
    navigateToNext
  } = useLogEntries();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleEntrySelect = (entry: LogEntry) => {
    setSelectedEntry(entry);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
    toast(`Viewing: ${entry.title}`);
  };

  const handleNavigate = (entry: LogEntry) => {
    setSelectedEntry(entry);
    toast(`Viewing: ${entry.title}`);
  };

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
        
        <div className="flex items-center space-x-2">
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
          
          <Link to="/schemas">
            <Button variant="outline" size="sm" className="text-xs">
              Schema Explorer
            </Button>
          </Link>
        </div>
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
            <LogViewer 
              entry={selectedEntry} 
              entries={entries}
              onNavigate={handleNavigate}
            />
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
