import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center w-lvw h-lvh">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
