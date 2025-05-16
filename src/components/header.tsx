"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Iheader {
  title: string;
}

const Header = ({ title }: Iheader) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="md:text-xl font-semibold text-black  flex items-center gap-3">
      <button onClick={handleBack} className="border p-1">
        <ChevronLeft className="h-4 w-4" />
      </button>
      <h1>{title}</h1>
    </div>
  );
};
export default Header;
