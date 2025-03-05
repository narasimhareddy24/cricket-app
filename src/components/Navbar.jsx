import React from "react";
import { Group } from '@mantine/core';
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <Group className="navbar-container" >

            <Link to="/live-scores">Live Scores</Link>
            <Link to="/schedule">Schedule</Link>
            <Link to="/news">News</Link>
            <Link to="/series">Series</Link>
            <Link to="/teams">Teams</Link>



        </Group>
    );
}

export default Navbar;