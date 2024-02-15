import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IsLoginProvider } from "./components/LoginContext";
import "./App.css";
import SelectDateTimePage from "./pages/book/SelectDateTimePage";
import SeatBookingPage from "./pages/book/SeatBookingPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import ShortsPage from "./pages/ShortsPage";
import ChatListPage from "./pages/ChatListPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import UserPage from "./pages/UserPage";
import LoginLoad from "./pages/LoginLoad";
import Layout from "./pages/Layout";
import DetailPage from "./pages/DetailPage";
import CollectionPage from "./pages/CollectionPage";
import BillingApprovePage from "./pages/book/BillingApprovePage";
import BillingCancelPage from "./pages/book/BillingCancelPage";
import BillingFailPage from "./pages/book/BillingFailPage";
import BillingResultPage from "./pages/book/BillingResultPage";
import BillingPreviewPage from "./pages/book/BillingPreviewPage";
import StartPage from "./pages/StartPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  if (typeof window !== "undefined" && typeof window.global === "undefined") {
    window.global = window;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <StartPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/short",
          element: <ShortsPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/chat",
          element: <ChatListPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/chat/room/:category",
          element: <ChatRoomPage />,
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
        {
          path: "",
          element: <PrivateRoute />,
          children: [
            {
              path: "/user",
              element: <UserPage />,
              errorElement: <ErrorPage />,
            },
            {
              path: "/book",
              errorElement: <ErrorPage />,
              children: [
                {
                  path: "",
                  element: <SelectDateTimePage />,
                  errorElement: <ErrorPage />,
                },
                {
                  path: "seat",
                  element: <SeatBookingPage />,
                  errorElement: <ErrorPage />,
                },
              ],
            },
            {
              path: "billing/approve/:reservationId",
              element: <BillingApprovePage />,
              errorElement: <ErrorPage />,
            },
            {
              path: "billing/cancel/:reservationId",
              element: <BillingCancelPage />,
              errorElement: <ErrorPage />,
            },
            {
              path: "billing/fail/:reservationId",
              element: <BillingFailPage />,
              errorElement: <ErrorPage />,
            },
            {
              path: "/billing/preview",
              element: <BillingPreviewPage />,
              errorElement: <ErrorPage />,
            },
            {
              path: "/billing/result",
              element: <BillingResultPage />,
              errorElement: <ErrorPage />,
            },
            {
              path: "/collection",
              element: <CollectionPage />,
              errorElement: <ErrorPage />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <div className="relative mx-auto max-w-[412px] h-[100svh] overscroll-y-none touch-none">
        <IsLoginProvider>
          <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        </IsLoginProvider>
      </div>
    </>
  );
}

export default App;
