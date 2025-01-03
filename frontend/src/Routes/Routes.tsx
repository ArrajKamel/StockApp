import App                   from "../App.tsx";
import {createBrowserRouter} from "react-router-dom";
import HomePage              from "../Pages/HomePage/HomePage.tsx";
import CompanyPage           from "../Pages/CompanyPage/CompanyPage.tsx";
import SearchPage            from "../Pages/SearchPage/SearchPage.tsx";
import RegisterPage          from "../Pages/RegisterPage/RegisterPage.tsx";
import IncomeStatement       from "../Components/IncomeStatement/IncomeStatement.tsx";
import CompanyProfile        from "../Components/CompanyProfile/CompanyProfile.tsx";
import DesignPage            from "../Pages/DesignPage/DesignPage.tsx";
import BalanceSheet          from "../Components/BalanceSheet/BalanceSheet.tsx"
import CashFlowStatement     from "../Components/CashFlowStatement/CashFlowStatement.tsx"
import LoginPage from "../Pages/LoginPage/LoginPage.tsx";
import ProtectedRoute from "./ProtectedRoutes.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path : ""       , element: <HomePage />},
            {path : "register"       , element: <RegisterPage />},
            {path : "login"       , element: <LoginPage />},
            {path : "design-guide" , element: <DesignPage />},
            {path : "search" , element: <ProtectedRoute><SearchPage/></ProtectedRoute> },
            {
                path : "company/:ticker",
                element: <ProtectedRoute><CompanyPage/></ProtectedRoute>,
                children:[
                    {path : "company-profile" , element: <CompanyProfile /> },
                    {path : "income-statement", element: <IncomeStatement />},
                    {path : "balance-sheet"   , element: <BalanceSheet />},
                    {path : "cashflow-statement"   , element: <CashFlowStatement />}
                ]
            },
        ]
    }
])