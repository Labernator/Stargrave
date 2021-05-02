import { store } from ".";
import * as BackgroundList from "./data/Backgrounds.json";
import * as GearItems from "./data/Gear.json";
import * as PowerList from "./data/Powers.json";
import { BackgroundMetadata } from "./types/Background";
import { CharactersEnum, Gear, Power, Stats, StatsEnum } from "./types/Characters";

const allPowers: Power[] = PowerList.Powers;
const allBackgrounds: BackgroundMetadata[] = BackgroundList.backgrounds;
const allGear: Gear[] = GearItems.general;

export const numberOfCrewMembers = () => {
    const state = store.getState();
    return (state.Soldiers.reduce((acc, soldier) => soldier.amount + acc, 0) || 0) + (state.Captain ? 1 : 0) + (state.FirstMate ? 1 : 0);
};

export const numberOfSoldiers = () => {
    const state = store.getState();
    return state.Soldiers?.length || 0;
};

export const getStatStrings = (stats: Stats | Partial<Stats>) => Object.keys(stats).map((stat) => {
    switch (stat) {
        case "Fight":
        case "Shoot":
        case "Will":
            return { [stat]: stats[stat] as number < 0 ? `${stats[stat]}` : `+${stats[stat]}` };
        default:
            return { [stat]: `${stats[stat as StatsEnum]}` };
    }
});
const getPower = (name: string) => allPowers.find((power) => power.name === name) as Power;

export const getPowerInfos = (powerNames: string[]): Power[] => powerNames.map(getPower);

const getBackground = (name: string) => allBackgrounds.find((background) => background.name === name) as BackgroundMetadata;

export const isCorePower = (powerName: string, backgroundName: string) => !!getBackground(backgroundName).corePowers.find((power) => power === powerName);

export const isCaptain = (type: string) => type === CharactersEnum.Captain;

export const getNonCorePowers = (backgroundName: string) => allPowers.filter((power) => !getBackground(backgroundName).corePowers.includes(power.name));

export const getStatsMaximums = () => ({ "Move": 7, "Fight": 6, "Shoot": 6, "Will": 8, "Health": 25, "Armour": 14 });

export const getGearDetails = (gearName: string) => allGear.find((gear) => gear.name === gearName) as Gear;
