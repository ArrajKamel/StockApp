import logo from "./logo.png";
import "./Navbar.css";
import {Link} from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Logo and Links */}
            <div className="logo-links">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo"/>
                </Link>
                <div className="links">
                    <Link to={"/search"} className="dashboard-link">
                        search
                    </Link>
                </div>
            </div>

            {/* Login and Signup */}
            <div className="auth-buttons">
                <a href="#" className="login">
                    Login
                </a>
                <a href="#" className="signup">
                    Signup
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
