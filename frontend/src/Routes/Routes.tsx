import App from "../App.tsx";
import {createBrowserRouter} from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage.tsx";
import CompanyPage from "../Pages/CompanyPage/CompanyPage.tsx";
import SearchPage from "../Pages/SearchPage/SearchPage.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path : ""       , element: <HomePage />},
            {path : "search" , element: <SearchPage />},
            {path : "company/:ticker", element: <CompanyPage />},

        ]
    }
])