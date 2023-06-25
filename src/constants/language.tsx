import { Languages } from "../types/SettingsTypes";

export interface Language {
    id: number;
    title: string;
    value: Languages;
    flag: string
}
export const languagesList: Language[] = [
    {
        id: 1,
        title: 'English',
        value: Languages.English,
        flag: '🇺🇸'
    },
    {
        id: 3,
        title: 'French',
        value: Languages.French,
        flag: '🇫🇷'
    },
    {
        id: 5,
        title: 'Japanese',
        value: Languages.Japanese,
        flag: '🇯🇵'
    },
    // {
    //     id: 2,
    //     title: 'Spanish',
    //     value: 'es',
    //     flag: '🇪🇸'
    // },
    // {
    //     id: 4,
    //     title: 'German',
    //     value: 'de',
    //     flag: '🇩🇪'
    // },
];