import React from "react";
import { Recipe } from "../../components/recipe/recipe.component";

export interface YerAWizardScreenProps {
}

export class YerAWizardScreen extends React.Component<YerAWizardScreenProps, {}> {
    render() {
        return (
            <div style={{ flex: 1, backgroundColor: 'blue' }}>
                <Recipe
                    outputItemName={'stick'}
                    outputItemNameOverride={'Wand'}
                    itemNames={['experience_bottle', 'end_crystal', 'experience_bottle',
                        'experience_bottle', 'stick', 'experience_bottle',
                        'experience_bottle', 'block_of_netherite', 'experience_bottle']}
                />
            </div>
        );
    }
}
