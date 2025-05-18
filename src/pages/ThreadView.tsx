
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
 * ThreadView page component displays entries filtered by a specific thread
 * with navigation options and breadcrumbs
 */
const ThreadView = () => {
  const { threadName } = useParams<{ threadName: string }>();
  const decodedThreadName = threadName ? decodeURIComponent(threadName) : null;
  
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

  // Apply thread filter when component mounts or thread changes
  useEffect(() => {
    if (decodedThreadName) {
      filterByThread(decodedThreadName);
    }
  }, [decodedThreadName, filterByThread]);

  // If thread not found, navigate back to home
  if (decodedThreadName && !allThreads.includes(decodedThreadName)) {
    toast.error(`Thread ${decodedThreadName} not found`);
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
  const breadcrumbs = generateBreadcrumbs(
    decodedThreadName ? `/thread/${encodeURIComponent(decodedThreadName)}` : routes.home
  );

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
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              Thread: <span className="text-purple-400">{decodedThreadName}</span>
            </h2>
            <p className="text-gray-400 text-sm">
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'} in this thread
            </p>
          </div>
          
          {selectedEntry ? (
            <LogViewer 
              entry={selectedEntry} 
              entries={entries}
              onNavigate={handleNavigate}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No entries found in this thread
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ThreadView;
