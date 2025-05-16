"use client";
import { useTransition } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { updateGitProject } from "@/lib/mutations";
import { useAuthStore } from "@/store/user-store";
import { QUERY_KEYS } from "@/lib/queryKeys";

const formSchema = z.object({
  projectName: z.string(),
  description: z.string(),
});

interface IEditProjectForm {
  projectName: string;
  description: string;
  projectId: string;
}

export default function EditProjectForm({
  projectName,
  description,
  projectId,
}: IEditProjectForm) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName,
      description,
    },
  });

  const queryClient = useQueryClient();

  const { details } = useAuthStore();

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        // console.logvalues);

        await axios.put(`/api/project/${projectId}`, {
          name: values.projectName,
          description: values.description,
        });

        await updateGitProject({
          owner: details.gitName,
          repoName: projectName,
          updatedDescription: values.description,
          updatedName: values.projectName,
        });

        toast.success("Update Project Info");

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.get("projects")],
        });
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto"
      >
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Project Name" type="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What is the project about?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isPending ? (
            <>
              <Loader2Icon className="animate-spin" /> Submitting
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
