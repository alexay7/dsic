import React from "react";

import {Link} from "react-router-dom";

import Logo from "../../assets/img/logo.png";
import {useAuth} from "../../contexts/AuthContext";

export function Header(): React.ReactElement {
    const {userData, logout} = useAuth();

    return (
        <div className='bg-primary flex w-full justify-center text-[#FFF]'>
            <div className="max-w-7xl flex flex-row justify-evenly h-20 w-full items-center overflow-hidden">
                <Link to="/" className="flex items-center mt-2">
                    <img className="h-28 cursor-pointer" src={Logo} alt="" />
                </Link>
                <h2 className='uppercase w-1/2 font-bold text-2xl'>Te ayudamos a alquilar tu vehículo ideal</h2>
                {userData ? (
                    <div className="flex w-1/4 justify-evenly">
                        <Link to="/reservas" className='uppercase text-xl'>Mis Reservas</Link>
                        <button onClick={logout} className='uppercase text-xl'>Cerrar Sesión</button>
                    </div>
                ) : (
                    <div className="flex w-1/4 justify-evenly">
                        <Link to="/login" className='uppercase text-xl'>Iniciar Sesión</Link>
                        <Link to="/externo" className='uppercase text-xl'>Registro</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
