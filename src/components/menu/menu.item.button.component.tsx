import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { NavigationStore } from "../../stores/navigation/navigation.store";
import { MenuItem } from "./menu.item.component";
import { IMenuItem, IMenuState } from "./menu.list.component";

export interface MenuItemButtonProps {
    menuItem: IMenuItem,
    menuState: IMenuState,
    onPress?: (menuItem: IMenuItem) => void;
}

@observer export class MenuItemButton extends React.Component<MenuItemButtonProps, {}> {

    private onClick = () => {
        if (this.props.onPress) {
            this.props.onPress(this.props.menuItem);
        }
    }

    private renderMenuItem(onPress?: () => void) {
        return (
            <MenuItem
                onPress={onPress}
                active={this.active}
            >
                {this.props.menuItem.name}
                {this.props.menuItem.subMenu &&
                    <Icon name='angle double right' />
                }
            </MenuItem>
        )
    }

    private get getRoutePrefix() {
        return this.props.menuState.map(stateMenuItem => stateMenuItem.subRoute).join();
    }

    private get active() {
        return (this.getRoutePrefix + this.props.menuItem.route === NavigationStore.path.get())
    }

    private renderMenuItemButton() {
        if (this.props.menuItem.route) {
            return (
                <Link to={this.getRoutePrefix + this.props.menuItem.route} onClick={this.onClick}>
                    {this.renderMenuItem()}
                </Link>
            )
        }
        else {
            return this.renderMenuItem(this.onClick);
        }
    }

    render() {
        return this.renderMenuItemButton();
    }
}
