"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

const Account = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleLogOut = () => {
    startTransition(async () => {
      try {
        await axios.delete("api/auth/log-out");
        toast.success("Logged out successfully");
        router.push("/");
      } catch {
        toast.error("Failed to log out");
      }
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src="/dummy-profile.png"
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogOut}>
          {isPending ? <Loader2 className="animate-spin" /> : "Log Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Account;
