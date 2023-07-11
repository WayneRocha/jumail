'use client'

import { EmailScreen } from "./EmailScreen";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { ReduxProvider } from "@/store/provider";
import { useEffect, useState } from "react";

export default function Login() {
    const [ clientSide, setClientSide ] = useState<boolean>(false);

    useEffect(() => {
        setClientSide(true);
    }, []);

    return(
        <ReduxProvider>
            <div className="h-screen">
                <Header/>
                {
                    clientSide ? (
                        <EmailScreen />
                    ) : (
                        <Loading />
                    )
                }
            </div>
        </ReduxProvider>
    )
}