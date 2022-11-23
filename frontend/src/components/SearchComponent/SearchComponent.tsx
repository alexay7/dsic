import React, {useState} from "react";

import {Box, FormControl, InputLabel, MenuItem, Select, Slider} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

export function SearchComponent():React.ReactElement {
    const [searchParams] = useSearchParams();
    const [type, setType] = useState(searchParams.get("type") || "");
    const [energy, setEnergy] = useState(searchParams.get("energy") || "");
    const [price, setPrice] = useState<number[]>([parseInt(searchParams.get("min") || "0"), parseInt(searchParams.get("max") || "1000")]);

    const navigate = useNavigate();

    function handleSubmit(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        const [min, max] = price;
        let url = "/search?";
        if (type) {
            url += `type=${type}&`;
        }
        if (energy) {
            url += `energy=${energy}&`;
        }
        url += `min=${min}&max=${max}`;
        navigate(url);
    }

    const marks = [
        {
            value: 0,
            label: "0€"
        },
        {
            value: 250,
            label: "250€"
        },
        {
            value: 500,
            label: "500€"
        },
        {
            value: 750,
            label: "750€"
        },
        {
            value: 1000,
            label: "1000€"
        }
    ];

    return (
        <>
            <h2 className="text-4xl mt-4 mb-2 font-semibold">¡Encuentra tu vehículo ideal!</h2>
            <form className="my-5 flex justify-between border-primary border-4 rounded-xl p-8" onSubmit={handleSubmit}>
                <FormControl className="w-1/5">
                    <InputLabel id="type-label">Tipo de vehículo</InputLabel>
                    <Select
                        labelId="type-label"
                        value={type}
                        label="Tipo de vehículo"
                        onChange={(e)=>setType(e.target.value)}
                    >
                        <MenuItem value="car">Coche</MenuItem>
                        <MenuItem value="furgo">Furgoneta</MenuItem>
                        <MenuItem value="bike">Moto</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className="w-1/5">
                    <InputLabel id="type-label">Combustible</InputLabel>
                    <Select
                        labelId="type-label"
                        value={energy}
                        label="Tipo de vehículo"
                        onChange={(e)=>setEnergy(e.target.value)}
                    >
                        <MenuItem value="electric">Eléctrico</MenuItem>
                        <MenuItem value="gas">Gasolina/Diesel</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{width: 300}}>
                    <Slider
                        getAriaLabel={() => "Temperature range"}
                        value={price}
                        onChange={(e, value)=>setPrice(value as number[])}
                        valueLabelDisplay="auto"
                        getAriaValueText={(e)=>`${e}€`}
                        max={1000}
                        step={50}
                        marks={marks}
                    />
                </Box>
                <button className="border-primary border-4 rounded-xl px-16 text-xl text-primary font-semibold hover:bg-primary hover:text-[#FFF] duration-150">Buscar!</button>
            </form>
        </>
    );
}