
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogEntry } from "@/types/LogEntry";
import { formatDate } from "@/lib/utils";

/**
 * EntryItem displays a summary of a log entry in the sidebar
 * 
 * @param entry - The log entry to display
 * @param isSelected - Whether this entry is currently selected
 * @param onClick - Callback function for when the entry is clicked
 */
interface EntryItemProps {
  entry: LogEntry;
  isSelected: boolean;
  onClick: () => void;
}

const EntryItem = ({ entry, isSelected, onClick }: EntryItemProps) => {
  return (
    <Card 
      className={`cursor-pointer hover:bg-gray-800 transition-colors ${
        isSelected ? "border-pink-500 bg-gray-800/50" : "border-gray-800"
      }`}
      onClick={onClick}
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
  );
};

export default EntryItem;
