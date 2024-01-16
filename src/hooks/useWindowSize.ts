import { useState, useEffect } from 'react';

interface IRes {
    width: number;
    height: number;
}

export const useWindowSize = (delay = 300): IRes => {
    const [windowSize, setWindowSize] = useState<IRes>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleWindowResize = () => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, delay);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return windowSize;
};
