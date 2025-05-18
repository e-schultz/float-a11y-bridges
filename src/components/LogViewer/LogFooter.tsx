
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

/**
 * LogFooter displays navigation controls for moving between log entries
 * 
 * @param onPrevious - Callback function for navigating to previous entry
 * @param onNext - Callback function for navigating to next entry
 * @param isPreviousDisabled - Whether the previous button should be disabled
 * @param isNextDisabled - Whether the next button should be disabled
 */
interface LogFooterProps {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const LogFooter = ({ 
  onPrevious, 
  onNext, 
  isPreviousDisabled, 
  isNextDisabled 
}: LogFooterProps) => {
  return (
    <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onPrevious}
        disabled={isPreviousDisabled}
      >
        Previous
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onNext}
        disabled={isNextDisabled}
      >
        Next
      </Button>
    </CardFooter>
  );
};

export default LogFooter;
