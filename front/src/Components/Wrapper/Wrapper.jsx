
import React, {useEffect, useState} from "react";
import axios from "axios";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import NavbarUser from "../Navbar/NavbarUser";

const Wrapper =({children}) =>{
    
    const currentPath = window.location.pathname;
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/Users/${userId}`).then((response) => {
          setUser(response.data);
        });
      }, []);

    if (currentPath === "/" || currentPath === "/connexion" ) {
        return <>{children}</>;
    }

    if (user.role === "user" ) {
        return (
            <div>
                <NavbarUser />
                <div>{children}</div>
            </div>
        );
    }

    return (
        <div>
            <NavbarAdmin />
            <div>{children}</div>
        </div>
    );
};

export default Wrapper;