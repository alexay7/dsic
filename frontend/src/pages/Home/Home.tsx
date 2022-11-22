import React, {useState} from "react";

import {FormControl} from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";

import {PageContainer} from "../../components/PageContainer/PageContainer";

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

export function Home(): React.ReactElement {
    const [type, setType] = useState("");
    const [energy, setEnergy] = useState("");
    const [price, setPrice] = useState<number[]>([0, 1000]);

    return (
        <PageContainer>
            <div className="my-5 flex justify-between border-primary border-4 rounded-xl p-8">
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
            </div>
            <div className="my-8">
                <h3 className="text-4xl uppercase font-semibold">Los mejores vehículos del mercado</h3>
            </div>
        </PageContainer>
    );
}
