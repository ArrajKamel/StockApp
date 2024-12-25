import axios from 'axios';
import {
    CompanyBalanceSheet,
    CompanyCashFlow,
    CompanyIncomeStatement,
    CompanyKeyMetrics,
    CompanyProfile,
    CompanySearch
} from "./company";

interface SearchResponse{
    data: CompanySearch[];
};

export const searchCompany = async (query: string) => {
    try{
        const data =  await axios.get<SearchResponse>(
            `https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
        );
        return data;
    }catch (error){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (error.isAxiosError) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            console.log("error message: ", error.message);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return error.message;
        } else {
            console.log("unexpected error, check the api stuff", error);
            return "dangerous error"
        }
    }
};

export const getCompanyProfile = async (query: string) => {
    try{
        return await axios.get<CompanyProfile>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${import.meta.env.VITE_API_KEY}`,
        );
    }catch (error){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log("error message from API: ", error.message);
    }
}

export const getKeyMetrics = async (query: string) => {
    try{
        return await axios.get<CompanyKeyMetrics>(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${import.meta.env.VITE_API_KEY}`,
        );
    }catch (error){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log("error message from API: ", error.message);
    }
}

export const getIncomeStatement = async (query: string) => {
    try{
        return await axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/api/v3/income-statement/${query}?period=annual&apikey=${import.meta.env.VITE_API_KEY}`,
        );
    }catch (error){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log("error message from API: ", error.message);
    }
}

export const getBalanceSheet = async (query: string) => {
    try{
        return await axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?period=annual&apikey=${import.meta.env.VITE_API_KEY}`,
        );
    }catch (error){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log("error message from API: ", error.message);
    }
}

export const getCashFlowStatement = async (query: string) => {
    try{
        return await axios.get<CompanyCashFlow[]>(
            `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?period=annual&apikey=${import.meta.env.VITE_API_KEY}`,
        );
    }catch (error){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log("error message from API: ", error.message);
    }
}