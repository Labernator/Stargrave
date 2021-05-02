import { SoldierGroups } from "./Metadata";

export interface Background {
    name: string;
    powers: Power[];
}

export interface Power {
    name: string;
    activationValue: number;
    strain: number;
    category: string | string[];
    effect: string;
}

export interface Gear {
    name: string;
    type: string;
    gearSlots: number;
    notes?: string;
    damageModifier?: number;
    maxRange?: string | number;
    armourModifier?: number;
}

export interface Character {
    name: string;
    stats: Stats;
    level: number;
    gearSlots: number;
    type: string;
    background?: Background;
    gear?: string[];
}

export enum StatsEnum {
    Move = "Move",
    Fight = "Fight",
    Shoot = "Shoot",
    Armour = "Armour",
    Will = "Will",
    Health = "Health",
}

export type Stats = { [key in StatsEnum]: number; };

export interface Soldier {
    // name: string;
    type: string;
    stats: Stats;
    cost: number;
    gearSlots: number;
    gear: string[];
    id: number;
    group: SoldierGroups;
    amount: number;
}

export enum CharactersEnum {
    Captain = "Captain",
    FirstMate = "FirstMate",
}
