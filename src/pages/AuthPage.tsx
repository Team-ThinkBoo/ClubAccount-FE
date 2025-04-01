import { useSearchParams } from "react-router-dom";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import { AuthPageSearchParams } from "../types/types";
import ChangePW from "../features/auth/ChangePW";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") as AuthPageSearchParams | null;

  return (
    <div className="flex flex-col items-center justify-center w-11/12 mx-auto h-fit px-5 py-16 rounded-xl shadow-[0px_3px_10.8px_2px_rgba(0,_0,_0,_0.07)]">
      {(!mode || mode === "login") && <Login />}
      {mode === "signup" && <Signup />}
      {mode === "changePW" && <ChangePW />}
    </div>
  );
};

export default AuthPage;
