
import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import LogViewer from "@/components/LogViewer";
import { toast } from "sonner";
import { useLogEntries } from "@/hooks/useLogEntries";
import { useSidebarState } from "@/hooks/useSidebarState";
import { LogEntry } from "@/types/LogEntry";
import { generateBreadcrumbs, routes } from "@/routes";
import AppLayout from "@/components/Layout/AppLayout";

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
    <AppLayout
      breadcrumbs={breadcrumbs}
      entries={entries}
      selectedEntry={selectedEntry}
      onEntrySelect={handleEntrySelect}
      threads={allThreads}
      onThreadSelect={filterByThread}
      activeFilter={activeFilter}
      sidebarOpen={sidebarOpen}
      toggleSidebar={toggleSidebar}
      clearFilter={clearFilter}
      pageTitle={decodedThreadName ? `Thread: ${decodedThreadName}` : undefined}
      pageSubtitle={`${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} in this thread`}
    >
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
    </AppLayout>
  );
};

export default ThreadView;
