import React, {useEffect, useState} from "react";

import {useSearchParams} from "react-router-dom";

import {anonymRequest} from "../../api/api";
import {CarComponent} from "../../components/CarComponent/CarComponent";
import {Loading} from "../../components/Loading/Loading";
import {PageContainer} from "../../components/PageContainer/PageContainer";
import {SearchComponent} from "../../components/SearchComponent/SearchComponent";
import {Car} from "../../types/car";

export function Search():React.ReactElement {
    const [searchParams] = useSearchParams();
    const [vehicles, setVehicles] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function getData():Promise<void> {
            setLoading(true);
            const response = await anonymRequest(`vehiculos?${searchParams.toString()}`, {method:"GET"}) as Car[];
            setVehicles(response);
            setTimeout(()=>{
                setLoading(false);
            }, 1500);
        }
        void getData();
    }, [searchParams]);

    return (
        <PageContainer>
            <SearchComponent/>
            {loading ? (
                <div className="flex justify-center py-8">
                    <Loading/>
                </div>
            ) : (
                <ul>
                    {vehicles.length > 0 ? vehicles.map((vehicle)=>(
                        <CarComponent car={vehicle} key={vehicle._id}/>
                    )) : (
                        <p className="text-primary text-2xl font-semibold">No se han encontrado resultados</p>
                    )}
                </ul>
            )}
        </PageContainer>
    );
}