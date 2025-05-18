
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { routes } from "@/routes";

/**
 * ThreadItem displays a collapsible thread item in the sidebar
 * with a count of related entries and options to filter by thread.
 * 
 * @param thread - The thread name to display
 * @param isExpanded - Whether the thread item is expanded
 * @param isActive - Whether this thread is actively filtered
 * @param entriesCount - Number of entries in this thread
 * @param onToggle - Callback function when thread is toggled
 * @param onFilterClick - Callback function when filter button is clicked
 */
interface ThreadItemProps {
  thread: string;
  isExpanded: boolean;
  isActive: boolean;
  entriesCount: number;
  onToggle: () => void;
  onFilterClick: () => void;
}

const ThreadItem = ({
  thread,
  isExpanded,
  isActive,
  entriesCount,
  onToggle,
  onFilterClick,
}: ThreadItemProps) => {
  return (
    <div className={`rounded-md overflow-hidden ${isActive ? "border border-purple-500/50" : "border border-transparent"}`}>
      <div 
        className="flex items-center justify-between p-2 bg-gray-800/50 cursor-pointer hover:bg-gray-800"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-2">
          <Button size="icon" variant="ghost" className="h-5 w-5 p-0">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          <span className="text-sm font-medium">{thread}</span>
        </div>
        <Badge variant="outline" className="text-xs">
          {entriesCount}
        </Badge>
      </div>
      
      {isExpanded && (
        <div className="p-2 bg-gray-900">
          <div className="flex flex-col space-y-2">
            <Button 
              size="sm" 
              variant={isActive ? "default" : "outline"} 
              className="w-full text-xs justify-start"
              onClick={onFilterClick}
            >
              Filter by Thread
            </Button>
            <Link
              to={routes.thread(thread)}
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              View Thread Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreadItem;
