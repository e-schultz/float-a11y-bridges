
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

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
  onFilterClick
}: ThreadItemProps) => {
  return (
    <div className="border border-gray-800 rounded-md overflow-hidden bg-gray-900">
      <div 
        className={`p-3 cursor-pointer flex items-center justify-between ${
          isActive ? "bg-gray-800/70" : "bg-gray-900/70"
        }`}
        onClick={onToggle}
      >
        <div className="text-sm font-medium">
          {thread}
        </div>
        <Button variant="ghost" size="icon" className="h-5 w-5">
          {isExpanded ? 
            <ChevronUp className="h-4 w-4" /> : 
            <ChevronDown className="h-4 w-4" />
          }
        </Button>
      </div>
      
      {isExpanded && (
        <div className="p-3 border-t border-gray-800 text-xs text-gray-400">
          <div className="space-y-1">
            <p>Thread contains {entriesCount} entries</p>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-xs h-7 mt-2"
              onClick={onFilterClick}
            >
              <ArrowRight className="mr-1 h-3 w-3" />
              Filter by thread
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreadItem;
