import React from "react";
import { ExternalLink } from "../../components/externallink/externallink.component";
import { Note } from "../../components/note/note.component";
import { BaseScreen } from "../base.screen";

export interface DownloadsScreenProps {
}

export class DownloadsScreen extends BaseScreen<DownloadsScreenProps, {}> {

    render() {
        return (
            <div
            style={{
                flex: 1,
                display: 'flex',
                padding: 20,
                paddingBottom: 100,
                alignItems: 'center',
                flexDirection: 'column',
                }}
            >
                <h2>World Downloads</h2>
                <p>
                    World downloads for each season will be accessible via this page after the season has finished.
                </p>
                <h3>Download Links</h3>
                <p>
                    The world download for CatLord season 1 is now available!
                </p>
                <br />
                <Note
                    style={{ backgroundColor: 'lightgray', padding: 16, borderRadius: 8 }}
                >
                    <p>
                        <ExternalLink
                            url={'http://www.catlord.co.uk/files/world_downloads/CatLordetal.zip'}
                        >
                            Season 1: Download
                        </ExternalLink>
                    </p>
                    <p>
                        <ExternalLink
                            url={'https://drive.google.com/file/d/1DiVeNrUxhTsgG58hc7L1AhqUBGjR8nVp/view?usp=sharing'}
                        >
                            Season 1: Download (Google Drive)
                        </ExternalLink>
                    </p>
                </Note>
            </div>
        );
    }
}
