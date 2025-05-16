
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogEntry } from "@/types/LogEntry";
import EntryItem from "./ThreadsSidebar/EntryItem";
import ThreadItem from "./ThreadsSidebar/ThreadItem";

interface ThreadsSidebarProps {
  isOpen: boolean;
  entries: LogEntry[];
  selectedEntry: LogEntry | null;
  onEntrySelect: (entry: LogEntry) => void;
  threads: string[];
  onThreadSelect: (thread: string | null) => void;
  activeFilter: string | null;
}

const ThreadsSidebar = ({ 
  isOpen, 
  entries, 
  selectedEntry, 
  onEntrySelect,
  threads,
  onThreadSelect,
  activeFilter
}: ThreadsSidebarProps) => {
  const [activeTab, setActiveTab] = useState<string>("entries");
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());

  const toggleThread = (thread: string) => {
    const newExpanded = new Set(expandedThreads);
    if (newExpanded.has(thread)) {
      newExpanded.delete(thread);
    } else {
      newExpanded.add(thread);
    }
    setExpandedThreads(newExpanded);
  };

  return (
    <aside 
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out w-full md:w-80 lg:w-96 bg-gray-900 border-r border-gray-800 flex flex-col h-full absolute md:relative z-10`}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="entries">Entries</TabsTrigger>
          <TabsTrigger value="threads">Threads</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex-1 overflow-auto p-2">
        {activeTab === "entries" && (
          <div className="space-y-2">
            {entries.map((entry) => (
              <EntryItem
                key={entry.id}
                entry={entry}
                isSelected={selectedEntry?.id === entry.id}
                onClick={() => onEntrySelect(entry)}
              />
            ))}
          </div>
        )}

        {activeTab === "threads" && (
          <div className="space-y-2">
            {threads.map((thread) => (
              <ThreadItem
                key={thread}
                thread={thread}
                isExpanded={expandedThreads.has(thread)}
                isActive={activeFilter === thread}
                entriesCount={entries.filter(e => e.activeThreads.includes(thread)).length}
                onToggle={() => toggleThread(thread)}
                onFilterClick={() => onThreadSelect(thread)}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default ThreadsSidebar;
