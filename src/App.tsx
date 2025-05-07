import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./pages/AuthLayout";
import AuthPage from "./pages/AuthPage";
import { PARAMS_IDS } from "./constants/constants";
import MainLayout from "./pages/MainLayout";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";
import ReceiptsPage from "./pages/ReceiptsPage";
import MyPage from "./pages/MyPage";
import { Toaster } from "sonner";
import EditEmailPage from "./pages/EditEmailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: `/receipts/:${PARAMS_IDS.Link}`,
        element: <ReceiptsPage />
      }
    ]
  },
  {
    path: "/mypage",
    element: <AuthLayout />,
    children: [
      { index: true, element: <MyPage /> },
      { path: "edit/email", element: <EditEmailPage /> }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ index: true, element: <AuthPage /> }]
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position="bottom-center" />
    </QueryClientProvider>
  );
}

export default App;
