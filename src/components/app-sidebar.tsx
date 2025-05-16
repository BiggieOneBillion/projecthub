"use client";
import * as React from "react";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { GalleryVerticalEnd, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      items: [
        {
          title: "Projects",
          url: "/dashboard",
          isActive: true,
          path: "/dashboard",
        },
        {
          title: "Employees",
          url: "/dashboard/employees",
          path: "/dashboard/employees",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  // console.log("PATHNAME", pathName);

  function checkPath(pathname: string, path: string): boolean {
    // console.log("PATHNAME", pathName);
    if (path === "/dashboard") {
      if (pathname === "/dashboard" || pathname.includes("dashboard/projects")) {
        return true;
      }
      return false;
    } else if (path === "/dashboard/employees") {
      if (
        pathname === "/dashboard/employees" ||
        pathname.includes("dashboard/employees")
      ) {
        return true;
      }
      return false;
    }
    return false;
  }

  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const handleLogOut = () => {
    startTransition(async () => {
      try {
        await axios.delete("api/auth/log-out");
        toast.success("Logged out successfully");
        router.push("/");
      } catch (error) {
        toast.error("Failed to log out");
      }
    });
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="w-full mt-1 px-3 py-3 bg-gray-200 rounded-md flex items-center gap-3">
          <GalleryVerticalEnd className="size-4" color="black" />
          <h2 className="font-semibold text-sm">Project Manager</h2>
        </div>

        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between mt-5 ">
        <section>
          {/* We create a SidebarGroup for each parent. */}
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={checkPath(pathName, item.path)}
                      >
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </section>
        <section className="px-3">
          <span className="hidden sr-only">log out</span>
          <button
            onClick={handleLogOut}
            className="w-full bg-black text-white mb-10 py-3 rounded-md font-semibold flex items-center justify-center"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Log Out"}
          </button>
        </section>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
