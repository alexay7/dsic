import React from "react";

interface PopupProps {
    showPopup:boolean,
    closePopup:()=>void,
    children:React.ReactNode
}

export function Popup(props:PopupProps):React.ReactElement {
    const {children, showPopup, closePopup} = props;

    return (
        <>
            {showPopup && (
                <div className="fixed w-full h-screen bg-[#000] bg-opacity-20 top-0 left-0"/>
            )}
            <div className="fixed mt-20 z-10 w-full flex justify-center left-0 top-0">
                {showPopup && (
                    <div className="relative bg-[#fff] w-1/3 border-primary border-2 rounded-lg">
                        <div className="flex w-full justify-end">
                            <button className="border-2 text-primary border-primary rounded-full w-8 h-8 m-2 hover:bg-primary hover:text-[#fff] duration-150" onClick={closePopup}>X</button>
                        </div>
                        <hr className="border-primary border-2"/>
                        {children}
                    </div>
                )}
            </div>
        </>
    );
}