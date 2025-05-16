
import { useState } from "react";

type LogTabState = "content" | "threads" | "context";

/**
 * Custom hook for managing log content tab state
 * @returns Object containing active tab and method to change tabs
 */
export const useLogTabs = () => {
  const [activeTab, setActiveTab] = useState<LogTabState>("content");

  const handleTabChange = (tab: LogTabState) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    handleTabChange
  };
};
