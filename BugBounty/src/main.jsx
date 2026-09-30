import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import LangRepo from "./components/LangRepo.jsx";
import RepoIssues from "./components/RepoIssues.jsx";
import Layout from "./components/Layout.jsx";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import Watchlist from "./components/Watchlist.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/repo/:lang",
        element: <LangRepo />,
      },
      {
        path: "/repo/:owner/:repoName/issues",
        element: <RepoIssues />,
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WatchlistProvider>
      <RouterProvider router={router} />
    </WatchlistProvider>
  </StrictMode>,
);
