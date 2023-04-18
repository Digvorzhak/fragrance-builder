import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import CollectionsPage from "./components/pages/CollectionsPage";
import MyCollectionsPage from "./components/pages/MyCollectionsPage";
import CreatePage from "./components/pages/CreatePage";
import Showcase from "./components/pages/Showcase";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/collections", element: <CollectionsPage /> },
  { path: "/my-collection", element: <MyCollectionsPage /> },
  { path: "/collections/create", element: <CreatePage /> },
  { path: "/collections/showcase/:fragranceID", element: <Showcase /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
