import React from "react";
import { Icon } from 'semantic-ui-react';

export interface MenuButtonProps {
}

export class MenuButton extends React.Component<MenuButtonProps, {}> {
    render() {
        return (
            <div style={{flex: 1, justifyContent: 'center', display: 'flex'}}>
                <div style={{ fontSize: 20, paddingLeft: 10, paddingRight: 5, backgroundColor: 'aqua', height: 40, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    Menu
                    <div style={{width: 10}} />
                    <div style={{fontSize: 25, display: 'flex', alignItems: 'flex-end', height: 25}}>
                        <Icon name='bars' size='small' />
                    </div>
                </div>
            </div>
        );
    }
}
