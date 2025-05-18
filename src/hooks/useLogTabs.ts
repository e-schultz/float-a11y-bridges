
import { useState } from "react";

/**
 * Type definition for log content tab states
 */
type LogTabState = "content" | "threads" | "context";

/**
 * Custom hook for managing log content tab state
 * 
 * @returns Object containing active tab and method to change tabs
 */
export const useLogTabs = () => {
  const [activeTab, setActiveTab] = useState<LogTabState>("content");

  /**
   * Updates the active tab state
   * 
   * @param tab - The tab to activate
   */
  const handleTabChange = (tab: LogTabState) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    handleTabChange
  };
};
