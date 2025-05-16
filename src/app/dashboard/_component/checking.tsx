import { useAuthStore } from "@/store/user-store";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";

interface IChecking {
  close: () => void;
  updateText: Dispatch<SetStateAction<string>>;
}

const Checking = ({ close, updateText }: IChecking) => {
  const searchParams = useSearchParams();

  const token = searchParams.get("t");

  const { setGitName } = useAuthStore();

  const [message, setMessage] = useState("");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleChecking = useCallback(() => {
    const handleGetInfo = () => {
      startTransition(async () => {
        try {
          const res = await axios.get("api/github/get-user-info");
          if (res.status === 200) {
            setGitName(res.data.data.login);
          }
        } catch (error) {
          toast.error(`Error verifying token: ${(error as Error).message}`);
        }
      });
    };
    startTransition(async () => {
      try {
        const res = await axios.post("api/auth/verify-git-login", { token });
        if (res.status === 200) {
          handleGetInfo();
          toast.success(`Verification successful!`);
          // // console.log"This is just the way forward-----", res);
          setMessage("Verification complete");
          setTimeout(() => {
            close();
            router.push("/dashboard");
          }, 1500);
          updateText("Connected to Github");
        }
      } catch (error) {
        setMessage("Verifaction Failed");
        toast.error(`Error verifying token: ${(error as Error).message}`);
        setTimeout(() => {
          close();
          router.push("/dashboard");
        }, 1500);
        updateText("Error Connecting to Github");
      }
    });
  }, [close, router, token, updateText, setGitName]);

  useEffect(() => {
    handleChecking();
  }, [handleChecking]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/10 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md shadow-md min-w-[300px] w-fit relative flex flex-col items-center gap-3">
        {isPending ? (
          <h1 className="text-lg font-bold text-black">Checking...</h1>
        ) : (
          <h1 className="text-lg font-bold text-slate-900">{message}</h1>
        )}
        {!isPending && (
          <button
            onClick={close}
            className="text-sm font-medium border text-black"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};
export default Checking;
