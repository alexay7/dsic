import React from "react";

import {Route} from "react-router";
import {Routes} from "react-router-dom";

import "./App.css";
import {Login} from "./pages/Auth/Login";
import {Home} from "./pages/Home/Home";
import {Search} from "./pages/Search/Search";

function App(): React.ReactElement {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default App;
