import hero from "./hero.png";
import "./Hero.css";
import {Link} from "react-router";

const Hero = () => {
    return (
        <section id="hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    Financial data with no news.
                </h1>
                <p className="hero-description">
                    Search relevant financial documents without fear mongering and fake news.
                </p>
                <div>
                    <Link to={"/search"} className="hero-button">
                        Get Started
                    </Link>
                </div>
            </div>
            <div className="hero-image">
                <img src={hero} alt="Hero Illustration" />
            </div>
        </section>
    );
};

export default Hero;
