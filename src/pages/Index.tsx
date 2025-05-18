
import { useNavigate } from "react-router-dom";
import LogViewer from "@/components/LogViewer";
import { toast } from "sonner";
import { useLogEntries } from "@/hooks/useLogEntries";
import { useSidebarState } from "@/hooks/useSidebarState";
import { LogEntry } from "@/types/LogEntry";
import { generateBreadcrumbs, routes } from "@/routes";
import AppLayout from "@/components/Layout/AppLayout";

/**
 * Index page component displays the main application interface
 * with a sidebar for navigation and a log viewer for content
 */
const Index = () => {
  const navigate = useNavigate();
  const {
    entries,
    selectedEntry,
    setSelectedEntry,
    activeFilter,
    allThreads,
    filterByThread,
    clearFilter,
  } = useLogEntries();
  
  const { sidebarOpen, toggleSidebar } = useSidebarState();

  /**
   * Handle selecting an entry and navigate to its detailed view
   */
  const handleEntrySelect = (entry: LogEntry) => {
    setSelectedEntry(entry);
    navigate(routes.entry(entry.id));
    
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
    toast(`Viewing: ${entry.title}`);
  };

  /**
   * Handle thread selection and navigate to thread view
   */
  const handleThreadSelect = (thread: string | null) => {
    if (thread) {
      navigate(routes.thread(thread));
    } else {
      clearFilter();
      navigate(routes.home);
    }
  };

  /**
   * Handle navigation between entries
   */
  const handleNavigate = (entry: LogEntry) => {
    setSelectedEntry(entry);
    navigate(routes.entry(entry.id));
    toast(`Viewing: ${entry.title}`);
  };

  // Generate breadcrumbs for home path
  const breadcrumbs = generateBreadcrumbs(routes.home);

  return (
    <AppLayout
      breadcrumbs={breadcrumbs}
      entries={entries}
      selectedEntry={selectedEntry}
      onEntrySelect={handleEntrySelect}
      threads={allThreads}
      onThreadSelect={handleThreadSelect}
      activeFilter={activeFilter}
      sidebarOpen={sidebarOpen}
      toggleSidebar={toggleSidebar}
      clearFilter={clearFilter}
    >
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
    </AppLayout>
  );
};

export default Index;
