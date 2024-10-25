import React from "react";
import {Link, useLocation} from "react-router-dom"
import './Navbar.css';

const Navbar = () => {

    const location = useLocation();
    
    return(
        <div>
            <nav className='Navbarnav'>
                <ul className='Navbarul'>
                    <li>
                        <Link className={`navbarlink ${location.pathname === "/produit" ? "active" : ""}`} to="/produit">Produit</Link>
                    </li>
                    <li>
                        <Link className={`navbarlink ${location.pathname === "/profil" ? "active" : ""}`} to="/profil">Profil</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;

