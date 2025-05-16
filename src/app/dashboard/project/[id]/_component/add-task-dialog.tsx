"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import AddTaskForm from "./add-task-form";
import { useParams } from "next/navigation";
import { useGetProjectEmployees } from "@/lib/query";

export function AddTaskDialog() {
  const params = useParams();
  const { data } = useGetProjectEmployees(params.id as string);

  // // console.log"FROM ADD TO TASK DATA", data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          disabled={data && data.data.length > 0 ? false : true}
          className="text-sm font-medium flex items-center justify-start gap-2 bg-black disabled:bg-black/40 text-white rounded-md px-3 py-2 md:py-1"
        >
          <Plus size={14} />
          Add Task
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <AddTaskForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
