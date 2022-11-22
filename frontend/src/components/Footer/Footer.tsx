import React from "react";

export function Footer():React.ReactElement {
    return (
        <div className="bg-primary h-36 flex text-[#fff] justify-around py-4">
            <div className="flex flex-col justify-between">
                <h4 className="font-semibold text-3xl mb-4">Contacto</h4>
                <>
                    <p>+34 600 000 000</p>
                    <p>Avenida de Europa, 15, 28911, Leganés</p>
                </>
            </div>
            <div className="flex flex-col justify-between">
                <h4 className="font-semibold text-3xl mb-4">Más Información</h4>
                <p>Copyright &copy;2022 DSIC</p>
            </div>
        </div>
    );
}