import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import EditTaskForm from "./edit-task-form";


export function EditTask({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center text-gray-500 gap-2 px-2 py-2 border font-semibold rounded-md text-sm">
          <Edit size={14} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <EditTaskForm id={id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
