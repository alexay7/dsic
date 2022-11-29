import React from "react";

import {useSearchParams} from "react-router-dom";

import {CarComponent} from "../../components/CarComponent/CarComponent";
import {PageContainer} from "../../components/PageContainer/PageContainer";
import {SearchComponent} from "../../components/SearchComponent/SearchComponent";
import {Car} from "../../types/car";

export function Search():React.ReactElement {
    const [searchParams] = useSearchParams();
    console.log(searchParams.toString());

    const testCar:Car = {
        type:"Turismo",
        brand:"Nissan",
        model:"No se que",
        year:2022,
        location:"Madrid",
        price:100,
        available:true,
        imageUrl:"https://phantom-marca.unidadeditorial.es/f9a87dc891196072eff553d2d6efe055/resize/1320/f/jpg/assets/multimedia/imagenes/2021/11/24/16377343713828.jpg"

    };

    return (
        <PageContainer>
            <SearchComponent/>
            <ul>
                <CarComponent car={testCar}/>
            </ul>
        </PageContainer>
    );
}