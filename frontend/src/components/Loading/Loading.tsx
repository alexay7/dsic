import React from "react";

import "./styles/loading.css";

export function Loading():React.ReactElement {
    return (
        <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}