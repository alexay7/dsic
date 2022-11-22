import React from "react";

import {createRoot} from "react-dom/client";
import "./index.css";
import {BrowserRouter} from "react-router-dom";

import App from "./App";
import {AuthProvider} from "./contexts/AuthContext";

const root = createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);
