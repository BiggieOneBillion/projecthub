import { create } from "zustand";

interface employeeDetails {
  employeeFullName: string;
  employeeEmail: string;
  projectRole: string;
  id: number;
}

interface IsetUp {
  userId: string;
  projectname: string;
  projectDescription: string;
  employeesDetails: employeeDetails[];
  currentStep: number;
  addEmployeeDetails: (employeeDetails: employeeDetails) => void;
  setCurrentStep: (currentStep: number) => void;
  setProjectName: (projectname: string) => void;
  setProjectDescription: (projectname: string) => void;
  setEmployeesDetails: (employeesDetails: employeeDetails[]) => void;
  updatingEmployeeDetails: (field: string, value: string, id: number) => void;
  deleteEmployeeDetails: (id: number) => void;
  setUserId: (id: string) => void;
}

export const useSetUpStore = create<IsetUp>()((set) => ({
  userId: "",
  projectname: "",
  projectDescription: "",
  employeesDetails: [
    {
      id: 1,
      employeeEmail: "",
      employeeFullName: "",

      projectRole: "member",
    },
  ],
  currentStep: 0,
  setCurrentStep: (currentStep: number) => set({ currentStep }),
  setProjectName: (projectname: string) => set({ projectname }),
  setProjectDescription: (projectname: string) =>
    set({ projectDescription: projectname }),
  setEmployeesDetails: (employeesDetails: employeeDetails[]) =>
    set((state) => ({
      employeesDetails: [...state.employeesDetails, ...employeesDetails],
    })),
  addEmployeeDetails: (employeesDetails: employeeDetails) =>
    set((state) => ({
      employeesDetails: [...state.employeesDetails, employeesDetails],
    })),
  updatingEmployeeDetails: (field: string, value: string, id: number) =>
    set((state) => {
      const result = state.employeesDetails.map((detail) => {
        if (detail.id === id) {
          return { ...detail, [field]: value };
        }
        return detail;
      });
      return {
        employeesDetails: result,
      };
    }),
  deleteEmployeeDetails: (id: number) =>
    set((state) => {
      const result = state.employeesDetails.filter(
        (detail) => detail.id !== id
      );
      return {
        employeesDetails: result,
      };
    }),
  setUserId: (userId: string) => set({ userId }),
}));
