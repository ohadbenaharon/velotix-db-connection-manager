import React, { FunctionComponent } from "react";
import HomePages from "./pages/HomePages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Details from "./pages/Details";

const queryClient = new QueryClient();

const App: FunctionComponent = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePages />,
    },
    {
      path: "/details/:id",
      element: <Details />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
