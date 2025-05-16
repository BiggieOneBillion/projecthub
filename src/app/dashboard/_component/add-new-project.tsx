import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddNewProjectForm from "./add-new-project-form";
import { Plus } from "lucide-react";

export function AddNewProject() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-1 md:py-2 bg-black text-white font-semibold rounded-md text-sm">
          <Plus size={14} />
          Add New Project
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <AddNewProjectForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
