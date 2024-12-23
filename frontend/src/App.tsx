import './App.css'
import CardList from './Components/CardList/CardList'
import Search  from './Components/Search/Search';
import {ChangeEvent, SyntheticEvent, useState} from "react";
import {searchCompany} from "./api.tsx";
import {CompanySearch} from "./company";



function App() {
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);

    const handelSearchChange = (e:ChangeEvent<HTMLInputElement>) => {
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
        }else if(Array.isArray(result.data)) {
            setSearchResult(result.data);
        }
        console.log(result.data);
    };

    const onPortfolioCreate =  (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(e);
    }

    // console.log(searchCompany("apple"));
  return (

      <div className="App">
          <>
              <Search
                  onSearchSubmit={onSearchSubmit}
                  search={search}
                  handelSearchChange={handelSearchChange}
              />
          </>

          {serverError && <h1>{serverError}</h1>}

          <div className="card-list-container">
              <CardList
                  searchResults={searchResult}
                  onPortfolioCreate={onPortfolioCreate}
              />
          </div>
      </div>
  );
}

export default App
