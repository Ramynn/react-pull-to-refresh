import { useState, useEffect } from 'react';

export const usePWA = () => {
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        const checkPWA = () => {
            const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 'standalone' in window.navigator;

            setIsStandalone(isStandaloneMode);
        };

        checkPWA();
        window.addEventListener('appinstalled', checkPWA);
        return () => window.removeEventListener('appinstalled', checkPWA);
    }, []);

    return isStandalone;
};