import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CharacterAnimationsProvider } from "./contexts/CharacterAnimations";
import { InterfaceButtonProvider } from "./contexts/InterfaceButton";
import { WorldEnvProvider } from "./contexts/WorldEnv";
import { PlayerProvider } from "./contexts/PlayerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <CharacterAnimationsProvider>
            <WorldEnvProvider>
                <InterfaceButtonProvider>
                    <PlayerProvider>
                        <App />
                    </PlayerProvider>
                </InterfaceButtonProvider>
            </WorldEnvProvider>
        </CharacterAnimationsProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
