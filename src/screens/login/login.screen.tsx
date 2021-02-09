import React from "react";
import { Button, Input } from "semantic-ui-react";
import { Note } from "../../components/note/note.component";
import { BaseScreen } from "../base.screen";
import * as HTTP from 'superagent';
import { CONFIG } from "../../config/config";
import { LoginStore } from "../../stores/login/login.store";

export interface LoginScreenProps {
}

export class LoginScreen extends BaseScreen<LoginScreenProps, {}> {

    private username: string = '';
    private password: string = '';

    private returnToHome() {
        this.setState({ loggedIn: true })
    }

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
                {LoginStore.getAccessToken() &&
                    <Note
                        style={{ backgroundColor: 'green', padding: 16, borderRadius: 8 }}
                    >
                        Logged in.
                    </Note>
                }
                {!LoginStore.getAccessToken() &&
                    <Note
                        style={{ backgroundColor: 'lightgray', padding: 16, borderRadius: 8 }}
                    >
                        <div style={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            User
                        <div style={{ width: 10 }} />
                            <Input
                                onChange={(e, data) => {
                                    this.username = data.value;
                                }}
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
                            Password
                        <div style={{ width: 10 }} />
                            <Input
                                onChange={(e, data) => {
                                    this.password = data.value;
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
                                    if (this.username && this.password) {
                                        HTTP.post(CONFIG.API_BASE_URL + '/login')
                                            .send({
                                                username: this.username,
                                                password: this.password,
                                            })
                                            .type('application/json')
                                            .accept('json')
                                            .end((err, res) => {
                                                if (err) {
                                                    console.error('Authentication Error:', err);
                                                } else {
                                                    if (res.body.accessToken) {
                                                        console.log('LOGGED IN')
                                                        localStorage.setItem('accessToken', res.body.accessToken);
                                                        LoginStore.accessToken.set(res.body.accessToken);
                                                        this.returnToHome();
                                                    }
                                                }
                                            });
                                    }
                                }}
                                content={'Login'}
                                color={'black'}
                            />
                        </div>
                    </Note>
                }
            </div>
        );
    }
}
