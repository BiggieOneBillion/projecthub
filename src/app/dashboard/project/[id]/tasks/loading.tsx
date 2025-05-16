import LoadingSpinner from "@/components/loading-spinner";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-black/40 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
