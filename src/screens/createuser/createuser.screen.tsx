import React from "react";
import { Button, Input } from "semantic-ui-react";
import { Note } from "../../components/note/note.component";
import { BaseScreen } from "../base.screen";
import * as HTTP from 'superagent';
import { CONFIG } from "../../config/config";
import { LoginStore } from "../../stores/login/login.store";

export interface CreateUserScreenProps {
}

export interface CreateUserScreenState {
    lastUserCreated: string | null,
}

export class CreateUserScreen extends BaseScreen<CreateUserScreenProps, CreateUserScreenState> {

    private username: string = '';
    private password: string = '';

    constructor(props) {
        super(props);
        this.state = { lastUserCreated: null };
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
                        {this.state.lastUserCreated &&

                            <div style={{
                                display: 'flex',
                                flex: 1,
                                flexDirection: 'row',
                                paddingTop: 10,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                Created user: {this.state.lastUserCreated}
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
                                        HTTP.post(CONFIG.API_BASE_URL + '/createuser')
                                            .send({
                                                username: this.username,
                                                password: this.password,
                                            })
                                            .set({ 'Access-Token': LoginStore.getAccessToken() })
                                            .type('application/json')
                                            .accept('json')
                                            .end((err, res) => {
                                                if (err) {
                                                    console.error('Authentication Error:', err);
                                                } else {
                                                    if (res.body.created) {
                                                        this.setState({ lastUserCreated: this.username });
                                                    }
                                                    else {
                                                        console.error('User not created.');
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
                    <h2>Login to create a user.</h2>
                }
            </div>
        );
    }
}
