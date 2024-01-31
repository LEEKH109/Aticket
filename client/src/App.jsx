import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
import { IsLoginProvider } from "./components/LoginContext";
import "./App.css";
import SelectDateTimePage from "./pages/SelectDateTimePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import ShortsPage from "./pages/ShortsPage";
import ChatListPage from "./pages/ChatListPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import UserPage from "./pages/UserPage";
import LoginLoad from "./pages/LoginLoad";
import Layout from "./pages/Layout";
import DetailPage from "./pages/DetailPage";
import CollectionList from "./components/CollectionList";
import BookHistoryList from "./components/BookHistoryList";

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
          children: [
            {
              path: ":categoryId/paging",
              element: <ChatRoomPage/>,
              errorElement: <ErrorPage/>
            }
          ]
        },
        {
          path: "/user",
          element: <UserPage />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: "collection",
              element: <CollectionList />,
              errorElement: <ErrorPage />,
            },
            {
              path: "bookhistory",
              element: <BookHistoryList />,
              errorElement: <ErrorPage />,
            },
          ],
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
          path: "/login/oauth2/code/kakao",
          element: <LoginLoad />,
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
      <div className="relative mx-auto max-w-[412px] h-[100vh]">
        <IsLoginProvider>
          <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        </IsLoginProvider>
      </div>
    </>
  );
}

if (typeof window !== 'undefined' && typeof window.global === 'undefined') {
  window.global = window;
}

export default App;
