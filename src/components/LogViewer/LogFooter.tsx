
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

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
