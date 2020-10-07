import React from "react";
import IMG_GUI_CRAFTING from "../../assets/recipe/gui/GUI_Crafting_Table.png";
import { Item } from "./item/item.component";
import { IconName } from "./types/recipe.types";

const offsets = {
    top: 15,
    left: 15,
}

export interface RecipeProps {
    itemNames: Array<IconName>;
    outputItemName?: IconName;
    outputItemNameOverride?: string;
}

export class Recipe extends React.Component<RecipeProps, {}> {
    render() {
        return (
            <div style={{position: 'relative', height: 136 }}>
                <img src={IMG_GUI_CRAFTING} alt={'not found'} />
                {this.props.itemNames.slice(0, 9).map((itemName, index) => {
                    if (itemName === 'NONE') { return null; }
                    const top = offsets.top + 36 * Math.floor(index / 3);
                    const left = offsets.left + 36 * (index % 3);
                    return (
                        <div key={itemName + index.toString()} style={{ position: 'absolute', top, left, width: 36, height: 34 }}>
                            <Item name={itemName} />
                        </div>
                    );
                })}
                <div style={{ position: 'absolute', top: 51, left: 203, width: 32, height: 32 }}>
                    {this.props.outputItemName &&
                        <Item name={this.props.outputItemName} nameOverride={this.props.outputItemNameOverride} />
                    }
                </div>
            </div>
        );
    }
}