import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div>Home</div>
            Lets see the world <span /> <span />cha
            <Link to="/world">Ep1</Link>
            <br />
            Lets see the Player <span /> 
            <Link to="/player">Ep2 </Link>

            <br />
            Reddit guy  s please click here, no native suport for routing in github pages sadly <span /> 
            <Link to="/player">Reddit</Link>

            <br/>
            Deployed to Netlify too
        </>
    );
}

export default Home;
