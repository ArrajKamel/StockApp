import axios from 'axios';
import {CompanySearch} from "./company";

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