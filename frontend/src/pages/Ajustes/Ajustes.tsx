import React, {useEffect, useState} from "react";

import {Checkbox, FormControlLabel, FormGroup, LinearProgress} from "@mui/material";
import * as firebase from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {toast} from "react-toastify";

import {loggedRequest} from "../../api/api";
import {PageContainer} from "../../components/PageContainer/PageContainer";
import {useAuth} from "../../contexts/AuthContext";

const firebaseConfig = {
    apiKey: "AIzaSyCoxCs7zqj_vTcXoNrJvQjNV2GKbqdsoWQ",
    authDomain: "dsic-d1a61.firebaseapp.com",
    projectId: "dsic-d1a61",
    storageBucket: "dsic-d1a61.appspot.com",
    messagingSenderId: "586684558292",
    appId: "1:586684558292:web:bb8bdf3669f4e2d0088441"
};

firebase.initializeApp(firebaseConfig);

const storage = getStorage();

export function Ajustes():React.ReactElement {
    const {userData} = useAuth();
    const [percent, setPercent] = useState(0);
    const [file, setFile] = useState<File>();
    const [type, setType] = useState("");

    const handleUpload = (event: React.FormEvent<HTMLFormElement>):void => {
        if (type === "") {
            toast.error("Debes seleccionar un tipo de permiso");
            return;
        }
        event.preventDefault();
        if (file) {
            const fileRef = ref(storage, `/permisos/${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percentAux = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setPercent(percentAux);
                },
                (err) => console.log(err),
                async() => {
                    // download url
                    await getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
                        const newPermiso = {
                            type:type,
                            documentUrl:url
                        };
                        try {
                            await loggedRequest("permisos", {method:"POST", body:JSON.stringify(newPermiso)}) as boolean;
                            window.location.reload();
                        } catch {
                            toast.error("Ha habido un error");
                        }
                    });
                }
            );
        }
    };

    useEffect(()=>{
        if (!userData) {
            window.location.href = "/";
        }
    }, [userData]);

    return (
        <PageContainer>
            <h3 className="text-3xl text-primary py-2">Tus permisos:</h3>
            {userData && (
                <div className="flex justify-center pb-4">
                    <FormGroup>
                        <FormControlLabel control={(
                            <Checkbox readOnly checked={userData?.licences?.includes("car")}/>
                        )}
                        label="Permiso de coche"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel control={(
                            <Checkbox readOnly checked={userData?.licences?.includes("bike")}/>
                        )}
                        label="Permiso de moto"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel control={(
                            <Checkbox readOnly checked={userData?.licences?.includes("furgo")}/>
                        )}
                        label="Permiso de furgoneta"
                        />
                    </FormGroup>

                </div>
            )}
            <hr className="border-primary"/>
            <div>
                <form className="flex flex-col justify-center p-4 gap-4 w-1/3 m-auto border-2 border-primary rounded-xl my-4" onSubmit={handleUpload}>
                    <select required className="border-primary border rounded-lg px-2 py-1 text-primary text-center" value={type} onChange={(e)=>{
                        setType(e.target.value);
                    }}
                    >
                        <option value="">-- Tipo de permiso -- </option>
                        <option value="car" hidden={userData?.licences?.includes("car")}>Coche</option>
                        <option value="bike" hidden={userData?.licences?.includes("bike")}>Moto</option>
                        <option value="furgo" hidden={userData?.licences?.includes("furgo")}>Furgoneta</option>
                    </select>
                    <input required className="m-auto" type="file" onChange={(e)=>{
                        if (e.target.files && e.target.files.length > 0) {
                            setFile(e.target.files[0]);
                        }
                    }}
                    />
                    <LinearProgress variant="determinate" value={percent}/>
                    <button className="m-auto w-1/2 bg-primary border border-primary text-[#fff] hover:bg-[#fff] hover:text-primary duration-150 rounded-lg">Subir Permiso</button>
                </form>
            </div>
        </PageContainer>
    );
}