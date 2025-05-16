import Header from "@/components/header";
import EmployeeView from "./_component/employee-view";

export default async function EmployeesPage() {
  return (
    <section className="space-y-10">
      <Header title="Employees List" />
      <EmployeeView />
    </section>
  );
}
