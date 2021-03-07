import React from "react";
import { Button, Input } from "semantic-ui-react";
import { Note } from "../../components/note/note.component";
import { BaseScreen } from "../base.screen";
import * as HTTP from 'superagent';
import { CONFIG } from "../../config/config";
import { LoginStore } from "../../stores/login/login.store";

export interface ManagementScreenProps {
}

export interface ManagementScreenState {
    updated: boolean,
    passwordsMatch: boolean,
}

export class ManagementScreen extends BaseScreen<ManagementScreenProps, ManagementScreenState> {

    private oldPassword: string = '';
    private newPassword1: string = '';
    private newPassword2: string = '';

    constructor(props) {
        super(props);
        this.state = { updated: false, passwordsMatch: true };
    }

    onPasswordChange() {
        if (this.newPassword1 === this.newPassword2) {
            this.setState({ passwordsMatch: true });
        }
        else {
            this.setState({ passwordsMatch: false });
        }
    }

    render() {
        const validToken = LoginStore.hasValidToken();

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
                {validToken &&
                    <Note
                        style={{ backgroundColor: 'lightgray', padding: 16, borderRadius: 8 }}
                    >
                        {this.state.updated &&

                            <div style={{
                                display: 'flex',
                                flex: 1,
                                flexDirection: 'row',
                                paddingTop: 10,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                Password updated.
                            </div>

                        }
                        {!this.state.passwordsMatch &&

                            <div style={{
                                display: 'flex',
                                flex: 1,
                                flexDirection: 'row',
                                paddingTop: 10,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                Passwords don't match.
                            </div>

                        }
                        <div style={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            Old Password
                            <div style={{ width: 10 }} />
                            <Input
                                onChange={(e, data) => {
                                    this.oldPassword = data.value;
                                }}
                                type={'password'}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            New Password
                            <div style={{ width: 10 }} />
                            <Input
                                onChange={(e, data) => {
                                    this.newPassword1 = data.value;
                                    this.onPasswordChange();
                                }}
                                type={'password'}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            New Password
                            <div style={{ width: 10 }} />
                            <Input
                                onChange={(e, data) => {
                                    this.newPassword2 = data.value;
                                    this.onPasswordChange();
                                }}
                                type={'password'}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 10,
                            justifyContent: 'flex-end',
                        }}>
                            <Button
                                fluid
                                onClick={() => {
                                    if (this.oldPassword && this.newPassword1 && this.newPassword2 && this.state.passwordsMatch) {
                                        HTTP.post(CONFIG.API_BASE_URL + '/updateuser')
                                            .send({
                                                oldPassword: this.oldPassword,
                                                newPassword: this.newPassword1,
                                            })
                                            .set({ 'Access-Token': LoginStore.getAccessToken() })
                                            .type('application/json')
                                            .accept('json')
                                            .end((err, res) => {
                                                if (err) {
                                                    console.error('Authentication Error:', err);
                                                } else {
                                                    if (res.body.updated) {
                                                        this.setState({ updated: true });
                                                    }
                                                    else {
                                                        console.error('User not created.');
                                                        this.setState({ updated: false });
                                                    }
                                                }
                                            });
                                    }
                                }}
                                content={'Create User'}
                                color={'black'}
                            />
                        </div>
                    </Note>
                }
                {!validToken &&
                    <h2>Login to update your password.</h2>
                }
            </div>
        );
    }
}
