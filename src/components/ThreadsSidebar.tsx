
import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronDown, 
  ChevronUp,
  ArrowRight
} from "lucide-react";
import { LogEntry } from "@/types/LogEntry";
import { formatDate } from "@/lib/utils";

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
              <Card 
                key={entry.id}
                className={`cursor-pointer hover:bg-gray-800 transition-colors ${
                  selectedEntry?.id === entry.id ? "border-pink-500 bg-gray-800/50" : "border-gray-800"
                }`}
                onClick={() => onEntrySelect(entry)}
              >
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-medium flex items-start justify-between">
                    <div>
                      <span className="text-gray-400 font-mono text-xs mr-2">{entry.id}</span>
                      {entry.title}
                    </div>
                    <Badge className="ml-2 text-[10px]" variant={entry.type === "bridge" ? "default" : "outline"}>
                      {entry.type}
                    </Badge>
                  </CardTitle>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(entry.timestamp)}
                  </p>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {entry.contextMarkers.map((marker, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="text-[10px] py-0 px-2 h-5 bg-gray-800 text-gray-300"
                      >
                        ctx::{marker}
                      </Badge>
                    ))}
                  </div>
                  <Badge 
                    variant="outline"
                    className="text-[10px] bg-purple-900/30 text-purple-300 border-none"
                  >
                    mode: {entry.mode}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "threads" && (
          <div className="space-y-2">
            {threads.map((thread) => (
              <div key={thread} className="border border-gray-800 rounded-md overflow-hidden bg-gray-900">
                <div 
                  className={`p-3 cursor-pointer flex items-center justify-between ${
                    activeFilter === thread ? "bg-gray-800/70" : "bg-gray-900/70"
                  }`}
                  onClick={() => toggleThread(thread)}
                >
                  <div className="text-sm font-medium">
                    {thread}
                  </div>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    {expandedThreads.has(thread) ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </Button>
                </div>
                
                {expandedThreads.has(thread) && (
                  <div className="p-3 border-t border-gray-800 text-xs text-gray-400">
                    <div className="space-y-1">
                      <p>Thread contains {entries.filter(e => e.activeThreads.includes(thread)).length} entries</p>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-xs h-7 mt-2"
                        onClick={() => onThreadSelect(thread)}
                      >
                        <ArrowRight className="mr-1 h-3 w-3" />
                        Filter by thread
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default ThreadsSidebar;
