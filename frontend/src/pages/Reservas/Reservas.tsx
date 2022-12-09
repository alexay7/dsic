import React, {useEffect, useState} from "react";

import {loggedRequest} from "../../api/api";
import {PageContainer} from "../../components/PageContainer/PageContainer";
import {useAuth} from "../../contexts/AuthContext";
import {Reserva} from "../../types/reserva";

export function Reservas():React.ReactElement {
    const {userData} = useAuth();
    const [reservas, setReservas] = useState<Reserva[]>([]);

    useEffect(()=>{
        async function getData():Promise<void> {
            if (!userData) return;
            const response = await loggedRequest("reservas", {method:"GET"}) as Reserva[];
            console.log(response);
            setReservas(response);
        }
        void getData();
    }, [userData]);

    return (
        <PageContainer>
            <ul className="flex flex-col">
                {reservas.map((e)=>(
                    <li key={e._id}>
                        {e.vehicle && (
                            <p>{`${e.vehicle.brand} - ${e.vehicle.model} (${e.vehicle.year})`}</p>
                        )}
                    </li>
                ))}
            </ul>
        </PageContainer>
    );
}