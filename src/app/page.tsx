import { redirect } from "next/navigation";
// import HomePage from "./(home)/home";

export default function Home() {
  return redirect("/home");
  // return <HomePage />;
}
