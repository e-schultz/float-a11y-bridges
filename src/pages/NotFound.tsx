
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-200 p-4">
      <h1 className="text-4xl font-bold mb-4 text-pink-500">404</h1>
      <p className="text-xl mb-6">Bridge Not Found</p>
      <p className="text-gray-400 max-w-md text-center mb-8">
        The continuity bridge you're looking for doesn't exist or has been archived.
      </p>
      <Button onClick={() => navigate("/")}>
        Return to FLOAT System
      </Button>
    </div>
  );
};

export default NotFound;
