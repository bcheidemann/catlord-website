import { IconName } from "../types/recipe.types";

function capitalize(input: string) {  
    var words = input.split(' ');  
    var CapitalizedWords: Array<string> = [];  
    words.forEach(element => {  
        CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));  
    });  
    return CapitalizedWords.join(' ');  
}

function removeDigits(input: string) {
    return input.replace(/[0-9]/g, '');
}

export function parseIconName(name: IconName) {
    return removeDigits(capitalize(name.replaceAll('_', ' ')));
}