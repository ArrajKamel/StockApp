import logo from "./logo.png";
import "./Navbar.css";
import {Link} from "react-router";
import {useAuth} from "../../Context/UseAuth.tsx";
import '../../Styles/tailwind.css'

const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuth();
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

            {isLoggedIn() ? (
                <div className="hidden lg:flex items-center space-x-6 text-back">
                    <div className="hover:text-darkBlue">Welcome, {user?.userName}</div>
                    <a
                        onClick={logout}
                        className="px-8 py-3 font-bold rounded text-white bg-green-400 hover:opacity-70"
                    >
                        Logout
                    </a>
                </div>
            ) : (
                <div className="hidden lg:flex items-center space-x-6 text-back">
                    <Link to="/login" className="hover:text-darkBlue">
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-8 py-3 font-bold rounded text-white bg-green-400 hover:opacity-70"
                    >
                        Signup
                    </Link>
                </div>
            )}

        </nav>
    );
};

export default Navbar;
