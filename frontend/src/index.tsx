import React from "react";

import {createRoot} from "react-dom/client";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import {AuthProvider} from "./contexts/AuthContext";

const root = createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <AuthProvider>
            <ToastContainer />
            <App />
        </AuthProvider>
    </BrowserRouter>
);
