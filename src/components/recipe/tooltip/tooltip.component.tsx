import React from "react";
import { ToolTipController } from "./tooltip.controller";
import IMG_LEFT from "../../../assets/recipe/gui/ItemHoverLeft.png";
import IMG_RIGHT from "../../../assets/recipe/gui/ItemHoverRight.png";
import IMG_MIDDLE from "../../../assets/recipe/gui/ItemHover.png"
import { observer } from "mobx-react";

export interface ToolTipProps {
    text: string;
    x: number;
    y: number;
}

@observer export class ToolTip extends ToolTipController {
    render() {
        return (
            <div style={{ position: 'fixed', left: this.props.x + 6, top: this.props.y - 38, zIndex: 9999, pointerEvents: 'none' }}>
                <div style={{ display: 'inline-flex' }}>
                    <div style={{ height: 32 }}>
                        <img src={IMG_LEFT} alt={'not found'} />
                    </div>
                    <div style={{ height: 32, color: 'white', padding: 6, backgroundImage: `url(${IMG_MIDDLE})`, backgroundRepeat: 'repeat-x' }}>
                        {this.props.text}
                    </div>
                    <div style={{ height: 32 }}>
                        <img src={IMG_RIGHT} alt={'not found'} />
                    </div>
                </div>
            </div>
        );
    }
}