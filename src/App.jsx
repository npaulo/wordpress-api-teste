import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import News from "./pages/News.jsx";
import PageView, { pageLoader } from "./pages/PageView.jsx";
import NotFound from "./pages/NotFound.jsx";
import { BASE_URL } from "./constants.js";

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/noticias", element: <News /> },
    { path: "/:slug", element: <PageView />, loader: pageLoader },
    { path: "*", element: <NotFound /> },
  ],
  {
    basename: BASE_URL,
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}
