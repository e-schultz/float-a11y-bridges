
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogEntry } from "@/pages/Index";
import { formatDate } from "@/lib/utils";

interface LogViewerProps {
  entry: LogEntry;
}

const LogViewer = ({ entry }: LogViewerProps) => {
  const [activeTab, setActiveTab] = useState<"content" | "threads" | "context">("content");

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between mb-3">
            <Badge className="font-mono">{entry.id}</Badge>
            <Badge variant={entry.type === "bridge" ? "default" : "outline"}>
              {entry.type}
            </Badge>
          </div>
          <CardTitle className="text-xl">{entry.title}</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>{entry.description}</span>
            <span className="text-gray-400">{formatDate(entry.timestamp)}</span>
          </CardDescription>
        </CardHeader>
        
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
                onClick={() => setActiveTab("content")}
                className="text-xs"
              >
                Content
              </Button>
              <Button 
                variant={activeTab === "threads" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setActiveTab("threads")}
                className="text-xs"
              >
                Active Threads
              </Button>
              <Button 
                variant={activeTab === "context" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setActiveTab("context")}
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
        
        <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LogViewer;
