import React from "react";

import {ReactComponent as AudiLogo} from "../../assets/icons/audi.svg";
import {ReactComponent as BmwLogo} from "../../assets/icons/bmw.svg";
import {ReactComponent as FordLogo} from "../../assets/icons/ford.svg";
import {ReactComponent as HyundaiLogo} from "../../assets/icons/hyundai.svg";
import {ReactComponent as MercedesLogo} from "../../assets/icons/mercedes.svg";
import {ReactComponent as MiniLogo} from "../../assets/icons/mini.svg";
import {ReactComponent as SeatLogo} from "../../assets/icons/seat.svg";
import {ReactComponent as VolswagenLogo} from "../../assets/icons/volkswagen.svg";
import {ReactComponent as VolvoLogo} from "../../assets/icons/volvo.svg";
import BestPrices from "../../assets/img/bestprices.webp";
import FlexiblePrices from "../../assets/img/flexible.webp";
import NoCosts from "../../assets/img/nocost.png";
import {PageContainer} from "../../components/PageContainer/PageContainer";
import {SearchComponent} from "../../components/SearchComponent/SearchComponent";

export function Home(): React.ReactElement {

    return (
        <PageContainer>
            <SearchComponent/>
            <div className="my-8">
                <h3 className="text-4xl font-semibold">Los mejores vehículos del mercado</h3>
                <div className="h-52 flex my-8 flex-wrap gap-4 justify-center">
                    <AudiLogo/>
                    <BmwLogo/>
                    <FordLogo/>
                    <HyundaiLogo/>
                    <MercedesLogo/>
                    <MiniLogo/>
                    <SeatLogo/>
                    <VolswagenLogo/>
                    <VolvoLogo/>
                </div>
            </div>
            <div className="flex">
                <div className="h-40 w-1/3 flex items-center gap-4">
                    <img className="w-1/6" src={FlexiblePrices} alt="" />
                    <p className="uppercase text-3xl">Alquileres Flexibles</p>
                </div>
                <div className="h-40 w-1/3 flex items-center gap-2">
                    <img className="w-1/6" src={NoCosts} alt="" />
                    <p className="uppercase text-3xl">Sin Ningún Cargo Oculto</p>
                </div>
                <div className="h-40 w-1/3 flex items-center gap-2">
                    <img className="w-1/6" src={BestPrices} alt="" />
                    <p className="uppercase text-3xl">Los Mejores Precios del Mercado</p>
                </div>
            </div>
        </PageContainer>
    );
}
