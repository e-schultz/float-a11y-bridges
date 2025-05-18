
import { useState } from "react";

/**
 * Custom hook for managing sidebar state including tab selection,
 * thread expansion, and mobile visibility
 * 
 * @returns Object containing sidebar state and methods to change it
 */
export const useSidebarState = () => {
  const [activeTab, setActiveTab] = useState<string>("entries");
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  /**
   * Toggles the sidebar visibility state (primarily for mobile)
   */
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  /**
   * Toggles the expanded state of a thread
   * 
   * @param thread - The thread to toggle expansion for
   */
  const toggleThread = (thread: string) => {
    const newExpanded = new Set(expandedThreads);
    if (newExpanded.has(thread)) {
      newExpanded.delete(thread);
    } else {
      newExpanded.add(thread);
    }
    setExpandedThreads(newExpanded);
  };

  return {
    activeTab,
    setActiveTab,
    expandedThreads,
    sidebarOpen,
    toggleSidebar,
    toggleThread
  };
};
