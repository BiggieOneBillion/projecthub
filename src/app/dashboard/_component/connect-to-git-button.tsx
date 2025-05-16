import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useTransition,
} from "react";

interface IConnectToGitBtn {
  btnText: string;
  updateText: Dispatch<SetStateAction<string>>;
}

const ConnectToGitBtn: React.FC<IConnectToGitBtn> = ({
  btnText,
  updateText,
}) => {
  const [isPending, startTransition] = useTransition();

  const handleLogin = () => {
    window.location.href = "/api/auth/github";
  };

  const handleChecking = useCallback(() => {
    startTransition(async () => {
      try {
        const res = await axios.post("api/auth/verify-git-login-status", {});
        if (res.status === 200) {
          updateText("Connected to Github");
        }
      } catch {
        updateText("Connect To Github");
      }
    });
  }, [updateText]);

  useEffect(() => {
    handleChecking();
  }, [handleChecking]);

  return (
    <button
      disabled={btnText === "Connected to Github"}
      onClick={handleLogin}
      className="text-sm font-semibold text-white bg-black rounded-md px-2 py-1 disabled:bg-black/70"
    >
      {isPending ? "..loading" : btnText}
    </button>
  );
};
export default ConnectToGitBtn;
