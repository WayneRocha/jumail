'use client'

import Menu from "@/components/Menu";
import { ListDetails } from '@/components/ListDetails';
import { useRouter } from 'next/navigation';
import { EmailPanel } from '@/components/EmailPanel';
import { useEffect } from 'react';
import { ReduxProvider } from "@/store/provider";

export default function AppContent(props: any) {
    const router = useRouter();
    
    useEffect(() => {
        const hasEmail = window.localStorage.getItem("ui.user_email") !== null;

        if (!hasEmail) {
            router.replace("/login");
        }
    }, []);

    return (
        <ReduxProvider>
            <div className="flex flex-row h-[100%]" {...props}>
                <Menu />
                <ListDetails />
                <EmailPanel />
            </div>
        </ReduxProvider>
    )
}