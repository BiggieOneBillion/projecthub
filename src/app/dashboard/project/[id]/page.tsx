import ProjectDetailsView from "./_component/project-details-view";
// import { useRouter } from "next/navigation";

// const handleChecking = async () => {
//   try {
//     const res = await axios.post("api/auth/verify-git-login-status", {});
//     if (res.status === 200) {
//       return true;
//     }
//   } catch (error) {
//     return false;
//   }
// };

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const isGitConnected = await handleChecking();
  const { id } = await params;
  // const router = useRouter();

  // if (!isGitConnected) {
  //   router.push("/dashboard");
  //   return null;
  // }
  return <ProjectDetailsView id={id} />;
}
