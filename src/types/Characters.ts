import { SoldierGroups } from "./Metadata";

export interface Background {
    name: string;
    powers: Power[];
}

export interface Power {
    name: string;
    activation: number;
    strain: number;
    category: string | string[];
    effect: string;
}

export interface ModifiedPower {
    name: string;
    activation: number;
}

export interface ModifiedGear {
    name: string;
    gearSlots: number;
}
export interface Gear extends ModifiedGear {
    type: string;
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
    background?: string;
    powers?: ModifiedPower[];
    gear?: ModifiedGear[];
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
    type: string;
    stats: Stats;
    cost: number;
    gearSlots: number;
    gear: string[];
    group: SoldierGroups;
    amount: number;
}

export enum CharactersEnum {
    Captain = "Captain",
    FirstMate = "FirstMate",
}

export enum SoldierEnum {
    Burner = "Burner",
    Grenadier = "Grenadier",
    Sniper = "Sniper",
    GuardDog = "Guard Dog",
    Casecracker = "Casecracker",
    Gunner = "Gunner",
    Codebreaker = "Codebreaker",
    Medic = "Medic",
    Pathfinder = "Pathfinder",
    ArmouredTrooper = "Armoured Trooper",
    Recruit = "Recruit",
    Runner = "Runner",
    Commando = "Commando",
    Trooper = "Trooper",
    Hacker = "Hacker",
    Chiseler = "Chiseler",
    Sentry = "Sentry",
}
