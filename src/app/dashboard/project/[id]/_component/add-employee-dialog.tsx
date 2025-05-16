import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import AddEmployeeForm from "./add-employee-form";

export function AddEmployeeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm font-medium flex items-center justify-start gap-2 bg-black text-white rounded-md px-3 py-2 md:py-1">
          <Plus size={14} />
          Add Employee
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <AddEmployeeForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
