import { observable } from "mobx";
import React from "react";
import { MenuButton } from "./menu.button.component";
import { observer } from "mobx-react";
import { IMenu, IMenuItem, IMenuState } from "./menu.list.component";

export interface MenuProps {
    menuItems: IMenu;
}

@observer export class Menu extends React.Component<MenuProps, {}> {

    private menuState = observable.box<IMenuState>([]);

    private get getMenuState(): IMenuState {
        return this.menuState.get();
    }

    private ascendMenu = () => {
        const menuState = this.getMenuState;
        if (menuState.length > 0) {
            menuState.pop();
            this.menuState.set(menuState);
        }
    }

    private descendMenu = (key: IMenuItem) => {
        const menuState = this.getMenuState;
        menuState.push(key);
        this.menuState.set(menuState);
    }

    private resetMenuState = () => {
        this.menuState.set([]);
    }

    render() {
        return (
            <MenuButton
                menu={this.props.menuItems}
                menuState={this.getMenuState}
                ascendMenu={this.ascendMenu}
                descendMenu={this.descendMenu}
                resetMenuState={this.resetMenuState}
            />
        );
    }
}
