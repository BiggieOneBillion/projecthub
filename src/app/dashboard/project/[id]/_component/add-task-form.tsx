"use client";
import { useEffect, useState, useTransition } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addTaskForm } from "../data/config-form-data";
import { v4 } from "uuid";
import useProjectEmployees from "@/hooks/use-project-employees";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/user-store";
import ReactSelect from "react-select";

const formSchema = z.object({
  taskId: z.string(),
  name: z.string().min(1),
  status: z.string(),
  priority: z.string(),
  label: z.string(),
});

function generateUniqueTaskId() {
  const now = Date.now(); // Current timestamp in milliseconds
  const random = Math.floor(Math.random() * 10); // Single random digit
  const uniqueNum = (now % 9000) + 1000 + random; // Modulus ensures it's a 4-digit number
  return `TASK-${uniqueNum}`;
}

// interface IDatum {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   projectRole: string;
// }
export default function AddTaskForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskId: generateUniqueTaskId(),
      // assignedTo: [],
      label: "",
      name: "",
      priority: "",
      status: "",
    },
  });

  const params = useParams();

  const { data } = useProjectEmployees(params.id as string);

  const { details } = useAuthStore();

  const queryClient = useQueryClient();

  const [isPending, startTransition] = useTransition();

  const [defaultEmployeeOption, setDefaultEmployeeOption] = useState([]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!employeeValue) {
      toast.error("Please Select An Employee");
      return;
    }

    startTransition(async () => {
      try {
        // // console.logvalues);

        await axios.post("/api/tasks", {
          ...values,
          projectId: params.id,
          createdBy: details.id,
          assignedTo: [employeeValue.value],
        });

        toast.success("Added Task To Project Successfully");

        queryClient.invalidateQueries({ queryKey: ["project-task"] });
      } catch {
        // console.error("Form submission error", error);
        toast.error("Failed To Create Task. Please try again.");
      }
    });
  }

  const [employeeValue, setEmployeeValue] = useState<{
    label: string;
    value: string;
  } | null>();

  useEffect(() => {
    if (data && data.data) {
      setDefaultEmployeeOption(() =>
        data.data.map((item: { _id: string; firstName: string }) => ({
          label: item.firstName,
          value: item._id,
        }))
      );
    }
  }, [data]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl mx-auto py-5"
      >
        <FormField
          control={form.control}
          name="taskId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Id</FormLabel>
              <FormControl>
                <Input placeholder="" disabled type="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input placeholder="Enter the task " type="text" {...field} />
              </FormControl>
              <FormDescription className="text-xs text-gray-400">
                What is the task?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {addTaskForm.status.map((stats) => (
                        <SelectItem
                          key={v4()}
                          className="capitalise"
                          value={stats}
                        >
                          {stats}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs text-gray-400">
                    Current status of the task
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {addTaskForm.priority.map((value) => (
                        <SelectItem
                          key={v4()}
                          className="capitalise"
                          value={value}
                        >
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs text-gray-400">
                    How urgent is the task
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>label</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {addTaskForm.label.map((value) => (
                    <SelectItem key={v4()} className="capitalise" value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-xs text-gray-400">
                What type of task is it?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {defaultEmployeeOption.length > 0 ? (
          <div className="space-y-1">
            <p className="text-xs text-gray-400 w-full text-right ">
              Select employee to work on project
            </p>
            <ReactSelect
              options={defaultEmployeeOption}
              onChange={(option) => setEmployeeValue(option)}
            />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Loader2Icon size={12} className="animate-spin" />
            <span className="text-sm font-normal">Loading...</span>
          </div>
        )}
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
