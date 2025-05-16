"use client";
import ProjectSetUpForm from "./project-setup-form";
import { useSetUpStore } from "@/store/setup-store";
import EmployeeInfoSetUpForm1 from "./employee-info-setup-form-1";

const InitialSetUpForm = () => {
  const { currentStep } = useSetUpStore();

  return (
    <main className="max-w-5xl w-[500px] min-w-[300px] px-5 pb-1 pt-3 rounded-md border">
      {/* here the initial components would live */}
      {currentStep === 0 && <ProjectSetUpForm />}
      {currentStep === 1 && <EmployeeInfoSetUpForm1 />}
      {/* <button className="py-2 rounded-md text-center inline-block w-full text-sm font-semibold bg-black text-white mb-3">
        Next
      </button> */}
    </main>
  );
};
export default InitialSetUpForm;
