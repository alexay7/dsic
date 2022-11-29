import React from "react";

import {Car} from "../../types/car";

interface CarComponentProps {
    car:Car
}

export function CarComponent(props:CarComponentProps):React.ReactElement {
    const {car} = props;

    return (
        <div className="flex w-10/12 m-auto">
            <div className="w-1/6">
                <img src={car.imageUrl} alt="" />
            </div>
            <div className="flex w-4/6 justify-around">
                <div className="flex flex-col">
                    <b>{car.brand} - {car.model}</b>
                    <div className="flex flex-col">
                        <p>Tipo de Vehículo</p>
                        <p>Punto de recogida</p>
                        <p>Disponible</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <b>Desde {car.price}€/día</b>
                    <div className="flex flex-col">
                        <p>{car.type}</p>
                        <p>{car.location}</p>
                        <p>{car.available}</p>
                    </div>
                </div>
            </div>
            <div className="flex w-1/6 justify-center items-center">
                <button className="duration-150 px-4 py-1 bg-primary text-[#FFF] border-2 border-primary rounded-lg font-semibold hover:bg-[#FFF] hover:text-primary">Alquilar</button>
            </div>
        </div>
    );
}