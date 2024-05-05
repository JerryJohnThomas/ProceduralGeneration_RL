import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div>Home</div>
            Lets see the world <span /> <span />
            <Link to="/world">Ep1</Link>
            <br />
            Lets see the Player <span /> 
            <Link to="/player">Ep2 </Link>
        </>
    );
}

export default Home;
