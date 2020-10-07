import { observer } from "mobx-react";
import React from "react";
import { parseIconName } from "../helpers/name.helper";
import { ToolTip } from "../tooltip/tooltip.component";
import { ItemProps } from "../types/item.props";
import { IconName } from "../types/recipe.types";
import { ItemController } from "./item.controller";

export interface ItemProps {
    name: IconName;
    nameOverride?: string;
}

@observer export class Item extends ItemController {

    render() {
        return (
            <div
                style={{ padding: 1 }}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseLeave}
                onMouseMove={this.onMouseMove}
            >
                <div style={{ position: 'absolute', width: 32, height: 32, backgroundColor: 'white', opacity: this.showToolTip.get() ? 0.4 : 0 }} />
                <img
                    src={require(`../../../assets/recipe/icons/${this.props.name}.png`)}
                    alt={'not found'}
                    width={32}
                    height={32}
                    style={{ imageRendering: ItemProps.get(this.props.name)?.imageRendering }}
                />
                {this.showToolTip.get() &&
                    <ToolTip
                        text={this.props.nameOverride || ItemProps.get(this.props.name)?.overrideName || parseIconName(this.props.name)}
                        x={this.toolTipX.get()}
                        y={this.toolTipY.get()}
                    />
                }
            </div>
        );
    }
}