import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/tailwind.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./Routes/Routes.tsx";

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
