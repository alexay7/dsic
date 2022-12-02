import React, {useState} from "react";

import {FormControl, TextField} from "@mui/material";
import {Elements, PaymentElement} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

import {Popup} from "../../../components/Popup/Popup";
import {Car} from "../../../types/car";

interface PaymentPopupProps {
    showPopup:boolean,
    closePopup:()=>void,
    vehicle:Car
}

const stripePromise = loadStripe("pk_test_Dt4ZBItXSZT1EzmOd8yCxonL");

export function PaymentPopup(props:PaymentPopupProps):React.ReactElement {
    const {showPopup, closePopup, vehicle} = props;
    const [days, setDays] = useState(1);

    const options = {
        // passing the client secret obtained from the server
        clientSecret: "{{CLIENT_SECRET}}"
    };

    console.log(vehicle.brand);

    return (
        <Popup showPopup={showPopup} closePopup={closePopup}>
            <form action="" className="flex flex-col gap-2 justify-center my-4 mx-auto w-3/4">
                <FormControl>
                    <TextField type="number" label="Número de días"
                        InputProps={{inputProps: {min: 0}}}
                        onChange={(e)=>setDays(parseInt(e.target.value || "0"))} value={days}
                    />
                </FormControl>
                <p className="border-b-primary border-b">Hasta el {new Date(new Date().getTime() + (days * 24 * 3600 * 1000)).toLocaleDateString()}</p>
                <p className="rounded-lg border-primary border text-2xl text-primary font-semibold">{vehicle.price * days}€</p>
                <Elements stripe={stripePromise} options={options}>
                    <form>
                        <PaymentElement />
                        <button>Submit</button>
                    </form>
                </Elements>
                <button className="duration-150 px-4 py-1 bg-primary text-[#FFF] border-2 border-primary rounded-lg font-semibold hover:bg-[#FFF] hover:text-primary">Pagar</button>
            </form>
        </Popup>
    );
}