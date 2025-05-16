import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center gap-1 text-white">
      <Loader2 className="animate-spin text-sm" />
      <span>Loading</span>
    </div>
  );
};
export default LoadingSpinner;
