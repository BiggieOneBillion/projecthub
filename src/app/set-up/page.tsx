
import InitialSetUpForm from "./_component/initial-setup-form";


export default async function SetUpPage(){
    return (
        <main className="flex flex-col justify-center items-center h-screen w-full">
             {/* initial setup of the workspace */}
             {/* it would be a multistage form with different steps */}
             <h1>Workspace SetUp</h1>
             <InitialSetUpForm />
        </main>
    )
}