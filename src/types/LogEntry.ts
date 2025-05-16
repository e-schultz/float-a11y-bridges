
/**
 * Core data type for log entries
 */
export type LogEntry = {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  contextMarkers: string[];
  mode: string;
  activeThreads: string[];
  content?: string;
  type: "bridge" | "thread" | "concept" | "note";
};
