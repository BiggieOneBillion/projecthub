import RepoInfoView from "./_component/repo-info-view";

export default async function RepoInfoPage({
  params,
}: {
  params: Promise<{ repo: string }>;
}) {
  const { repo } = await params;
  return <RepoInfoView repo={repo} />;
}
