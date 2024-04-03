import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import Teste from './teste.jsx'
import Home from './Views/Home.jsx'
import Config from './Views/Config.jsx'
import { DataProvider } from './Context/DataContext.jsx';

const router = createHashRouter([
    {
        path: "/",
        element: <Teste />,
        children: [
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "dashboard",
                element: <Config />
            }
        ]
    }
]);

const root = createRoot(document.getElementById("root"));
root.render(
    <DataProvider>
        <RouterProvider router={router} />
    </DataProvider>
);
