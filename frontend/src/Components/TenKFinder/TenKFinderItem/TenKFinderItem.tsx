import { Link } from "react-router-dom";
import {CompanyTenK} from "../../../company";
import './TenKFinderItem.css'

type Props = {
    tenK: CompanyTenK;
};

const TenKFinderItem = ({ tenK }: Props) => {
    const fillingDate = new Date(tenK.fillingDate).getFullYear();
    return (
        <Link
            reloadDocument
            to={tenK.finalLink}
            type="button"
            className="link-button dark"
        >
            10K - {tenK.symbol} - {fillingDate}
        </Link>
    );
};

export default TenKFinderItem;
