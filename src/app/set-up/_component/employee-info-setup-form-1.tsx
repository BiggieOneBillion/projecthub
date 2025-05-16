"use client";
import { Input } from "@/components/ui/input";
import { generateSecureFourDigit } from "@/lib/utils";
import { useSetUpStore } from "@/store/setup-store";
import { useAuthStore } from "@/store/user-store";
import axios from "axios";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EmployeeInfoSetUpForm1 = () => {
  const {
    employeesDetails,
    updatingEmployeeDetails,
    addEmployeeDetails,
    deleteEmployeeDetails,
    setCurrentStep,
    projectname,
    projectDescription,
  } = useSetUpStore();

  const router = useRouter();

  const handleUpdate = (id: number, field: string, value: string) => {
    updatingEmployeeDetails(field, value, id);
  };

  const handleAddMoreEmployee = () =>
    addEmployeeDetails({
      id: generateSecureFourDigit(),
      employeeEmail: "",
      employeeFullName: "",
      projectRole: "member",
    });

  const { details } = useAuthStore();

  const handleContinue = async () => {
    const check = employeesDetails.filter(
      (detail) => detail.employeeEmail === "" || detail.employeeFullName === ""
    );
    if (check.length > 0) {
      toast.error("Please fill all the fields");
      return;
    }

    const setUpData = {
      userId: details.id,
      projectDetails: {
        name: projectname,
        description: projectDescription,
      },
      employeesDetails: employeesDetails.map((detail) => {
        return {
          fullname: detail.employeeFullName,
          email: detail.employeeEmail,
          projectRole: detail.projectRole,
        };
      }),
    };

    try {
      await axios.post("api/auth/set-up", setUpData);
      toast.success("Set Up Complete 😎");
      // go to dashboard
      router.push("/");
    } catch (_error) {
      toast.error("Network Error, Try Again!");
    }
  };

  const handlePrevious = () => {
    setCurrentStep(0);
  };

  return (
    <section className="flex flex-col gap-4 mb-4">
      <header className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-gray-600y w-fit px-2 py-1 border rounded bg-black/70 text-white">
          Employee Data
        </h3>
        <button
          onClick={handleAddMoreEmployee}
          className="px-2 py-1 bg-black text-white text-xs inline-block rounded-sm cursor-pointer"
        >
          add more employees
        </button>
      </header>
      <section className="space-y-3">
        {employeesDetails.map((details, index) => (
          <section key={details.id} className="grid grid-cols-2 gap-3 relative">
            {index > 0 && (
              <button
                onClick={() => deleteEmployeeDetails(details.id)}
                className="absolute top-4 bg-white -right-1 inline-block bordery border-red-800y text-red-600"
              >
                <Trash2 size={13} />
              </button>
            )}
            <div className="col-span-1">
              <label htmlFor="" className="text-sm text-gray-500">
                employee email
              </label>
              <Input
                placeholder=""
                className="w-full"
                value={details.employeeEmail}
                onChange={(e) =>
                  handleUpdate(details.id, "employeeEmail", e.target.value)
                }
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="" className="text-sm text-gray-500">
                employee fullname
              </label>
              <Input
                placeholder=""
                className="w-full"
                value={`${details.employeeFullName}`}
                onChange={(e) =>
                  handleUpdate(details.id, "employeeFullName", e.target.value)
                }
              />
            </div>
          </section>
        ))}
      </section>
      <footer className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          className="px-2 py-1 text-sm font-medium text-white bg-black rounded-sm flex items-center gap-1"
        >
          <ChevronLeft size={10} />
          previous
        </button>
        <button
          onClick={handleContinue}
          className="px-2 py-1 text-sm font-medium text-white bg-black rounded-sm flex items-center gap-1"
        >
          continue
          <ChevronRight size={10} />
        </button>
      </footer>
    </section>
  );
};
export default EmployeeInfoSetUpForm1;
