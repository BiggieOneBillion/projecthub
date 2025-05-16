import { ArrowDown } from "lucide-react";
import CommitTable from "./_component/commit-table";

export default async function CommitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <section className="w-full space-y-5 py-5 md:py-10 md:px-10">
      <header>
        <h1 className="font-semibold text-xl text-black">Project Commits</h1>
        <p className="text-sm font-light flex flex-col text-gray-500">
          <span>This is a list of all the commits on this project.</span>
          <span className="font-medium flex items-center gap-1">
            From latest to oldest
            <ArrowDown className="h-3 w-3 inline-block" />
          </span>
        </p>
      </header>
      <section>
        <CommitTable projectId={id} />
      </section>
    </section>
  );
}
