import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
import { IsLoginProvider } from "./components/LoginContext";
import "./App.css";
import SelectDateTimePage from "./pages/SelectDateTimePage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import ErrorPage from "./pages/ErrorPage";
import ShortsPage from "./pages/ShortsPage";
import ChatListPage from "./pages/ChatListPage";
import UserPage from "./pages/UserPage";
import LoginLoad from "./pages/LoginLoad";
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
          path: "/loginpage",
          element: <LoginPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/mypage",
          element: <MyPage />,
          errorElement: <ErrorPage />,
        }
        ,
        {
          path: "/login/oauth2/code/kakao",
          element: <LoginLoad />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/art",
          element: <DetailPage />,
          errorElement: <ErrorPage />,
        }
      ],
    },
  ]);

  return (
    <>
      <div className="relative mx-auto w-[412px] bg-slate-900 h-[100vh]">
        <IsLoginProvider>
          <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        </IsLoginProvider>
      </div>
    </>
  );
}

export default App;