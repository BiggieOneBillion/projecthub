import BranchPageView from "./_component/branch-page-view";

export default async function BranchPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  return <BranchPageView branch={branch} />;
}
