import {ChangeEvent, SyntheticEvent, useState} from "react";
import {CompanySearch} from "../../company";
import {searchCompany} from "../../api.tsx";
import Search from "../../Components/Search/Search.tsx";
import PortfolioList from "../../Components/Portfolio/PortfolioList/PortfolioList.tsx";
import CardList from "../../Components/CardList/CardList.tsx";
import Spinner from "../../Components/Spinner/Spinner.tsx";



const SearchPage = () => {
    //states
    const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);

    const handelSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
        console.log(e);
    };

    // syntheticEvent is just instead of MouseEvent, cuz MouseEvent is not good for a reason
    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchCompany(search);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            setSearchResult(result.data);
        }
        console.log(result.data);
    };

    const onPortfolioCreate = (e: any) => {
        e.preventDefault();
        const exists = portfolioValues.find((value) => value === e.target[0].value);
        if (exists) return;
        const newPortfolioValue = e.target[0].value;
        const updatedPortfolio = [...portfolioValues, newPortfolioValue];
        setPortfolioValues(updatedPortfolio);
    };

    const onPortfolioDelete = (e: any) => {
        e.preventDefault();
        const portfolioToDelete = portfolioValues.find((value) => value === e.target[0].value);
        const updatePortfolio = portfolioValues.filter(value => value !== portfolioToDelete);
        setPortfolioValues(updatePortfolio)
    }

    // console.log(searchCompany("apple"));
    return (
        <div className="App">
            <Search
                onSearchSubmit={onSearchSubmit}
                search={search}
                handelSearchChange={handelSearchChange}
            />
            <PortfolioList
                portfolioValues={portfolioValues}
                onPortfolioDelete={onPortfolioDelete}
            />
            <CardList
                searchResults={searchResult}
                onPortfolioCreate={onPortfolioCreate}
            />
            {serverError && <h1>
                {serverError}
                <Spinner/>
            </h1>}
        </div>
    );
}

export default SearchPage