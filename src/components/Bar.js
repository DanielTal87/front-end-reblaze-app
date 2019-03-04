import React from 'react';
import { NavLink } from "react-router-dom";

const Bar = () => {
    return (
        <div>
            <NavLink to="/home">nearby shops</NavLink>
            <NavLink to="/preferences">preferred shops</NavLink>
        </div>
    )
};

export default Bar;