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
import { deleteProjectFromGit } from "@/lib/mutations";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { useAuthStore } from "@/store/user-store";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2Icon, Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteProjectDialog({
  id,
  projectName,
  onGitHub,
}: {
  id: string;
  projectName: string;
  onGitHub: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const queryClient = useQueryClient();

  const { details } = useAuthStore();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await axios.delete(`/api/project/${id}`);

        if (onGitHub) {
          await deleteProjectFromGit(details.gitName, projectName);
        }

        toast.success("Project Deleted");

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.get("projects")],
        });
      } catch (error) {
        toast.error(`Deleting Unsuccessful: ${(error as Error).message}`);
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
