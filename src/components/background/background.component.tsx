import React from "react";
import { useWindowScroll } from 'react-use';

const MAX_SCROLL = 800;

export interface IBackgroundComponentProps { }

function bound(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export const BackgroundComponent: React.FC<IBackgroundComponentProps> = () => {

    const { y } = useWindowScroll();

    let bkgY: number = 0;

    const bkgX = bound((y/(MAX_SCROLL) * 100), 0, 100);

    return (
        <div style={{ position: 'fixed', top: 0, width: '100vw', height: '100vh', color: 'white', paddingTop: 80, zIndex: -999, backgroundPositionX: `${bkgX}%`, backgroundPositionY: `${bkgY}%` }} className={'fadebkg'} />
    );
}
