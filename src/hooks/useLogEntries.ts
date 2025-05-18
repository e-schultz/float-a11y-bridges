
import { useState, useEffect } from "react";
import { LogEntry } from "@/types/LogEntry";
import { sampleData } from "@/data/sampleEntries";

/**
 * Custom hook for managing log entries, including filtering, selection,
 * and navigation
 * 
 * @returns Object containing entries, filtered entries, selected entry, and methods to manipulate them
 */
export const useLogEntries = () => {
  const [entries, setEntries] = useState<LogEntry[]>(sampleData);
  const [selectedEntry, setSelectedEntry] = useState<LogEntry | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  /**
   * Set initial selected entry when component mounts
   */
  useEffect(() => {
    if (entries.length > 0 && !selectedEntry) {
      setSelectedEntry(entries[0]);
    }
  }, [entries, selectedEntry]);

  /**
   * Get all unique threads from sample data
   */
  const allThreads = Array.from(
    new Set(sampleData.flatMap(entry => entry.activeThreads))
  );

  /**
   * Filter entries by thread name
   * 
   * @param threadName - The thread name to filter by, or null to clear filter
   */
  const filterByThread = (threadName: string | null) => {
    setActiveFilter(threadName);
    if (!threadName) {
      setEntries(sampleData);
      return;
    }
    
    const filtered = sampleData.filter(entry => 
      entry.activeThreads.includes(threadName)
    );
    setEntries(filtered);
    
    if (filtered.length > 0) {
      setSelectedEntry(filtered[0]);
    }
  };

  /**
   * Clear the current thread filter
   */
  const clearFilter = () => {
    setActiveFilter(null);
    setEntries(sampleData);
    if (sampleData.length > 0) {
      setSelectedEntry(sampleData[0]);
    }
  };

  /**
   * Get the index of the current entry in the entries array
   */
  const getCurrentIndex = () => {
    return entries.findIndex(e => e.id === selectedEntry?.id);
  };

  /**
   * Navigate to the previous entry if available
   * 
   * @returns Boolean indicating whether navigation occurred
   */
  const navigateToPrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
      setSelectedEntry(entries[currentIndex - 1]);
      return true;
    }
    return false;
  };

  /**
   * Navigate to the next entry if available
   * 
   * @returns Boolean indicating whether navigation occurred
   */
  const navigateToNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex < entries.length - 1) {
      setSelectedEntry(entries[currentIndex + 1]);
      return true;
    }
    return false;
  };

  return {
    entries,
    selectedEntry,
    setSelectedEntry,
    activeFilter,
    allThreads,
    filterByThread,
    clearFilter,
    getCurrentIndex,
    navigateToPrevious,
    navigateToNext
  };
};
