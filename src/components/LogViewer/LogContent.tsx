
import { Badge } from "@/components/ui/badge";
import { LogEntry } from "@/types/LogEntry";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useLogTabs } from "@/hooks/useLogTabs";

interface LogContentProps {
  entry: LogEntry;
}

const LogContent = ({ entry }: LogContentProps) => {
  const { activeTab, handleTabChange } = useLogTabs();

  return (
    <CardContent className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center space-x-1">
          <Badge 
            variant="outline" 
            className="bg-purple-900/30 text-purple-300 border-none px-2 py-0.5"
          >
            mode: {entry.mode}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {entry.contextMarkers.map((marker, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="bg-gray-800 text-gray-300"
            >
              ctx::{marker}
            </Badge>
          ))}
        </div>
      </div>
      
      <Separator className="bg-gray-800" />
      
      <div>
        <div className="flex space-x-1 mb-3">
          <Button 
            variant={activeTab === "content" ? "default" : "outline"} 
            size="sm" 
            onClick={() => handleTabChange("content")}
            className="text-xs"
          >
            Content
          </Button>
          <Button 
            variant={activeTab === "threads" ? "default" : "outline"} 
            size="sm" 
            onClick={() => handleTabChange("threads")}
            className="text-xs"
          >
            Active Threads
          </Button>
          <Button 
            variant={activeTab === "context" ? "default" : "outline"} 
            size="sm" 
            onClick={() => handleTabChange("context")}
            className="text-xs"
          >
            Context
          </Button>
        </div>
        
        {activeTab === "content" && (
          <div className="prose prose-invert prose-sm max-w-none">
            <p className="leading-relaxed text-gray-300">
              {entry.content}
            </p>
          </div>
        )}
        
        {activeTab === "threads" && (
          <div className="space-y-2">
            {entry.activeThreads.map((thread, index) => (
              <div key={index} className="p-2 bg-gray-800/50 rounded-md">
                <p className="text-sm font-mono text-gray-300">{thread}</p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "context" && (
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold mb-1 text-gray-400">Mode</h4>
              <p className="text-sm text-gray-300">{entry.mode}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1 text-gray-400">Context Markers</h4>
              <div className="flex flex-wrap gap-1.5">
                {entry.contextMarkers.map((marker, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="bg-gray-800 text-gray-300"
                  >
                    ctx::{marker}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1 text-gray-400">Timestamp</h4>
              <p className="text-sm text-gray-300">{formatDate(entry.timestamp)}</p>
            </div>
          </div>
        )}
      </div>
    </CardContent>
  );
};

export default LogContent;
