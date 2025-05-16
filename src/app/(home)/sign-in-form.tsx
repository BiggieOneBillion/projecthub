"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

interface SignInFormProps {
  onSuccess: () => void;
  
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setDetails = useAuthStore((state) => state.setDetails);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("api/auth/log-in", { email, password });

      setDetails({
        id: response.data.data._id,
        email: response.data.data.email,
        username: response.data.data.name,
      });

      if (response.status === 200) {
        toast.success("Logged In Successfully");
        // also save the api in the local storage so the user can use it will on the app
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status! < 500) {
          toast.error(`${error.response!.data.Error}`);
          return;
        }
        toast.error(`Please Try Again`);
      }
    } finally {
      setIsLoading(false);
      onSuccess();
    }

    // Simulate API call
    // setTimeout(() => {
    //   setIsLoading(false);
    //   onSuccess();
    // }, 1000);
  };

  return (
    <div className="space-y-4 py-2 pb-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            required
            className="bg-gray-50 border-gray-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button variant="link" className="px-0 text-xs text-teal-600">
              Forgot password?
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="bg-gray-50 border-gray-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-teal-600 text-white hover:bg-teal-700"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div> */}

      {/* <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50">
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button> */}
    </div>
  );
}
