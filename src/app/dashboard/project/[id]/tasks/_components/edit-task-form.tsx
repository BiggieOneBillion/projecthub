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
import ReactSelect from "react-select";
import { v4 } from "uuid";
import useProjectEmployees from "@/hooks/use-project-employees";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/user-store";
import { addTaskForm } from "../../data/config-form-data";
import { useGetProject, useGetSingleTask } from "@/lib/query";

const formSchema = z.object({
  taskId: z.string(),
  name: z.string().min(1),
  status: z.string(),
  priority: z.string(),
  label: z.string(),
});

// {
//   "_id": "678d33c3b515edb1465ed201",
//   "name": "The beginning of the best work in the world",
//   "taskId": "TASK-8414",
//   "status": "backlog",
//   "priority": "low",
//   "label": "bug",
//   "projectId": {
//       "_id": "678cea688f485b3954e35841",
//       "name": "The life and times of the main players sam sam"
//   },
//   "assignedTo": [
//       {
//           "_id": "678d0060b515edb1465ed0c4",
//           "firstName": "xam",
//           "lastName": "bond",
//           "email": "admin@mail.com"
//       }
//   ],
//   "createdBy": "678a351a1c1a9b65cc560af1",
//   "createdAt": "2025-01-19T17:17:55.009Z",
//   "updatedAt": "2025-01-19T17:17:55.009Z",
//   "__v": 0
// }
export default function EditTaskForm({ id }: { id: string }) {
  const { data: defaultValue, isLoading: loadingDefault } =
    useGetSingleTask(id);

  const { data: projectData, isLoading } = useGetProject(id);
  const isGitProject =
    projectData && projectData.data && projectData.data.onGithub;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskId: "",
      label: defaultValue?.data.label || "",
      name: "",
      priority: defaultValue?.data.priority || "",
      status: defaultValue?.data.status || "",
    },
  });

  const params = useParams();

  const { data } = useProjectEmployees(params.id as string);

  const { details } = useAuthStore();

  const queryClient = useQueryClient();

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!defaultEmployeeValue) {
      toast.error("Unable To Submit Form As Employee Not Selected");
      return;
    }

    startTransition(async () => {
      try {
        await axios.put(`/api/tasks/${id}`, {
          ...values,
          projectId: params.id,
          createdBy: details.id,
          assignedTo: [
            employeeValue?.value
              ? employeeValue.value
              : defaultEmployeeValue?.value,
          ],
        });

        toast.success("Added Employee To Project Successfully");

        queryClient.invalidateQueries({ queryKey: ["project-task"] });
      } catch (_error) {
        // console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    });
  }

  const [defaultEmployeeValue, setDefaultEmployeeValue] = useState<{
    label: string;
    value: string;
  } | null>();

  const [defaultValues, setDefaultValues] = useState({
    label: "",
    priority: "",
    status: "",
  });

  const [defaultEmployeeOption, setDefaultEmployeeOption] = useState([]);
  const [employeeValue, setEmployeeValue] = useState<{
    label: string;
    value: string;
  } | null>();

  const handleReloadDefault = async () => {
    const res = await axios.get(`/api/tasks/${id}`);
    const info = res.data.data;
    form.reset({
      taskId: info.taskId,
      name: info.name,
    });
    setDefaultValues((prev) => ({
      ...prev,
      label: info.label,
      priority: info.priority,
      status: info.status,
    }));

    setDefaultEmployeeValue(() => {
      const format = info.assignedTo.map(
        (el: { _id: string; firstName: string }) => ({
          value: el._id,
          label: el.firstName,
        })
      );
      return format[0];
    });
  };

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

  useEffect(() => {
    handleReloadDefault();
  }, []);

  return (
    <>
      {loadingDefault && <p>Loading.....</p>}
      {defaultValue && defaultValue.data && (
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
                    <Input
                      placeholder="Enter the task "
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-400">
                    What is the task?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-12 gap-4">
              {defaultValues.status && (
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={defaultValues.status}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {isGitProject
                              ? addTaskForm.isGitStatus.map((stats) => (
                                  <SelectItem
                                    key={v4()}
                                    className="capitalise"
                                    value={stats}
                                  >
                                    {stats}
                                  </SelectItem>
                                ))
                              : addTaskForm.status.map((stats) => (
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
              )}

              {defaultValues.priority && (
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={defaultValues.priority}
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
              )}
            </div>

            {defaultValues.label && (
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>label</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={defaultValues.label}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {addTaskForm.label.map((value) => (
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
                      What type of task is it?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {defaultEmployeeValue && defaultEmployeeOption.length > 0 ? (
              <div className="space-y-1">
                <p className="text-xs text-gray-400 w-full text-right ">
                  Select employee to work on project
                </p>
                <ReactSelect
                  options={defaultEmployeeOption}
                  defaultValue={defaultEmployeeValue}
                  onChange={(option) => setEmployeeValue(option)}
                />
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Loader2Icon size={12} className="animate-spin" />
                <span className="text-sm font-normal">Loading...</span>
              </div>
            )}

            <div className="flex w-full items-end">
              <Button type="submit">
                {isPending ? (
                  <>
                    <Loader2Icon className="animate-spin" /> Submitting
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
