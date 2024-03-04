import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Teste from './teste.jsx'
import Home from './Views/Home.jsx'
import Dashboard from './Views/Dashboard.jsx'

const router = createBrowserRouter([
    {
        path: "/main_window",
        element: <Teste />,
        children: [
            {
                path: "/main_window",
                element: <Home />
            },
            {
                path: "dashboard",
                element: <Dashboard/>
            }
        ]
    }
]);

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
