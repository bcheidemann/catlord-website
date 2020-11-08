import React from "react";
import { BaseScreen } from "../base.screen";

export interface FileNotFoundScreenProps {
}

export class FileNotFoundScreen extends BaseScreen<FileNotFoundScreenProps, {}> {

    render() {
        return (
            <div style={{ flex: 1, display: 'flex', padding: 20, alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ backgroundColor: 'lightgray', padding: 16, borderRadius: 8, marginTop: 32, marginBottom: 32 }}>
                    <h2 style={{textAlign: 'center'}}>Oopsie!</h2>
                    <p style={{textAlign: 'center'}}>
                        The file you're looking for doesn't exist.
                    </p>
                </div>
            </div>
        );
    }
}
