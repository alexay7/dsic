import React, {useEffect, useState} from "react";

import {Rating} from "@mui/material";
import {toast} from "react-toastify";

import {loggedRequest} from "../../api/api";
import {Loading} from "../../components/Loading/Loading";
import {PageContainer} from "../../components/PageContainer/PageContainer";
import {Popup} from "../../components/Popup/Popup";
import {useAuth} from "../../contexts/AuthContext";
import {Reserva} from "../../types/reserva";

export function Reservas():React.ReactElement {
    const {userData} = useAuth();
    const [refresh, setRefresh] = useState(true);
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [reviewForm, setReviewForm] = useState(false);
    const [incidentForm, setIncidentForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function getData():Promise<void> {
            if (!userData || !refresh) return;
            setLoading(true);
            const response = await loggedRequest("reservas", {method:"GET"}) as Reserva[];
            setReservas(response);
            setRefresh(false);
            setLoading(false);
        }
        void getData();
    }, [userData, refresh]);

    function getStatus(reserva:Reserva):string {
        const now = new Date().getTime();
        const startDate = new Date(reserva.startDate || 0).getTime();
        const endDate = new Date(new Date(reserva.startDate || 0).getTime() + ((reserva.days + 1) * 24 * 3600 * 1000)).getTime();

        const startDiff = now - startDate;
        const endDiff = now - endDate;

        if (startDiff < 24 * 3600 * 1000) {
            // No ha pasado un día desde la reserva
            return "En Preparación";
        } else if (endDiff < 0) {
            // El vehículo todavía está en plazo
            return "Activa";
        }
        return "Finalizada";

    }

    function closeReviewForm():void {
        setReviewForm(false);
    }

    function closeIncidentForm():void {
        setIncidentForm(false);
    }

    function handleReviewSubmit(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        toast.success("Tu valoración ha sido registrada con éxito");
        closeReviewForm();
    }

    function handleIncidentSubmit(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        toast.success("La incidencia ha sido registrada con éxito y nos pondremos en contacto contigo para solucionarla.");
        closeIncidentForm();
    }

    async function handleReservaCancel(reserva:Reserva):Promise<void> {
        try {
            await loggedRequest(`reservas/${reserva._id}`, {method:"DELETE"});
            toast.success("Reserva cancelada con éxito");
            setRefresh(true);
        } catch {
            toast.error("Algo salió mal");
        }
    }

    return (
        <PageContainer>
            <Popup showPopup={reviewForm} closePopup={closeReviewForm}>
                <form onSubmit={handleReviewSubmit} className="flex flex-col py-8 lg:max-w-xl mx-auto gap-4 items-center">
                    <label htmlFor="review" className="text-left w-3/4 text-primary font-semibold">Tu valoración</label>
                    <Rating id="review"/>
                    <label htmlFor="comments" className="text-left w-3/4 text-primary font-semibold">¿Algo que quieras decirnos?</label>
                    <textarea id="comments" placeholder="Comentarios" className="border border-primary rounded-lg text-lg w-3/4 px-4 py-2"/>
                    <button className="bg-primary border-primary text-[#fff] rounded-lg border hover:bg-[#fff] hover:text-primary duration-150 px-4 py-1">Enviar Valoración</button>
                </form>
            </Popup>
            <Popup showPopup={incidentForm} closePopup={closeIncidentForm}>
                <form onSubmit={handleIncidentSubmit} className="flex flex-col py-8 lg:max-w-xl mx-auto gap-4 items-center">
                    <label htmlFor="comments" className="text-left w-3/4 text-primary font-semibold">Cuéntanos más sobre tu incidencia</label>
                    <textarea required id="comments" placeholder="Detalles sobre la incidencia" className="border border-primary rounded-lg text-lg w-3/4 px-4 py-2"/>
                    <button className="bg-primary border-primary text-[#fff] rounded-lg border hover:bg-[#fff] hover:text-primary duration-150 px-4 py-1">Reportar Incidencia</button>
                </form>
            </Popup>
            <h2 className="text-3xl text-primary font-semibold my-4">Tus Reservas</h2>
            <hr className="mb-8 border-primary"/>
            {loading ? (
                <div className="flex justify-center py-8">
                    <Loading/>
                </div>
            ) : (
                <ul className="flex flex-col gap-2 my-2">
                    {reservas.map((e)=>(
                        <div key={e._id}>
                            <li className="flex w-10/12 m-auto items-center">
                                {e.vehicle && (
                                    <>
                                        <div className="w-1/6">
                                            <img src={e.vehicle.imageUrl} alt="" />
                                        </div>
                                        <div className="flex w-4/6 justify-around">
                                            <div className="flex flex-col">
                                                <b>{e.vehicle.brand} - {e.vehicle.model} ({e.vehicle.year})</b>
                                                <div className="flex flex-col">
                                                    <p>Fecha de Recogida:</p>
                                                    <p>Fecha de entrega:</p>
                                                    <p>Entregar en:</p>
                                                    <p>Estado:</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <b>Información de la reserva</b>
                                                <div className="flex flex-col">
                                                    <p>{new Date(new Date(e.startDate || 0).getTime() + (24 * 3600 * 1000)).toLocaleDateString("es-ES")}</p>
                                                    <p>{new Date(new Date(e.startDate || 0).getTime() + ((e.days + 1) * 24 * 3600 * 1000)).toLocaleDateString("es-ES")}</p>
                                                    <p>{e.city} - {e.address}</p>
                                                    <p>{getStatus(e)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/6 flex flex-col justify-evenly gap-2">
                                            {getStatus(e) === "En Preparación" && (
                                                <button className="bg-[#f00] border-[#f00] text-[#fff] rounded-lg border hover:bg-[#fff] hover:text-[#f00] duration-150" onClick={()=>{
                                                    if (confirm("¿Estás seguro de que quieres cancelar tu reserva?")) {
                                                        void handleReservaCancel(e);
                                                    }
                                                }}
                                                >Cancelar Reserva
                                                </button>
                                            )}
                                            {getStatus(e) === "Finalizada" && (
                                                <button className="bg-primary border-primary text-[#fff] rounded-lg border hover:bg-[#fff] hover:text-primary duration-150" onClick={()=>setReviewForm(true)}>Valorar Reserva</button>
                                            )}
                                            <button className="bg-[#f90] border-[#f90] text-[#fff] rounded-lg border hover:bg-[#fff] hover:text-[#f90] duration-150" onClick={()=>setIncidentForm(true)}>Reportar Incidencia</button>
                                        </div>
                                    </>
                                )}
                            </li>
                            <hr className="border-primary"/>
                        </div>
                    ))}
                </ul>
            )}
        </PageContainer>
    );
}