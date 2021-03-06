import React from "react";
import { Recipe } from "../../../components/recipe/recipe.component";
import { RecipePreview } from "../../../components/recipepreview/recipe.preview.component";
import { BaseScreen } from "../../base.screen";
import { ExternalLink } from "../../../components/externallink/externallink.component";
import { Note } from "../../../components/note/note.component";

export interface YerAWizardScreenProps {
}

export class YerAWizardScreen extends BaseScreen<YerAWizardScreenProps, {}> {

    render() {
        return (
            <div style={{ flex: 1, display: 'flex', padding: 20, alignItems: 'center', flexDirection: 'column' }}>
                <div
                    style={{
                        flex: 1,
                        paddingLeft: 50,
                        paddingRight: 50,
                        paddingBottom: 50,
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <h2>Mods / YerAWizard</h2>
                    <p>
                        The Harry Potter inspired YerAWizard mod brings magic to the world of minecraft. The mod is built on the Bukkit API and adds new items, including wands and spellbooks, to the game. In order to begin practicing magic, simply craft one of the many available spell books and a wand. Hold the spell book in your off hand and your wand in your main hand, then left click to cast a spell. Successfully casting a spell will use up one spellbook.
                    </p>
                    <p>
                        YerAWizard does not require any client mods and is available for Minecraft 1.16+. You can download the repo, report issues or contribute to the project <ExternalLink url={'https://github.com/bcheidemann/yerawizard'}>here</ExternalLink>. As soon as a stable version is available I will provide a download link to the jar on this page.
                    </p>
                    <Note>
                        <p>
                            <i>NOTE: the YerAWizard mod is currently in pre-alpha and is subject to change significantly. What you see here is planned content and may not reflect the current implementation of the mod.</i>
                        </p>
                    </Note>
                </div>
                <RecipePreview
                    title='Wand'
                    description="So yer a wizard? Well you'll need an instrument to channel your magic. Unfortunately, Mr Olivander is out of town so you'll have to craft your own wand. Simply follow the recipe to the right and take your first step towards learning magic!"
                >
                    <Recipe
                        outputItemName={'stick'}
                        outputItemNameOverride={'Wand'}
                        itemNames={['experience_bottle', 'end_crystal', 'experience_bottle',
                            'experience_bottle', 'stick', 'experience_bottle',
                            'experience_bottle', 'block_of_netherite', 'experience_bottle']}
                    />
                </RecipePreview>
                <div style={{ height: 20 }} />
                <RecipePreview
                    title='Lumos Spellbook'
                    description="COVID-19, Trump 2020, night time... If things are getting a bit dark for your liking, simply cast lumos to restore the light! Disclaimer, lumos does not work on COVID-19 or Trump."
                >
                    <Recipe
                        outputItemName={'book'}
                        outputItemNameOverride={'Lumos Spellbook'}
                        itemNames={['glowstone_dust', 'clock', 'glowstone_dust',
                            'NONE', 'book', 'NONE',
                            'NONE', 'experience_bottle', 'NONE']}
                    />
                </RecipePreview>
                <div style={{ height: 20 }} />
                <RecipePreview
                    title='Evanesco Spellbook'
                    description="Need something to vanish? Evanesco will make any block disappear with just a swish of your wand. Yes, even bedrock!"
                >
                    <Recipe
                        outputItemName={'book'}
                        outputItemNameOverride={'Evanesco Spellbook'}
                        itemNames={['dragon_breath', 'end_crystal', 'dragon_breath',
                            'NONE', 'book', 'NONE',
                            'NONE', 'experience_bottle', 'NONE']}
                    />
                </RecipePreview>
                <div style={{ height: 20 }} />
                <RecipePreview
                    title='Recedo Spellbook'
                    description="Want to make something invisible? Cast recedo on item frames, armour stands or entities to make them invisible!"
                >
                    <Recipe
                        outputItemName={'book'}
                        outputItemNameOverride={'Recedo Spellbook'}
                        itemNames={['blaze_powder', 'glass', 'blaze_powder',
                            'NONE', 'book', 'NONE',
                            'NONE', 'experience_bottle', 'NONE']}
                    />
                </RecipePreview>
                <div style={{ height: 20 }} />
                <RecipePreview
                    title='Obliviate Spellbook'
                    description="Done something embarrasing you need people to forget? Maybe someone found diorite in your valuables box. Or maybe you pressed Q while holding a brand new pickaxe in the nether. Or, more likely, you traded with a villager and need him to forget so that he refreshes his trades. Whatever it is, the obliviate spell will make them forget!"
                >
                    <Recipe
                        outputItemName={'book'}
                        outputItemNameOverride={'Obliviate Spellbook'}
                        itemNames={['ghast_tear', 'ender_eye', 'ghast_tear',
                            'NONE', 'book', 'NONE',
                            'NONE', 'experience_bottle', 'NONE']}
                    />
                </RecipePreview>
                <div style={{ height: 20 }} />
                <RecipePreview
                    title='Evaporo Spellbook'
                    description="This powerful spell allows the user to phase through blocks for a short period of time. But be careful! You don't want to find yourself inside blocks when the spell wears off!"
                >
                    <Recipe
                        outputItemName={'book'}
                        outputItemNameOverride={'Evaporo Spellbook'}
                        itemNames={['chorus_fruit', 'rabbit_foot', 'chorus_fruit',
                            'NONE', 'book', 'NONE',
                            'NONE', 'experience_bottle', 'NONE']}
                    />
                </RecipePreview>
                <div style={{ height: 20 }} />
                <RecipePreview
                    title='Saccus Dorsualis'
                    description="This nifty spell grants you access to your ender chest with a flick of your wand. This can be very handy for quick access to belongings while on the move or if you don't carry a silk touch pickaxe."
                >
                    <Recipe
                        outputItemName={'book'}
                        outputItemNameOverride={'Saccus Dorsualis Spellbook'}
                        itemNames={['obsidian', 'ender_eye', 'obsidian',
                            'NONE', 'book', 'NONE',
                            'NONE', 'experience_bottle', 'NONE']}
                    />
                </RecipePreview>
            </div>
        );
    }
}
