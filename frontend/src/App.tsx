import React from 'react'

import { Route } from 'react-router'
import { Routes } from 'react-router-dom'

import './App.css'
import { Login } from './pages/Auth/Login'
import { Home } from './pages/Home/Home'

function App (): React.ReactElement {
  return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
        </div>
  )
}

export default App
