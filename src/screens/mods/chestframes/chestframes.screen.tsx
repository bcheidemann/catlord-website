import React from "react";
import { ExternalLink } from "../../../components/externallink/externallink.component";
import { BaseScreen } from "../../base.screen";

export interface ChestFramesScreenProps {
}

export class ChestFramesScreen extends BaseScreen<ChestFramesScreenProps> {

    render() {
        return (
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    padding: 20,
                    paddingLeft: '10%',
                    paddingRight: '10%',
                    alignItems: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                    marginBottom: '10%',
                }}
            >
                <h2>Mods / ChestFrames</h2>
                <p>
                    ChestFrames is a Bukkit mod which aims to address the issue of labeling storage chests/systems.
                </p>
                <p>
                    If you like to label your chests with item frames but find having to click around the item fram to open the chest bothersome, then this mod is for you!
                </p>
                <p>
                    Chest frames makes all item frames placed on container blocks or workbenches "transparent". This means that if you right click on the item frame, it will bring up the inventory for the container/workbench block behind it, instead of rotating the item in the item frame.
                </p>
                <p>
                    Players can interact normally with item frames placed on chests or workbenches by holding the crouch button.
                </p>
                <p>
                    If you wish to download the repo, contribute to the project or raise an issue, the github page can be found <ExternalLink url={'https://github.com/bcheidemann/chestframes'}>here</ExternalLink>. The mod has been tested on and is compatible with Minecraft 1.16.3 - 1.16.5.
                </p>
                <p>
                    If you wish to use the mod on your own server, I will be adding download links to this page soon. In the mean time, feel free to build your own jar by cloning the repo, opening the dev container in VS Code and running the "build" command in the dev container terminal.
                </p>
            </div>
        );
    }
}
