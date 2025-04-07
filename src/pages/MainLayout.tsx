import { Outlet } from "react-router-dom";
import MainNavigation from "../features/main/MainNavigation";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-vw h-dvh">
      <MainNavigation />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
