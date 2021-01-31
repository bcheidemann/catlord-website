import { reaction } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Icon } from "semantic-ui-react";
import { MenuItemButton } from "./menu.item.button.component";
import { MenuItem } from "./menu.item.component";

export type IMenu = Array<IMenuItem>;

export type IMenuState = Array<IMenuItem>;

export interface IMenuItem {
    key: string,
    name: string,
    route?: string,
    subRoute?: string,
    subMenu?: IMenu,
}

export interface MenuListProps {
    show: any;
    menu: IMenu;
    menuState: IMenuState;
    onSelectMenuItem: (menuItem: IMenuItem) => void;
    descendMenu: (menuItem: IMenuItem) => void;
    ascendMenu: () => void;
}

@observer export class MenuList extends React.Component<MenuListProps, {}> {

    private menuListRef = React.createRef<HTMLDivElement>();
    private internalAnimationDiv = React.createRef<HTMLDivElement>();

    private reactShowHide = reaction(
        () => this.props.show.get(),
        () => {
            const menuList = this.menuListRef.current;
            if (menuList) {
                menuList.classList[this.props.show.get() ? 'add' : 'remove']('show');
                setTimeout(() => {
                    menuList.classList[this.props.show.get() ? 'remove' : 'add']('displace');
                }, this.props.show.get() ? 0 : 200)
            }
            if (this.props.show.get()) {
                this.menuTransition();
            }

        }
    );

    public componentWillUnmount() {
        this.reactShowHide();
    }

    private get getActiveMenu(): IMenu {

        let activeMenu = this.props.menu;

        for (const stateMenuItem of this.props.menuState) {
            activeMenu = activeMenu.find(menuItem => menuItem.key === stateMenuItem.key)?.subMenu || [];
        }

        return activeMenu;
    }

    private onMenuItemPressed = (menuItem: IMenuItem) => {
        if (menuItem.subMenu) {
            this.props.descendMenu(menuItem);
            this.menuTransition();

        }
        else {
            this.props.onSelectMenuItem(menuItem);
        }
    }

    private menuTransition = () => {
        const menuList = this.menuListRef.current;
        if (menuList) {
            menuList.classList.add('menunext');
            setTimeout(() => {
                menuList.classList.remove('menunext');
            }, 200);
        }

        const animationDiv = this.internalAnimationDiv.current;
        if (animationDiv) {
            animationDiv.classList.add('menunextinternal');
            setTimeout(() => {
                animationDiv.classList.remove('menunextinternal');
            }, 200);
        }
    }

    private ascendMenu = () => {
        this.props.ascendMenu();
        this.menuTransition();
    }

    public render() {
        return (
            <div
                className={'hide displace'}
                ref={this.menuListRef}
                style={{
                    position: 'relative',
                    backgroundColor: 'white',
                    borderWidth: 3,
                    // borderLeftWidth: 5,
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
                <div ref={this.internalAnimationDiv}>
                    {this.props.menuState.length > 0 &&
                        <MenuItem
                            onPress={this.ascendMenu}
                        >
                            <b>
                                {this.props.menuState[this.props.menuState.length - 1].name}
                            </b>
                            <b>
                                <Icon name='angle double left' />
                            </b>
                        </MenuItem>
                    }
                    {this.getActiveMenu.map((menuItem) => {

                        return (
                            <MenuItemButton
                                key={menuItem.key}
                                menuItem={menuItem}
                                menuState={this.props.menuState}
                                onPress={this.onMenuItemPressed}
                            />
                        )

                    })}
                </div>
            </div>
        );
    }
}