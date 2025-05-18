
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

export default EntryDetail;
