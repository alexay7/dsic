import React, {useState} from "react";

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

import {useAuth} from "../../contexts/AuthContext";
import {PaymentPopup} from "../../pages/Search/components/PaymentPopup";
import {Car} from "../../types/car";

interface CarComponentProps {
    car:Car
}

const stripePromise = loadStripe("pk_test_51MCmpqAEVoflnZqxKlRQUgcplOTXmkm2LenZ5eIeMhE6JvL7i6wrjtJn2KJlSMMBfTeeoMW3KeB6rFbblqBc29q100wpiIX7QS", {locale:"es"});

export function CarComponent(props:CarComponentProps):React.ReactElement {
    const {userData} = useAuth();
    const {car} = props;
    const [payment, setPayment] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex w-10/12 m-auto items-center">
            {payment && (
                <Elements stripe={stripePromise}>
                    <PaymentPopup showPopup={payment} closePopup={()=>setPayment(false)} vehicle={car}/>
                </Elements>
            )}
            <div className="w-1/6">
                <img src={car.imageUrl} alt="" />
            </div>
            <div className="flex w-4/6 justify-around">
                <div className="flex flex-col">
                    <b>{car.brand} - {car.model} ({car.year})</b>
                    <div className="flex flex-col">
                        <p>Tipo de Vehículo</p>
                        <p>Punto de recogida</p>
                        <p>Disponible</p>
                        <p>Combustible</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <b>Desde {car.price}€/día</b>
                    <div className="flex flex-col">
                        <p>{car.type}</p>
                        <p>{car.location}</p>
                        <p>{car.available ? "Sí" : "No"}</p>
                        <p>{car.energy}</p>
                    </div>
                </div>
            </div>
            <div className="flex w-1/6 justify-center items-center">
                {car.available ? (
                    <button className="duration-150 px-4 py-1 bg-primary text-[#FFF] border-2 border-primary rounded-lg font-semibold hover:bg-[#FFF] hover:text-primary" onClick={()=>{
                        if (userData) {
                            if (!userData.licences?.includes(car.type)) {
                                toast.error("Debes añadir a tu perfil una licencia para poder conducir este vehículo");
                                navigate("/settings");
                                return;
                            }
                            setPayment(true);
                        } else {
                            toast.error("Debes haber iniciado sesión para poder alquilar vehículos");
                            navigate("/login");

                        }
                    }}
                    >Alquilar
                    </button>
                ) : (
                    <button  className="duration-150 px-4 py-1 bg-[#f00] text-[#FFF] border-2 border-[#f00] rounded-lg font-semibold" >No Disponible</button>
                )}
            </div>
        </div>
    );
}