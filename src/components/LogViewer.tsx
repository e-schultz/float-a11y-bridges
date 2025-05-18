
import { Card } from "@/components/ui/card";
import { LogEntry } from "@/types/LogEntry";
import { toast } from "sonner";
import LogHeader from "./LogViewer/LogHeader";
import LogContent from "./LogViewer/LogContent";
import LogFooter from "./LogViewer/LogFooter";

/**
 * LogViewer component displays detailed information about a log entry
 * with navigation controls to move between entries.
 * 
 * @param entry - The current log entry to display
 * @param entries - All available log entries for navigation
 * @param onNavigate - Callback function for when navigation occurs
 */
interface LogViewerProps {
  entry: LogEntry;
  entries: LogEntry[];
  onNavigate: (entry: LogEntry) => void;
}

const LogViewer = ({ entry, entries, onNavigate }: LogViewerProps) => {
  /**
   * Returns the current entry's index in the entries array
   */
  const getCurrentIndex = () => {
    return entries.findIndex(e => e.id === entry.id);
  };

  /**
   * Navigate to the previous entry if available
   */
  const handlePrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
      onNavigate(entries[currentIndex - 1]);
      toast.info("Navigated to previous entry");
    } else {
      toast.info("You're at the first entry");
    }
  };

  /**
   * Navigate to the next entry if available
   */
  const handleNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex < entries.length - 1) {
      onNavigate(entries[currentIndex + 1]);
      toast.info("Navigated to next entry");
    } else {
      toast.info("You're at the last entry");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="bg-gray-900 border-gray-800">
        <LogHeader entry={entry} />
        <LogContent entry={entry} />
        <LogFooter
          onPrevious={handlePrevious}
          onNext={handleNext}
          isPreviousDisabled={getCurrentIndex() === 0}
          isNextDisabled={getCurrentIndex() === entries.length - 1}
        />
      </Card>
    </div>
  );
};

export default LogViewer;
