import React from "react";
import { BaseScreen } from "../base.screen";

export interface DownloadsScreenProps {
}

export class DownloadsScreen extends BaseScreen<DownloadsScreenProps, {}> {

    render() {
        return (
            <div style={{ flex: 1, display: 'flex', padding: 20, alignItems: 'center', flexDirection: 'column' }}>
                <h2>World Downloads</h2>
                <p>
                    World downloads for each season will be accessible via this page after the season has finished.
                </p>
                <h3>Download Links</h3>
                <p>
                    The world download for CatLord season 1 is now available!
                </p>
                <p>
                    <div style={{ backgroundColor: 'lightgray', padding: 16, borderRadius: 8 }}>
                        <a href={'https://drive.google.com/file/d/1DiVeNrUxhTsgG58hc7L1AhqUBGjR8nVp/view?usp=sharing'} target="_blank">
                            Season 1: Download
                        </a>
                    </div>
                </p>
            </div>
        );
    }
}
