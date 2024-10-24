import React, { Children } from "react";
import Navbar from "../Navbar/Navbar";

const Wrapper =({children}) =>{
    
    const currentPath = window.location.pathname;

    if (currentPath === "/" || currentPath === "/Connexion") {
        return <>{children}</>;
    }

    return (
        <div>
            <Navbar />
            <div>{children}</div>
        </div>
    );
};

export default Wrapper;