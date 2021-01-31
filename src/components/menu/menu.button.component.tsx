import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Icon } from 'semantic-ui-react';
import OutsideClickAlerter from "../clickalerter/clickalerter.component";
import { IMenu, IMenuItem, IMenuState, MenuList } from "./menu.list.component";

export interface MenuButtonProps {
    menu: IMenu;
    menuState: IMenuState;
    descendMenu: (key: IMenuItem) => void;
    ascendMenu: () => void;
    resetMenuState: () => void;
}

export interface MenuButtonState { }

@observer export class MenuButton extends React.Component<MenuButtonProps, MenuButtonState> {

    private showMenu = observable.box(false);

    private hideMenu = () => {
        runInAction(() => {
            this.showMenu.set(false);
        });
    }

    private toggleMenu = () => {
        runInAction(() => {
            if (!this.showMenu.get()) {
                // this.props.resetMenuState();
            }
            this.showMenu.set(!this.showMenu.get());
        });
    }

    private onSelectMenuItem = (menuItem: IMenuItem) => {
        this.hideMenu();
    }

    render() {
        return (
            <>
                <OutsideClickAlerter cb={this.hideMenu}>
                    <div style={{ width: 300, height: 50 }}>
                        <div
                            className={'noselect'}
                            style={{
                                fontSize: 20,
                                paddingLeft: 10,
                                paddingRight: 5,
                                backgroundColor: 'white',
                                height: 50,
                                width: 140,
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                borderWidth: 3,
                                borderColor: 'black',
                                borderRadius: 5,
                                borderStyle: 'solid',
                                borderBottomStyle: this.showMenu.get() ? 'none' : 'solid',
                                paddingBottom: this.showMenu.get() ? 3 : 0,
                                borderBottomLeftRadius: this.showMenu.get() ? 0 : 5,
                                borderBottomRightRadius: this.showMenu.get() ? 0 : 5,
                                cursor: 'pointer',
                                marginLeft: 'auto',
                            }}
                            onClick={this.toggleMenu}
                        >
                            Menu
                            <div style={{ width: 10 }} />
                            <div style={{ fontSize: 25, display: 'flex', alignItems: 'flex-end', height: 25 }}>
                                <Icon name='bars' size='small' />
                            </div>
                        </div>

                        <MenuList
                            menu={this.props.menu}
                            menuState={this.props.menuState}
                            onSelectMenuItem={this.onSelectMenuItem}
                            ascendMenu={this.props.ascendMenu}
                            descendMenu={this.props.descendMenu}
                            show={this.showMenu}
                        />
                    </div>
                </OutsideClickAlerter>
            </>
        );
    }
}
