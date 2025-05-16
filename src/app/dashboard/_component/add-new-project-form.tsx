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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useAuthStore } from "@/store/user-store";
import { Loader2Icon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { QUERY_KEYS } from "@/lib/queryKeys";

const formSchema = z.object({
  projectName: z.string(),
  description: z.string(),
  addToGit: z.boolean(),
});

export default function AddNewProjectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      projectName: "",
      addToGit: false,
    },
  });

  const queryClient = useQueryClient();

  const [isPending, startTransition] = useTransition();

  const { details } = useAuthStore();

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        if (values.addToGit && !details.gitName) {
          toast.error("GitHub Connection Required", {
            description: "Please connect your GitHub account first",
          });
          return;
        }

        // First create the project in the database
        await axios.post("api/project", {
          name: values.projectName,
          description: values.description,
          managerId: details.id,
          onGithub: values.addToGit,
        });

        // If GitHub integration is requested, create the repository
        if (values.addToGit) {
          try {
            await axios.post("api/github/create-repo", {
              name: values.projectName,
              description: values.description,
            });
            toast.success("Project created and added to GitHub!");
          } catch (error) {
            toast.error("Project created but GitHub repo creation failed", {
              description: (error as Error).message,
            });
          }
        } else {
          toast.success("Project created successfully!");
        }

        // Refresh the projects list
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.get("projects")],
        });

      } catch {
        toast.error("Failed to create project", {
          description: "Please try again later",
        });
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
        <FormField
          control={form.control}
          name="addToGit"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none text-gray-500 text-sm">
                <FormLabel>Click to create repo in your Github </FormLabel>
                <FormDescription>
                  Doing this would enable you to monitor your project using
                  Github
                </FormDescription>
                <FormMessage />
              </div>
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
