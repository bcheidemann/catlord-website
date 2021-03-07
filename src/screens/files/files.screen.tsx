import { observer } from "mobx-react";
import React from "react";
import { Button } from "semantic-ui-react";
import { Note } from "../../components/note/note.component";
import { NavigationStore } from "../../stores/navigation/navigation.store";
import { BaseScreen } from "../base.screen";
import * as HTTP from 'superagent';
import { CONFIG } from "../../config/config";
import { LoginStore } from "../../stores/login/login.store";
import * as path from 'path';

export interface FilesScreenProps {
}

@observer export class FilesScreen extends BaseScreen<FilesScreenProps, {}> {

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
                {!LoginStore.getAccessToken() &&
                    <h2>Login to download files.</h2>
                }
                {LoginStore.getAccessToken() &&

                    <>

                        <h2>File Download</h2>

                        <Note
                            style={{ backgroundColor: 'lightgray', padding: 16, borderRadius: 8 }}
                        >
                            <Button
                                content={`Download ${NavigationStore.path.get()}`}
                                onClick={() => {
                                    HTTP.get(CONFIG.API_BASE_URL + NavigationStore.path.get())
                                        .set({ 'Access-Token': LoginStore.getAccessToken() })
                                        .end((err, res) => {
                                            const { signedUrl } = res.body;
                                            const link = document.createElement('a');
                                            link.href = signedUrl;
                                            link.target = '_blank';
                                            document.body.appendChild(link);
                                            link.click();
                                            link.remove();
                                        })

                                }}
                            />
                            {/* <Button
                                content={`Download ${NavigationStore.path.get()}`}
                                onClick={() => {
                                    HTTP.get(CONFIG.API_BASE_URL + NavigationStore.path.get())
                                        .set({ 'Access-Token': LoginStore.getAccessToken() })
                                        .on('progress', (event) => {
                                            console.log(event);
                                        })
                                        .end((err, res) => {
                                            if (err) {
                                                console.error(err);
                                                return;
                                            }
                                            // TODO: large files???? signed url?
                                            const url = window.URL.createObjectURL(new Blob([res.text]));
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.setAttribute('download', `${path.basename(NavigationStore.path.get())}`);
                                            document.body.appendChild(link);
                                            link.click();
                                            link.remove();
                                        })

                                }}
                            /> */}
                        </Note>

                    </>
                }
            </div>
        );
    }
}
