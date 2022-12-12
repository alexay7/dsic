import React, {useState} from "react";

import {FormControl, TextField} from "@mui/material";

import {anonymRequest} from "../../api/api";
import {PageContainer} from "../../components/PageContainer/PageContainer";
import {useAuth} from "../../contexts/AuthContext";
import {setCookie} from "../../helpers/helpers";

export function Login(): React.ReactElement {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setUserData} = useAuth();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        const body = {
            username,
            password
        };
        const response = await anonymRequest("login", {method: "POST", body: JSON.stringify(body)}) as {access_token: string};
        if (response.access_token !== null) {
            setUserData({username});

            setCookie("token", response.access_token, 365);
            window.location.href = "/";
        }
    }

    return (
        <PageContainer>
            <form onSubmit={handleSubmit} className="flex flex-col py-8 lg:max-w-xl mx-auto gap-4">
                <FormControl>
                    <TextField onChange={(e) => setUsername(e.target.value)} value={username} label="Nombre de Usuario"/>
                </FormControl>
                <FormControl>
                    <TextField type="password" onChange={(e) => setPassword(e.target.value)} value={password} label="Contraseña"/>
                </FormControl>
                <button className="w-1/3 rounded-lg mx-auto py-2 font-semibold bg-primary border-primary border-2 text-[#fff] hover:bg-[#fff] hover:text-primary">Iniciar Sesión</button>
            </form>
        </PageContainer>
    );
}
