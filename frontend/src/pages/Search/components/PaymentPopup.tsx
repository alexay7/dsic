import React, {useState} from "react";

import {Checkbox, FormControl, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {CardElement, useElements} from "@stripe/react-stripe-js";

import {loggedRequest} from "../../../api/api";
import {Popup} from "../../../components/Popup/Popup";
import {Car} from "../../../types/car";
import {Reserva} from "../../../types/reserva";

interface PaymentPopupProps {
    showPopup:boolean,
    closePopup:()=>void,
    vehicle:Car
}

export function PaymentPopup(props:PaymentPopupProps):React.ReactElement {
    const {showPopup, closePopup, vehicle} = props;
    const [days, setDays] = useState(1);
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [entrega, setEntrega] = useState(false);
    const [cardPresent, setCardPresent] = useState(false);
    const elements = useElements();

    async function payVehicle(e:React.FormEvent<HTMLFormElement>):Promise<void> {
        e.preventDefault();
        const card = elements?.getElement(CardElement);
        if (!card) return;
        const extra = entrega ? 50 : 0;
        const newReserva:Reserva = {
            vehicleId:vehicle._id,
            city:city,
            address:address,
            days:days,
            price:(vehicle.price * days) + extra
        };

        const body = JSON.stringify(newReserva);

        const response = await loggedRequest("reservas", {method:"POST", body:body}) as Reserva;
        if (response) {
            window.location.href = "/reservas";
        }
    }

    return (
        <Popup showPopup={showPopup} closePopup={closePopup}>
            <form action="" className="flex flex-col gap-2 justify-center my-4 mx-auto w-3/4" onSubmit={payVehicle}>
                <FormControl>
                    <TextField type="number" label="Número de días"
                        InputProps={{inputProps: {min: 1}}}
                        onChange={(e)=>setDays(parseInt(e.target.value || "0"))} value={days}
                    />
                </FormControl>
                <p className="border-b-primary border-b">Hasta el {new Date(new Date().getTime() + ((days + 1) * 24 * 3600 * 1000)).toLocaleDateString()}</p>
                <FormGroup>
                    <FormControlLabel control={(
                        <Checkbox checked={entrega} onChange={(e, checked)=>{
                            setEntrega(checked);
                        }}
                        />
                    )}
                    label="Entregar el vehículo a una dirección"
                    />
                </FormGroup>
                {entrega && (
                    <>
                        <FormControl>
                            <TextField type="text" label="Ciudad de entrega"
                                onChange={(e)=>setCity(e.target.value)} value={city}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField type="text" label="Dirección de entrega"
                                onChange={(e)=>setAddress(e.target.value)} value={address}
                            />
                        </FormControl>
                    </>
                )}
                <h3 className="text-primary text-xl">Datos de Pago</h3>
                <hr className="border-primary"/>
                <CardElement className="py-4 border border-primary px-2 rounded-lg border-dotted" options={{
                    iconStyle: "solid",

                    style: {
                        base: {
                            iconColor: "#004AAD",
                            color: "black",
                            fontWeight: 500,
                            fontFamily: "Montserrat, Open Sans, Segoe UI, sans-serif",
                            fontSize: "17px",
                            fontSmoothing: "antialiased",
                            ":-webkit-autofill": {
                                color: "#004AAD"
                            },
                            "::placeholder": {
                                color: "#004AAD"
                            }
                        },
                        invalid: {
                            iconColor: "#ffc7ee",
                            color: "#ffc7ee"
                        }
                    }
                }} onChange={(e)=>{
                    setCardPresent(e.complete);
                }}
                />
                <div className="">
                    <Checkbox required checked={cardPresent} className="cursor-default pointer-events-none"/>
                    <p>Los datos de la tarjeta son {cardPresent ? <span className="text-[#0f0] font-semibold">Válidos</span> : <span  className="text-[#f00] font-semibold">Inválidos</span>}</p>
                </div>
                <p className="rounded-lg border-primary border text-2xl text-primary font-semibold">{(vehicle.price * days) + (entrega ? 50 : 0)}€</p>
                <button className="disabled:bg-opacity-50 disabled:border-opacity-50 duration-150 px-4 py-1 bg-primary text-[#FFF] border-2 border-primary rounded-lg font-semibold hover:bg-[#FFF] hover:text-primary" disabled={!cardPresent} type="submit">Pagar</button>
            </form>
        </Popup>
    );
}