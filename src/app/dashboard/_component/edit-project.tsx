import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import EditProjectForm from "./edit-project-form ";

interface IEditproject {
  data: {
    projectName: string;
    description: string;
    id:string
  };
}

export function EditProject({ data }: IEditproject) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-2 py-2 bg-black text-white font-semibold rounded-md text-sm">
          <Edit size={14} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <EditProjectForm
            projectName={data.projectName}
            description={data.description}
            projectId={data.id}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
