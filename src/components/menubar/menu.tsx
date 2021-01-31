import { IMenu } from "../menu/menu.list.component";

export const modsMenu: IMenu = [
    {
        key: 'Yer A Wizard',
        name: 'Yer A Wizard',
        route: '/yerawizard',
    },
    {
        key: 'Cat Crafting',
        name: 'Cat Crafting',
        route: '/catcrafting',
    },
    {
        key: 'Chest Frames',
        name: 'Chest Frames',
        route: '/chestframes',
    },
]

export const menu: IMenu = [
    {
        key: 'Home',
        name: 'Home',
        route: '/',
    },
    {
        key: 'Bulletin',
        name: 'Bulletin',
        route: '/bulletin',
    },
    {
        key: 'Members',
        name: 'Members',
        route: '/members',
    },
    {
        key: 'Gallery',
        name: 'Gallery',
        route: '/gallery',
    },
    {
        key: 'Mods',
        name: 'Mods',
        subRoute: '/mods',
        subMenu: modsMenu,
    },
    {
        key: 'Downloads',
        name: 'Downloads',
        route: '/downloads',
    },
];