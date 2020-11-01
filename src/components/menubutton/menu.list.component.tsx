import { reaction } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { NavigationStore } from "../../stores/navigation/navigation.store";
import { MenuItemButton } from "./menu.item.button.component";

export interface MenuListProps {
    show: any;
    hideMenu: () => void;
}

@observer export class MenuList extends React.Component<MenuListProps, {}> {

    private reactShowHide = reaction(
        () => this.props.show.get(),
        () => {
            const menuList = document.getElementById('MENU_LIST');
            if (menuList) {
                menuList.classList[this.props.show.get() ? 'add' : 'remove']('show');
                setTimeout(() => {
                    menuList.classList[this.props.show.get() ? 'remove' : 'add']('displace');
                }, this.props.show.get() ? 0 : 200)
            }

        }
    );

    public componentWillUnmount() {
        this.reactShowHide();
    }

    public render() {
        return (
            <div
                className={'hide displace'}
                id={'MENU_LIST'}
                style={{
                    position: 'relative',
                    backgroundColor: 'white',
                    borderWidth: 3,
                    borderColor: 'black',
                    borderRadius: 5,
                    borderStyle: 'solid',
                    borderTopRightRadius: 0,
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div style={{ width: 134, marginLeft: 'auto', backgroundColor: 'white', height: 3, position: 'relative', top: -13, right: -10 }} />
                <MenuItemButton name={'Home'} to={'/'} onClick={this.props.hideMenu} active={NavigationStore.path.get() === '/'} />
                <MenuItemButton name={'Bulletin'} to={'/bulletin'} onClick={this.props.hideMenu} active={NavigationStore.path.get() === '/bulletin'} />
                <MenuItemButton name={'Members'} to={'/members'} onClick={this.props.hideMenu} active={NavigationStore.path.get() === '/members'} />
                <MenuItemButton name={'Gallery'} to={'/gallery'} onClick={this.props.hideMenu} active={NavigationStore.path.get() === '/gallery'} />
                <MenuItemButton name={'Yer A Wizard!'} to={'/yerawizard'} onClick={this.props.hideMenu} active={NavigationStore.path.get() === '/yerawizard'} />
                <MenuItemButton name={'Downloads'} to={'/downloads'} onClick={this.props.hideMenu} active={NavigationStore.path.get() === '/downloads'} />
            </div>
        );
    }
}