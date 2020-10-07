import React from "react";

export interface PanoramaProps {
}

export class Panorama extends React.Component<PanoramaProps, {}> {
    render() {
        return (
            <div style={{ backgroundColor: 'lightblue', height: 200, width: '100vw' }}>
                <h1>
                    Panorama
                </h1>
            </div>
        );
    }
}

// <Panorama name='some text here' firstName='adfgsdfg' someNumber=2132354 />

// Hello, some text here
