import React from "react";

import Layout from "./views/layout";
import NotFound from "./views/404";

const Dashboard = React.lazy(() => import("./views/dashboard"));

let routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<>...</>}>
            <Dashboard />
          </React.Suspense>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];
export default routes;
