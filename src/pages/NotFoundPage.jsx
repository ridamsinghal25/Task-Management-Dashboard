import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Oops! Page not found</p>
      <p className="text-lg text-gray-500 mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Button onClick={() => navigate("/tasks")} className="px-6 py-3">
        Go to Homepage
      </Button>
    </div>
  );
}
