import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import SelectDateTimePage from "./pages/SelectDateTimePage";
import ErrorPage from "./pages/ErrorPage";
import ShortsPage from "./pages/ShortsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ShortsPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/select",
      element: <SelectDateTimePage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <div className="relative mx-auto w-[412px] bg-slate-900 h-[100vh]">
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        <Footer />
      </div>
    </>
  );
}

export default App;
