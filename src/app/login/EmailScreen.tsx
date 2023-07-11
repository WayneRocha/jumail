'use client'

import { selectUserEmail, selectUserName, setUserEmail, setUserName } from "@/store/features/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function EmailScreen(){
    const dispatch = useDispatch();
    const router = useRouter();
    const userEmail = useSelector(selectUserEmail);
    const userName = useSelector(selectUserName);
    const [email, setEmail] = useState<string | null>(userEmail);
    const [name, setName] = useState<string | null>(userName);

    const handleSaveEmail = () => {
        if (email) {
            dispatch(setUserEmail(email));
        }
        alert("Email definido como "+email);
    };
    const handleSaveName = () => {
        if (name) {
            dispatch(setUserName(name));
        }
        alert("Nome definido como "+name);
    };

    return (
        <div className="flex items-center justify-center h-80">
            <div className="flex flex-col gap-2">
                <div className="join">
                    <input
                        type="email"
                        placeholder="Seu Email"
                        className="input input-bordered w-full max-w-xs join-item"
                        value={email || ""}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        required={true}
                    />
                    <button className="btn btn-md btn-accent join-item rounded-md" onClick={handleSaveEmail}>Usar este Email</button>
                </div>
                <div className="join">
                    <input
                        type="type"
                        placeholder="Seu Nome"
                        className="input input-bordered w-full max-w-xs join-item"
                        value={name || ""}
                        onChange={(e) => setName(e.currentTarget.value)}
                        required={false}
                    />
                    <button className="btn btn-md btn-accent join-item rounded-md" onClick={handleSaveName}>Usar este Nome</button>
                </div>
            </div>
        </div>
    )
}