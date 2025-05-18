
import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import LogViewer from "@/components/LogViewer";
import ThreadsSidebar from "@/components/ThreadsSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useLogEntries } from "@/hooks/useLogEntries";
import { useSidebarState } from "@/hooks/useSidebarState";
import { LogEntry } from "@/types/LogEntry";
import Breadcrumb from "@/components/Navigation/Breadcrumb";
import { generateBreadcrumbs, routes } from "@/routes";

/**
 * EntryDetail page component displays a specific log entry by ID
 * with navigation options and breadcrumbs
 */
const EntryDetail = () => {
  const { entryId } = useParams<{ entryId: string }>();
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
  
  const { sidebarOpen, toggleSidebar } = useSidebarState();

  // Find the entry with the given ID
  useEffect(() => {
    if (entryId) {
      const entry = entries.find(e => e.id === entryId);
      if (entry) {
        setSelectedEntry(entry);
      }
    }
  }, [entryId, entries, setSelectedEntry]);

  // If entry not found, navigate back to home
  if (entryId && !entries.find(e => e.id === entryId)) {
    toast.error(`Entry ${entryId} not found`);
    return <Navigate to={routes.home} />;
  }

  /**
   * Handle selecting an entry and optionally close sidebar on mobile
   */
  const handleEntrySelect = (entry: LogEntry) => {
    setSelectedEntry(entry);
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
    toast(`Viewing: ${entry.title}`);
  };

  /**
   * Handle navigation between entries
   */
  const handleNavigate = (entry: LogEntry) => {
    setSelectedEntry(entry);
    toast(`Viewing: ${entry.title}`);
  };

  // Generate breadcrumbs for current path
  const breadcrumbs = generateBreadcrumbs(entryId ? `/entry/${entryId}` : routes.home);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">
      <header className="border-b border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden mr-2" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <Link to={routes.home} className="text-pink-500 font-bold text-xl mr-2">FLOAT</Link>
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
          
          <Link to={routes.schemas}>
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
          <Breadcrumb items={breadcrumbs} />
          
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

export default EntryDetail;
