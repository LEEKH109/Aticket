import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import SelectDateTimePage from "./pages/SelectDateTimePage";
import ErrorPage from "./pages/ErrorPage";
import Shorts from "./pages/Shorts";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Shorts />,
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
        <div className="px-[5%]">
          <h1 className="text-white text-2xl">test</h1>
          <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
