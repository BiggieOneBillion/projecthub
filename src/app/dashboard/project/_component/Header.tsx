"use client";
import {  useGetProject } from "@/lib/query";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const Header = () => {
  const params = useParams();
  const router = useRouter();
  const { data, isLoading } = useGetProject(params.id as string);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {data && data.data && (
        <div className="flex items-center gap-2 lg:px-10">
          <button onClick={() => router.back()} className=" border">
            <ChevronLeft size={16} />
          </button>
          <h1 className="font-medium text-xs uppercase text-gray-500 ">
            {data.data.name}
          </h1>
        </div>
      )}
    </div>
  );
};
export default Header;
