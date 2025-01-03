import { Link } from "react-router-dom";
import "./Sidebar.css";
import {FaHome, FaBalanceScale, FaHandPaper, FaCashRegister} from "react-icons/fa";

const Sidebar = () => {
    return (
        <nav className="sidebar">

            {/*<button className="sidebar-toggle">*/}
            {/*    <i className="fas fa-ellipsis-v"></i>*/}
            {/*</button>*/}

            <div className="sidebar-content">
                <div className="menu">

                    <Link to="company-profile" className="menu-item" >
                        <FaHome />
                        <h6 className="menu-title">company portfolio</h6>
                    </Link>

                    <Link to="income-statement" className="menu-item" >
                        <FaHandPaper />
                        <h6 className="menu-title">Income Statement</h6>
                    </Link>

                    <Link to="balance-sheet" className="menu-item" >
                        <FaBalanceScale />
                        <h6 className="menu-title">Balance Sheet</h6>
                    </Link>

                    <Link to="cashflow-statement" className="menu-item" >
                        <FaCashRegister />
                        <h6 className="menu-title">Cashflow Statement</h6>
                    </Link>

                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
