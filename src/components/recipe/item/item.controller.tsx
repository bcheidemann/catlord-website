import { observable, runInAction } from "mobx";
import React from "react";
import { ItemProps } from "./item.component";

export class ItemController extends React.Component<ItemProps, {}> {

    protected toolTipX = observable.box(0);
    protected toolTipY = observable.box(0);
    protected showToolTip = observable.box(false);

    protected onMouseMove = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        runInAction(() => {
            this.toolTipX.set(event.clientX);
            this.toolTipY.set(event.clientY);
        });
    }

    protected onMouseOver = () => {
        runInAction(() => {
            this.showToolTip.set(true);
        });
    }

    protected onMouseLeave = () => {
        runInAction(() => {
            this.showToolTip.set(false);
        });
    }
    
}