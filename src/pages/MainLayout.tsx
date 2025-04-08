import { Outlet } from "react-router-dom";
import MainNavigation from "../features/main/MainNavigation";
import ReceiptCapture from "../features/main/ReceiptCapture";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-vw h-dvh">
      <MainNavigation />
      <main className="w-full h-full">
        <Outlet />
        <ReceiptCapture />
      </main>
    </div>
  );
};

export default MainLayout;
