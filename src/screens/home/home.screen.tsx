import React from "react";
import { Link } from "react-router-dom";
import { BaseScreen } from "../base.screen";

export interface HomeScreenProps {
}

export class HomeScreen extends BaseScreen<HomeScreenProps, {}> {

    render() {
        return (
            <div style={{ flex: 1, display: 'flex', padding: 20, paddingLeft: '10%', paddingRight: '10%', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
                <h2>Welcome to CatLord MC</h2>
                <p>
                    CatLord MC is a (mostly) vanilla minecraft server with an emphasis on community and trade. We have players with a wide variety of skills and interests who regularly come together to collaborate on amazing projects. We take pride in ensuring that our server is a safe haven from griefers and thiefs - though we very much encourage tasteful pranking!
                </p>
                <p>
                    New players looking to join the server should contact one of our admins at ben@heidemann.co.uk or bernhard@heidemann.co.uk.
                </p>
                <h2>World Info</h2>
                <p>
                    The seed of the current CatLord world is 308809959. This seed has a large mooshroom island located at X=-10000 Z=10000. In order to allow construction of shops without fear of mob damage, we elected to set the world spawn to this location.
                </p>
                <p>
                    Our world is periodically reset when we feel that we have played out the current world, however, backups are made and are available to download for nostalgias sake. There are currently no plans to reset the world in the near future, though it is likely there will be a hard reset when Mojang releases minecraft 1.17.
                </p>
                <h2>Rules and Info</h2>
                <ol style={{ textAlign: 'left' }}>
                    <li>
                        <p>
                            <b>The Town.</b> The area designated for our town is divided into chunks.
                        </p>
                        <ul>
                            <li>A suitable area will be reserved for the building of the town hall.</li>
                            <li>The remaining land in the town area will be sold and will have to be paid for by named diamonds. Diamonds must be named with the plot reference and the name of the player, e.g. Plot A4, rohedin4.</li>
                            <li>The value of land is 1 block of diamonds per chunk. The diamonds must be deposited in one of the two barrels at the city gates.</li>
                        </ul>
                    </li>
                    <li>
                        <p style={{ paddingTop: 14 }}>
                            <b>The Mayor.</b> There shall be a mayor in our world who will be elected by the community and serve a fixed term of three months. Each player is allowed to stand for mayor and there is no limit on the number of times an individual player can be re-elected.
                        </p>
                        <ul>
                            <li>The mayor has the right to blacklist other players in case they disrupt the community. Blacklisting may be temporary or permanent.</li>
                            <li>The mayor shall administer the town funds.</li>
                            <li>The mayor supervises the initial sale of land in the town area.</li>
                        </ul>
                    </li>
                    <li>
                        <p style={{ paddingTop: 14 }}>
                            <b>Commerce.</b>
                        </p>
                        <ul>
                            <li>Shops will be restricted to the town area or a commercial area at a later stage in the game.</li>
                            <li>If a player sells a plot of land in the town area they are required to give 10% of the town. This should be deposited in named diamonds as for the initial purchase.</li>
                        </ul>


                    </li>
                    <li>
                        <p style={{ paddingTop: 14 }}>
                            <b>Communal Builds.</b>
                        </p>
                        <ul>
                            <li>Any communal builds in the town area and other areas in the world may be financed from the town funds. Materials supplied for the build should be paid at market value minus a percentage for community builds. Equally services provided by players should be remunerated at market rates, e.g. advertising, decorating or building. The mayor shall determine the market rates at the time.</li>
                        </ul>

                    </li>
                </ol>
                <h2>Datapacks</h2>
                <ul style={{ textAlign: 'left' }}>
                    <li>
                        <p style={{ paddingTop: 14 }}>
                            <b>Balanced Diet.</b> With this datapack the value of a particular food decreases with each time it is consumed. If the player eats a different food the value of the other food will increase again. Food which has not been eaten before by the player has a very significant effect.
                        </p>
                    </li>
                    <li>
                        <p style={{ paddingTop: 14 }}>
                            <b>Vein Mining.</b> Taking out some of the tedium of mining, this datapack means that if you mine an ore block all blocks of the same ore in the same vein (i.e. directly connected but not diagonally) will drop at the same time. Your pickaxe will wear just as much as if you had mined each block separately and any enchantment on your pickaxe will effect each of the blocks.
                        </p>
                    </li>
                    <li>
                        <p style={{ paddingTop: 14 }}>
                            <b>Anvil Mending.</b> Each time an anvil is used to repair a tool the cost of this increases. With this datapack the cost of repairs remains the same. This datapack is probably more sensible during the earlier stage of the game and may be removed at a later stage.
                        </p>
                    </li>
                    <li>
                        <p style={{ paddingTop: 14 }}>
                            <b>Sleep.</b> This datapack alters the behaviour of vanilla Minecraft so that only one of the players present on the server has to sleep in order for night to move forward. Top tip, carry a bed.
                        </p>
                    </li>
                </ul>
                <h2>Mods</h2>
                <p>
                    We play with the 'Yer A Wizard' mod enabled. This mod was developed by our admins specifically for this server to bring magic to our world. The mod is intended to introduce useful and interesting new mechanics without being overpowered or unballancing the game. For more details go to <Link to={'/yerawizard'}>this</Link> page.
                </p>
                <p>
                    <i>NOTE: the YerAWizard mod is currently in pre-alpha and is subject to change significantly. What you see on the details page is planned content and may not reflect the current implementation of the mod.</i>
                </p>
            </div>
        );
    }
}
