import App                   from "../App.tsx";
import {createBrowserRouter} from "react-router-dom";
import HomePage              from "../Pages/HomePage/HomePage.tsx";
import CompanyPage           from "../Pages/CompanyPage/CompanyPage.tsx";
import SearchPage            from "../Pages/SearchPage/SearchPage.tsx";
import IncomeStatement       from "../Components/IncomeStatement/IncomeStatement.tsx";
import CompanyProfile        from  "../Components/CompanyProfile/CompanyProfile.tsx";
import DesignPage from "../Pages/DesignPage/DesignPage.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path : ""       , element: <HomePage />},
            {path : "design-guide" , element: <DesignPage />},
            {path : "search" , element: <SearchPage />},
            {
                path : "company/:ticker",
                element: <CompanyPage/>,
                children:[
                    {path : "company-profile" , element: <CompanyProfile /> },
                    {path : "income-statement", element: <IncomeStatement />}
                ]
            },
        ]
    }
])