import { runInAction } from "mobx";
import React from "react";
import { NavigationStore } from "../../stores/navigation/navigation.store";
import { MenuButton } from "../menubutton/menu.button.component";

export interface MenuBarProps {
    location: { pathname: string };
    // title: string;
    subTitle?: string;
}

export class MenuBar extends React.Component<MenuBarProps, {}> {

    private title = 'CatLord MC';

    public menubar!: HTMLElement | null;

    public moveHeader = () => {
        if (this.menubar) {
            this.menubar.style.top = `${document.documentElement.scrollTop}px`;
        }
    }

    componentDidMount() {
        runInAction(() => {
            NavigationStore.path.set(this.props.location.pathname);
        });
        this.menubar = document.getElementById('MENU_BAR');
        document.addEventListener('scroll', this.moveHeader);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.moveHeader);
    }

    componentDidUpdate() {
        runInAction(() => {
            NavigationStore.path.set(this.props.location.pathname);
        });
    }

    render() {
        return (
            <div id={'MENU_BAR'} style={{ backgroundColor: 'black', width: '100vw', position: 'absolute', top: document.documentElement.scrollTop }}>
                <div style={{ position: 'relative', top: 0, width: '100%', height: 70, backgroundColor: '#222', borderWidth: 3, borderColor: 'black', borderBottomStyle: 'solid' }}>
                    <div style={{ position: 'absolute', width: '100%', display: 'flex', height: 70, alignItems: 'center', top: 5, paddingLeft: 15 }}>
                        <h1 style={{ color: 'black' }}>
                            {this.title}
                        </h1>
                    </div>
                    <div style={{ position: 'absolute', width: '100%', display: 'flex', height: 70, alignItems: 'center', top: 0, paddingLeft: 10 }}>
                        <h1 style={{ color: 'white' }}>
                            {this.title}
                        </h1>
                    </div>
                </div>
                <div style={{ position: 'absolute', right: 5, top: 10 }}>
                    <MenuButton />
                </div>
            </div>
        );
    }
}