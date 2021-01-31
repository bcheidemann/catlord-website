import React from "react";
import { ExternalLink } from "../../../components/externallink/externallink.component";
import { Note } from "../../../components/note/note.component";
import { BaseScreen } from "../../base.screen";

export interface CatCraftingScreenProps {
}

export class CatCraftingScreen extends BaseScreen<CatCraftingScreenProps, {}> {

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
                <h2>Mods / CatCrafting</h2>
                <p>
                    CatCrafting is a Bukkit mod which adds auto-crafting functionality to minecraft. 
                </p>
                <p>
                    To start auto-crafting, simply place a dispenser facing into a crafting bench and fill it's inventory with the items of your desired recipe - e.g. to craft iron ingots, fill the dispenser with a 9x9 grid of iron nuggets. Power the dispenser as you would normally every time you wish to craft an item.
                </p>
                <p>
                    Note that dispensers facing into a chest will prioritise filling up empty slots before stacking items. This means if a hopper adds 9 iron nuggets into a crafting dispenser, these will be arranged in a 9x9 grid, instead of a signle stack of 9 nuggets as would normally be the case. This does not affect ordinary dispensers (i.e. ones not facing into a crafting bench).
                </p>
                <p>
                    If you wish to download the repo, contribute to the project or raise an issue, the github page can be found <ExternalLink url={'https://github.com/bcheidemann/CatCrafting'}>here</ExternalLink>. The mod has been tested on and is compatible with Minecraft 1.16.3 - 1.16.5.
                </p>
                <p>
                    If you wish to use the mod on your own server, I will be adding download links to this page soon. In the mean time, feel free to build your own jar by cloning the repo, opening the dev container in VS Code and running the "build" command in the dev container terminal.
                </p>
                <Note>
                    <p>
                        <i>
                            Note: CatCrafting monitors block physics events to detect when a dispenser is powered before an item is dispensed. Block physics events are triggered A LOT and enabling this mod may impact server performance. While running local stress tests I was able to increase my test servers MSPT by 15-20 ms. In practice, running the mod on the CatLord server has not had a noticeable effect on gameplay though this may differ on other servers depending on the available resources and number of concurrent users.
                        </i>
                    </p>
                </Note>
            </div>
        );
    }
}
