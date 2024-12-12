import React, { useState } from "react";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="burger-menu">
            <button onClick={toggleMenu}>
                {/* Icon */}
            </button>
            {isOpen && (
                <div className="menu">
                    <ul>
                        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/login" onClick={toggleMenu}>Log In</Link></li>
                        <li><Link to="/signin" onClick={toggleMenu}>Sign In</Link></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BurgerMenu;
