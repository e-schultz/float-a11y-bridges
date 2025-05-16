
import { useState } from "react";

/**
 * Custom hook for managing sidebar state
 * @returns Object containing sidebar state and methods to change it
 */
export const useSidebarState = () => {
  const [activeTab, setActiveTab] = useState<string>("entries");
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
