
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogEntry } from "@/types/LogEntry";
import { formatDate } from "@/lib/utils";

/**
 * LogHeader displays the header section of a log entry with title, 
 * description, and metadata.
 * 
 * @param entry - The log entry to display header information for
 */
interface LogHeaderProps {
  entry: LogEntry;
}

const LogHeader = ({ entry }: LogHeaderProps) => {
  return (
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
  );
};

export default LogHeader;
