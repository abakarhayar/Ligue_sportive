import React from "react";
import Navbar from "../Navbar/Navbar";

const Wrapper =({children}) =>{
    
    const currentPath = window.location.pathname;

    if (currentPath === "/" || currentPath === "/connexion") {
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