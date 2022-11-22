import React from "react";

import {Footer} from "../Footer/Footer";
import {Header} from "../Header/Header";

interface PageContainerProps {
    children: React.ReactNode
}

export function PageContainer(props: PageContainerProps): React.ReactElement {
    const {children} = props;

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center">
                <Header/>
                <div className="w-10/12">
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    );
}
