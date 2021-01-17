import React, { useState } from "react";
import { useInterval, useWindowScroll } from 'react-use';
import useSpring from 'react-use/lib/useSpring';

const MAX_SCROLL = 800;

export interface IBackgroundComponentProps { }

function bound(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export const BackgroundComponent: React.FC<IBackgroundComponentProps> = () => {

    const { y } = useWindowScroll();

    const [x, setX] = useState(0);

    useInterval(() => {
        if (x === 0) {
            setX(1);
        } else {
            setX(0);
        }
    }, 3000);

    let bkgY: number = useSpring(x*100, 0.1, 20);

    const bkgX = bound((y/(MAX_SCROLL) * 100), 0, 100);

    return (
        <div style={{ position: 'fixed', top: 0, width: '100vw', height: '100vh', color: 'white', paddingTop: 80, zIndex: -999, backgroundPositionX: `${bkgX}%`, backgroundPositionY: `${bkgY}%` }} className={'fadebkg'} />
    );
}
