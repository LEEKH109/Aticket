import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SelectDateTimePage from "./pages/SelectDateTimePage";
import ErrorPage from "./pages/ErrorPage";
import ShortsPage from "./pages/ShortsPage";
import ChatListPage from "./pages/ChatListPage";
import UserPage from "./pages/UserPage";
import Layout from "./pages/Layout";
import DetailPage from "./pages/DetailPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <ShortsPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/chat",
          element: <ChatListPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/user",
          element: <UserPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/select",
          element: <SelectDateTimePage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/art",
          element: <DetailPage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <div className="relative mx-auto w-[412px] bg-slate-900 h-[100vh]">
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>}></RouterProvider>
      </div>
    </>
  );
}

export default App;
