import React, {useState} from "react";
import "../../css/navbar.css";
import {To, useNavigate} from "react-router-dom";

export function Navbar() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    const handleOptionClick = (path: To) => {
        navigate(path);
        setIsDropdownOpen(false);
    };

    return (
        <>
            <article className="navbar">
                <section className="navbar-left" onClick={() => navigate("/")}>
                    <img className="logo-navbar" src={require('../../images/logo_kleur.png')} alt="logo"/>
                </section>
                <section className="navbar-right">
                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <div className="navbar-item"><a>My Work</a></div>
                        {isDropdownOpen && (
                            <div className="dropdown-options">
								<div className="dropdown-item"
                                     onClick={() => handleOptionClick("/cinematography")}>Cinematography
                                </div>
                                <div className="dropdown-item"
                                     onClick={() => handleOptionClick("/videography")}>Videography
                                </div>
								<div className="dropdown-item"
                                     onClick={() => handleOptionClick("/photography")}>Photography
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="navbar-item" onClick={() => handleOptionClick("/about")}><a>About</a></div>
                </section>
            </article>
            <article className="navbar-phone">
                <img className="logo-navbar" src={require('../../images/logo_kleur.png')} onClick={() => navigate("/")}
                     alt="logo"/>
				<div className="navbar-item" onClick={() => handleOptionClick("/cinematography")}><a>Cinematography</a>
                </div>
                <div className="navbar-item" onClick={() => handleOptionClick("/videography")}><a>Videography</a>
                </div>
				<div className="navbar-item" onClick={() => handleOptionClick("/photography")}><a>Photography</a>
                </div>
                <div className="navbar-item" onClick={() => handleOptionClick("/about")}><a>About</a></div>
            </article>
        </>
    );
}
