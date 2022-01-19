import { store } from ".";
import * as BackgroundList from "./data/Backgrounds.json";
import * as GearItems from "./data/Gear.json";
import * as PowerList from "./data/Powers.json";
import { BackgroundMetadata, Character, CharactersEnum, Gear, ModifiedGear, Power, Soldier, Stats, StatsEnum } from "./types";

const allPowers: Power[] = PowerList.Powers;
const allBackgrounds: BackgroundMetadata[] = BackgroundList.backgrounds;
const allGear: Gear[] = GearItems.general;

export const numberOfCrewMembers = () => {
    const state = store.getState();
    return (state.Soldiers.reduce((acc, soldier) => soldier.amount + acc, 0) || 0) + (state.Captain ? 1 : 0) + (state.FirstMate ? 1 : 0);
};

export const numberOfSoldiers = () => {
    const state = store.getState();
    return state.Soldiers.reduce((acc, soldier) => soldier.amount + acc, 0);
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
export const getPower = (name: string) => allPowers.find((power) => power.name === name) as Power;

export const getPowerInfos = (powerNames: string[]): Power[] => powerNames.map(getPower);

const getBackground = (name: string) => allBackgrounds.find((background) => background.name === name) as BackgroundMetadata;

export const isCorePower = (powerName: string, backgroundName: string) => !!getBackground(backgroundName).corePowers.find((power) => power === powerName);

export const isCaptain = (type: string) => type === CharactersEnum.Captain;

export const isCharacter = (crewMember: Character | Soldier): crewMember is Character => crewMember.type === CharactersEnum.Captain || crewMember.type === CharactersEnum.FirstMate;

export const getNonCorePowers = (backgroundName: string, isCaptainCharacter: boolean) =>
    allPowers.filter((power) => !getBackground(backgroundName).corePowers.includes(power.name)).map((power) => isCaptainCharacter ? { ...power, activation: power.activation + 2 } : { ...power, activation: power.activation + 4 });

export const getStatsMaximums = () => ({ "Move": 7, "Fight": 6, "Shoot": 6, "Will": 8, "Health": 25, "Armour": 14 });

export const getGearDetails = (gearName: string | ModifiedGear) => {
    const foundGear = allGear.find((gear) => (typeof (gearName) === "string" ? gearName : gearName.name) === gear.name) as Gear;
    if (typeof (gearName) !== "string") {
        foundGear.gearSlots = gearName.gearSlots;
    }
    return foundGear;
};

export const getActualNotes = (gearList: Array<string | ModifiedGear>, gearItem: Gear) => {
    let notes = gearItem.notes;
    switch (gearItem.name) {
        case "Flamethrower":
            notes = gearList.find((gear: ModifiedGear | string) => (typeof (gear) === "string" ? gear : gear.name) === "Heavy Armour") || gearList.find((gear: ModifiedGear | string) => (typeof (gear) === "string" ? gear : gear.name) === "Combat Armour") ? "Target Armour and Cover Modifiers" : "Target Armour and Cover Modifiers. -1 Move";
            break;
        case "Rapid Fire":
            notes = gearList.find((gear: ModifiedGear | string) => (typeof (gear) === "string" ? gear : gear.name) === "Heavy Armour") || gearList.find((gear: ModifiedGear | string) => (typeof (gear) === "string" ? gear : gear.name) === "Combat Armour") ? "2 Targets" : "2 Targets. -1 Move";
            break;
        case "Combat Armour":
            notes = "50gc upkeep fee";
    }
    return notes || "";
};

export const getStatsWithGear = (stats: Stats, updateStats: Partial<Stats>, gear: ModifiedGear[] | undefined): Stats => {
    const updatedStatsByGear = gear ? gear.reduce((updatedStatsWithGear, gearItem) => {
        switch (gearItem.name) {
            case "Light Armour": updatedStatsWithGear.Armour = 1; break;
            case "Heavy Armour":
                updatedStatsWithGear.Armour = 2;
                updatedStatsWithGear.Move = -1;
                break;
            case "Combat Armour":
                updatedStatsWithGear.Armour = 4;
                break;
            case "Unarmed":
                updatedStatsWithGear.Fight = -2;
                break;
            case "Flamethrower":
            case "Rapid Fire":
                if (!gear.find((item) => item.name === "Heavy Armour") && !gear.find((item) => item.name === "Combat Armour")) {
                    updatedStatsWithGear.Move = -1;
                }
        }
        return updatedStatsWithGear;
    }, { "Move": 0, "Fight": 0, "Shoot": 0, "Armour": 0, "Will": 0, "Health": 0 }) : { "Move": 0, "Fight": 0, "Shoot": 0, "Armour": 0, "Will": 0, "Health": 0 };

    return Object.keys(stats).reduce(
        (acc, stat) => ({ ...acc, [stat]: (stats[stat as StatsEnum] || 0) + (updateStats[stat as StatsEnum] || 0) + (updatedStatsByGear[stat as StatsEnum] || 0) }),
        { "Move": 0, "Fight": 0, "Shoot": 0, "Armour": 0, "Will": 0, "Health": 0 });
};

export const getDamageModifierString = (weapon: Gear) => {
    if (!weapon.damageModifier) {
        return "+0";
    }
    if (weapon.damageModifier > 0) {
        return `+${weapon.damageModifier}`;
    }

    return `${weapon.damageModifier}`;
};

export const gearSortAlgorithm = (gear: Gear) => {
    let count = 0;
    if (gear.type === "Weapon" || gear.type === "Armour") {
        count += 1;
    }
    if (gear.name.length > 19) {
        count += 0.4;
    }
    if (gear.notes) {
        count += 1;
        if (gear.notes.length > 40) {
            count += 0.5;
        }
    }
    return count;
};
