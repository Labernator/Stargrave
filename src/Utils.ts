import { store } from ".";
import * as BackgroundList from "./data/Backgrounds.json";
import * as Critters from "./data/Critters.json";
import * as PowerList from "./data/Powers.json";
import * as ShipUpgrades from "./data/ShipUpgrades.json";
import { isAdvancedTech, isAdvancedWeapon } from "./GearUtils";
import {
    BackgroundEnum, BackgroundMetadata, BackgroundOptions,
    Character, CharactersEnum, Creature, Gear, Information, LevelImprovements,
    LootCategories, ModifiedGear, ModifiedPower, Power,
    ShipUpgrade, Soldier, SpecialGear, Stats, StatsEnum, StatStrings, TradeGoods
} from "./types";

const allPowers: Power[] = PowerList.Powers;
const allBackgrounds: BackgroundMetadata[] = BackgroundList.backgrounds;
const upgrades: ShipUpgrade[] = ShipUpgrades.upgrades;

export const getDrone = () => Critters.creatures.find((crit) => crit.name === "Drone") as Creature;

export const getLootCategory = (loot: SpecialGear) => isAdvancedTech(loot) ? LootCategories.AdvancedTechnology : isAdvancedWeapon(loot) ? LootCategories.AdvancedWeapons : LootCategories.AlienTech;
export const hasEquivalent = (gear: any) => gear.equivalent !== undefined;
export const getBackgroundInfos = (background: BackgroundEnum) => allBackgrounds.find((bg) => bg.name === background) as BackgroundOptions;

export const numberOfCrewMembers = () => {
    const state = store.getState();
    return (state.Soldiers.length + (state.Captain ? 1 : 0) + (state.FirstMate ? 1 : 0));
};

export const getCurrentStatStrings = (stats: Stats, currentHealth?: number): StatStrings => ({
    [StatsEnum.Move]: stats.Move.toString(),
    [StatsEnum.Fight]: `+${stats.Fight.toString()}`,
    [StatsEnum.Shoot]: `+${stats.Shoot.toString()}`,
    [StatsEnum.Armour]: stats.Armour.toString(),
    [StatsEnum.Will]: `+${stats.Will.toString()}`,
    [StatsEnum.Health]: currentHealth ? currentHealth.toString() : stats.Health.toString(),
});

export const getPower = (name: string) => allPowers.find((power) => power.name === name) as Power;

export const getUnselectedPowers = (powerNames: ModifiedPower[]) => allPowers.filter((power) => !powerNames.some((pwr) => pwr.name === power.name));

export const getPowerInfos = (powerNames: string[]): Power[] => powerNames.map(getPower);

const getBackground = (name: string) => allBackgrounds.find((background) => background.name === name) as BackgroundMetadata;

export const isCorePower = (powerName: string, backgroundName: string) => !!getBackground(backgroundName).corePowers.find((power) => power === powerName);

export const isCaptain = (type: string) => type === CharactersEnum.Captain;

export const isCharacter = (crewMember: Character | Soldier): crewMember is Character => crewMember.type === CharactersEnum.Captain || crewMember.type === CharactersEnum.FirstMate;

export const getNonCorePowers = (backgroundName: string, isCaptainCharacter: boolean) =>
    allPowers.filter((power) => !getBackground(backgroundName).corePowers.includes(power.name)).map((power) => isCaptainCharacter ? { ...power, activation: power.activation + 2 } : { ...power, activation: power.activation + 4 });

export const getStatsMaximums = () => ({ "Move": 7, "Fight": 6, "Shoot": 6, "Will": 8, "Health": 25, "Armour": 14 });
export const getShipUpgrades = () => upgrades;

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

export const getAdvancePerLevel = (level: number) => {
    const rest = (level) % 10;
    switch (rest) {
        case 1:
        case 3:
        case 4:
        case 6:
        case 8:
        case 9:
            return LevelImprovements.LowerActivation;
        case 2:
        case 7:
            return LevelImprovements.ImproveStat;
        case 5:
            return LevelImprovements.NewPower;
        case 0:
            return LevelImprovements.NewPowerOrImproveStat;
        default:
    }
};

export const getBaseCaptain = (): Character => ({
    name: "",
    stats: {
        "Move": 6,
        "Fight": 3,
        "Shoot": 2,
        "Armour": 9,
        "Will": 3,
        "Health": 16,
    },
    level: 15,
    gearSlots: 6,
    type: CharactersEnum.Captain,
    powers: [],
    gear: [],
});

export const getBaseFirstMate = (): Character => ({
    name: "",
    stats: {
        "Move": 6,
        "Fight": 2,
        "Shoot": 2,
        "Armour": 9,
        "Will": 2,
        "Health": 14,
    },
    level: 0,
    gearSlots: 5,
    type: CharactersEnum.FirstMate,
    powers: [],
    gear: [],
});

export const getTradeGoodsValue = (name: string) => {
    const state = store.getState();
    const multiplier: number = state.ShipUpgrades.find((upgrade) => upgrade === "External Cargo Pods") ? 1.2 : 1;
    switch (name) {
        case TradeGoods.TradeGoods75: return multiplier * 75;
        case TradeGoods.TradeGoods150: return multiplier * 150;
        case TradeGoods.TradeGoods200: return multiplier * 200;
        case TradeGoods.TradeGoods250: return multiplier * 250;
        case TradeGoods.TradeGoods300: return multiplier * 300;
        case TradeGoods.TradeGoods400: return multiplier * 400;
        default: return 0;
    }
};

export const getInformationValue = (name: string) => {
    switch (name) {
        case Information.Information75: return 75;
        case Information.Information150: return 150;
        case Information.Information200: return 200;
        case Information.Information125: return 125;
        case Information.Information100: return 100;
        default: return 0;
    }
};

export const getUpgradeByName = (name: string) => upgrades.find((u) => u.name === name) as ShipUpgrade;
