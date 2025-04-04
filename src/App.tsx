import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./pages/AuthLayout";
import AuthPage from "./pages/AuthPage";
import { PARAMS_IDS } from "./constants/constants";
import MainPage from "./pages/MainPage";
import MainLayout from "./pages/MainLayout";
import { receiptLoader } from "./utils/loaderFn";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";

const router = createBrowserRouter([
  { path: "/", element: <MainLayout /> },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ index: true, element: <AuthPage /> }]
  },
  {
    path: `/:${PARAMS_IDS.CLUB_CODE}`,
    element: <MainLayout />,
    children: [{ index: true, element: <MainPage />, loader: receiptLoader }]
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
