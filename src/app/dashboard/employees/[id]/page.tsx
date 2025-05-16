import Header from "@/components/header";
import EmployeeDetailsView from "./_component/employee-details-view";

export default async function EmployeeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <section className="space-y-10">
      <Header title="Employee Detail" />
      <section>
        {/* details */}
        <EmployeeDetailsView id={id} />
      </section>
    </section>
  );
}
