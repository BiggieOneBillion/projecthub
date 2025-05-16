"use client";
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
import { useSetUpStore } from "@/store/setup-store";

const formSchema = z.object({
  projectname: z.string().min(1, { message: "*cannot be empty" }),
  description: z.string().min(1, { message: "*cannot be empty" }),
});

export default function ProjectSetUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectname: "",
      description: "",
    },
  });

  const { setCurrentStep, setProjectName, setProjectDescription } =
    useSetUpStore();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setProjectName(values.projectname);
    setProjectDescription(values.description);
    setCurrentStep(1);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  py-3">
        <FormField
          control={form.control}
          name="projectname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input placeholder="project name" type="" {...field} />
              </FormControl>
              {/* <FormDescription>Enter your project name</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>What is the project about?</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between w-full">
          <Button
            className="border-b border-dashed py-1 rounded-none hover:border-black text-base text-black/70"
            type="submit"
            variant={"outline"}
          >
            skip
          </Button>
          <Button className="bg-black text-white" type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
