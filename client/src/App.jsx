import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IsLoginProvider } from "./components/LoginContext";
import "./App.css";
import Footer from "./components/Footer";
import SelectDateTimePage from "./pages/SelectDateTimePage";
import MyPage from "./pages/MyPage";
import ErrorPage from "./pages/ErrorPage";
import ShortsPage from "./pages/ShortsPage";
import ChatListPage from "./pages/ChatListPage";
import UserPage from "./pages/UserPage";
import Layout from "./pages/Layout";

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
      ],
    },
    {
      path: "/mypage",
      element: <MyPage/>,
      errorElement: <ErrorPage/>
    }
  ]);

  return (
    <>
      <IsLoginProvider>
        <div className="relative mx-auto w-[412px] bg-slate-900 h-[100vh]">
          <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
          <Footer />
        </div>
      </IsLoginProvider>
    </>
  );
}

export default App;
