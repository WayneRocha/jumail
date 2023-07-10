'use client'

import { store } from '@/store';
import { Provider } from 'react-redux'
import Menu from "@/components/Menu";
import { ListDetails } from '@/components/ListDetails';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import { useEffect } from 'react';
import { EmailPanel } from '@/components/EmailPanel';

loadAOS();

export default function AppContent() {
    const hasEmail = window.localStorage.getItem("ui.user_email") !== null;
    const router = useRouter();

    if (!hasEmail) {
        router.replace("/login");
        return (<></>);
    };

    return (
        <Provider store={store}>
            <div className="flex flex-row h-[100%]">
                <Menu />
                <ListDetails />
                <EmailPanel />
            </div>
        </Provider>
    )
}

function loadAOS() {
    AOS.init();

    // You can also pass an optional settings object
    // below listed default settings
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation  
    });
}
