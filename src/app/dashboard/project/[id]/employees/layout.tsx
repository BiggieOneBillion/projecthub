import { ReactNode } from "react";
import Header from "../../_component/Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className="flex flex-1 flex-col gap-4y">
        <Header />
        {children}
      </div>
    </main>
  );
}
