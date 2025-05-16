import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2Icon, Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteEmployeeDialog({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const queryClient = useQueryClient();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await axios.delete(`/api/employee/${id}`);
        toast.success("Task Deleted");
        queryClient.invalidateQueries({ queryKey: ["project-task"] });
      } catch (_error:unknown) {
        toast.error("Deleting Unsuccessful");
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2 px-2 py-2 bg-red-600 text-white font-semibold rounded-md text-sm">
          <Trash size={14} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete}>
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" /> Deleting
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
