import React, {createContext, useContext, useEffect, useState} from "react";

import {loggedRequest} from "../api/api";
import {deleteCookie, getCookie} from "../helpers/helpers";
import {User} from "../types/user";

interface AuthContextType {
    userData: User | null;
    setUserData: (v: User) => void;
    logout:()=>void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export function useAuth(): AuthContextType {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider(props: AuthProviderProps): React.ReactElement {
    const [userData, setUserData] = useState<User | null>(null);
    const {children} = props;

    function logout():void {
        setUserData(null);
        deleteCookie("token");
        window.location.reload();
    }

    useEffect(() => {
        async function getData(): Promise<void> {
            try {
                const response = await loggedRequest("me", {method: "GET"}) as User;
                setUserData(response);
            } catch {
                logout();
            }
        }
        if (!userData && getCookie("token")) {
            void getData();
        }
    }, [userData]);

    return (
        <AuthContext.Provider value={{userData, setUserData, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
