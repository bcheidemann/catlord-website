import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { BaseScreen } from "../base.screen";

export interface MapScreenProps {
}

export class MapScreen extends BaseScreen<MapScreenProps, {}> {

    render() {
        return (
            <div
                className={'fadeinmapdiv'}
                style={{
                    position: 'fixed',
                    display: 'flex',
                    zIndex: 9999999,
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: '#00000088',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        flex: 1,
                        maxWidth: 'calc(100% - 100)',
                        height: '100%',
                        maxHeight: 'calc(100% - 100)',
                        padding: 100,
                    }}
                >
                        <div
                            className={'noselect'}
                            style={{
                                flex: 1,
                                display: 'flex',
                                height: 50,
                                backgroundColor: '#111',
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingLeft: 20,
                                paddingRight: 10,
                                color: '#AAA',
                            }}
                        >
                            <div>
                                <h2>Return of the Cat Lord - World Map</h2>
                            </div>
                            <Link to={'/'}>
                                <div
                                    className={'fadebtn'}
                                >
                                    <Icon name={'window close outline'} size={'big'} />
                                </div>
                            </Link>
                        </div>
                        <iframe
                            title={'World Map'}
                            src={'http://51.77.116.86:3405'}
                            width={'100%'}
                            height={'100%'}
                            style={{
                                borderStyle: 'none',
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                            }}
                        />
                </div>
            </div>
        );
    }
}
