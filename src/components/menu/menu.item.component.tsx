import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import React from "react";

export interface MenuItemButtonProps {
    onPress?: () => void;
    active?: boolean;
}

@observer export class MenuItem extends React.Component<MenuItemButtonProps, {}> {

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

    private onClick = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }

    public render() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    backgroundColor: this.props.active ? '#333' : this.mouseOver.get() ? 'lightgray' : undefined,
                    borderRadius: 5,
                    padding: 5,
                    color: this.props.active ? 'white' : this.mouseOver.get() ? 'black' : 'gray',
                    cursor: 'pointer',
                    zIndex: 99999,
                }}
                onMouseEnter={this.setMouseOver}
                onMouseLeave={this.setMouseNotOver}
                onClick={this.onClick}
            >
                {this.props.children}
            </div>
        )
    }
}
