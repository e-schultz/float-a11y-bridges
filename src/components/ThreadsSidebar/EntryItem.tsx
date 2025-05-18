
import { formatDate } from "@/lib/utils";
import { LogEntry } from "@/types/LogEntry";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { routes } from "@/routes";

/**
 * EntryItem displays a selectable log entry in the sidebar with
 * metadata and selection state.
 * 
 * @param entry - The log entry to display
 * @param isSelected - Whether this entry is currently selected
 * @param onClick - Callback function when entry is clicked
 */
interface EntryItemProps {
  entry: LogEntry;
  isSelected: boolean;
  onClick: () => void;
}

const EntryItem = ({ entry, isSelected, onClick }: EntryItemProps) => {
  return (
    <Link to={routes.entry(entry.id)} className="block no-underline">
      <div 
        className={`p-2 rounded-md transition-colors ${
          isSelected 
            ? "bg-gray-800 border border-purple-500/50" 
            : "bg-gray-900 hover:bg-gray-800 border border-transparent"
        }`}
        onClick={onClick}
      >
        <div className="flex justify-between items-start mb-1">
          <Badge variant={entry.type === "bridge" ? "default" : "outline"} className="text-xs">
            {entry.type}
          </Badge>
          <span className="text-xs text-gray-400">{formatDate(entry.timestamp)}</span>
        </div>
        <h3 className="font-medium text-sm mb-1 truncate">{entry.title}</h3>
        <p className="text-xs text-gray-400 line-clamp-2">{entry.description}</p>
      </div>
    </Link>
  );
};

export default EntryItem;
