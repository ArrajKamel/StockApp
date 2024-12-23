import "./Card.css";
import {CompanySearch} from "../../company";
import AddPortfolio from "../Portfolio/Portfolio.tsx";
import { SyntheticEvent } from "react";

interface Props  {
    id: string;
    searchResult: CompanySearch;
    onPortfolioCreate: (e: SyntheticEvent) => void;
};


const Card : React.FC<Props> = ({id, searchResult, onPortfolioCreate}: Props) : JSX.Element => {
  return <div className='card'>

      <img alt='company logo'/>
      <div className='details'>
          <h2>
              {searchResult.name} {id}
          </h2>
          <p className='price'>{searchResult.currency}</p>
      </div>

      <p className='info'>
            {searchResult.exchangeShortName} - {searchResult.stockExchange}
      </p>
      <AddPortfolio onPortfolioCreate={onPortfolioCreate} symbol={searchResult.symbol} />
  </div>
}

export default Card
