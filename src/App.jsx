import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home.jsx";
import News from "./pages/News.jsx";
import PageView, { pageLoader } from "./pages/PageView.jsx";
import NotFound from "./pages/NotFound.jsx";
import Layout from "./components/Layout.jsx";

// Cada rota agora renderiza dentro de Layout
const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/noticias", element: <News /> },
      { path: "/:slug", element: <PageView />, loader: pageLoader },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
