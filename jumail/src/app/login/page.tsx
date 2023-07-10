'use client'

import { store } from "@/store";
import { Provider } from "react-redux";
import { EmailScreen } from "./EmailScreen";

export default function Login() {
    return(
        <Provider store={store}>
            <EmailScreen />
        </Provider>
    )
}