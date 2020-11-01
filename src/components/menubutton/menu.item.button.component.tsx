import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import { NavigationStore } from "../../stores/navigation/navigation.store";

export interface MenuItemButtonProps {
    onClick?: () => void;
    active?: boolean;
    name: string;
    to: string;
}

@observer export class MenuItemButton extends React.Component<MenuItemButtonProps, {}> {

    private mouseOver = observable.box(false);

    private setMouseOver = () => {
        runInAction(() => {
            this.mouseOver.set(true);
        });
    }

    private setMouseNotOver = () => {
        runInAction(() => {
            this.mouseOver.set(false);
        });
    }

    render() {
        const atTargetRoute = NavigationStore.path.get() === this.props.to;
        return (
            <Link to={this.props.to} onClick={this.props.onClick}>
                <div
                    style={{
                        width: '100%',
                        backgroundColor: atTargetRoute ? '#333' : this.mouseOver.get() ? 'lightgray' : undefined,
                        borderRadius: 5,
                        padding: 5,
                        color: atTargetRoute ? 'white' : this.mouseOver.get() ? 'black' : 'gray',
                        zIndex: 99999,
                    }}
                    onMouseEnter={this.setMouseOver}
                    onMouseLeave={this.setMouseNotOver}
                >
                    {this.props.name}
                </div>
            </Link>
        );
    }
}
