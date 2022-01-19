export enum BackgroundEnum {
    Biomorph = "Biomorph",
    Cyborg = "Cyborg",
    Mystic = "Mystic",
    Psionicist = "Psionicist",
    RoboticsExpert = "RoboticsExpert",
    Rogue = "Rogue",
    Tekker = "Tekker",
    Veteran = "Veteran",
}

export enum PowerCategory {
    LineOfSight = "Line of Sight",
    Touch = "Touch",
    SelfOnly = "Self-only",
    OutOfGameA = "Out of Game (A)",
    OutOfGameB = "Out of Game (B)",
}
export enum StatsEnum {
    Move = "Move",
    Fight = "Fight",
    Shoot = "Shoot",
    Armour = "Armour",
    Will = "Will",
    Health = "Health",
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

export enum SoldierGroups {
    Standard = "Standard",
    Specialist = "Specialist",
}
export interface Background {
    name: string;
    powers: Power[];
}

export type Stats = { [key in StatsEnum]: number; };
export interface BackgroundMetadata {
    name: string;
    statModifications: {
        mandatory: Partial<Stats>;
        optional: Partial<Stats>;
        chooseOptionals: number;
    };
    corePowers: string[];
    description: string;
}

export interface BackgroundModifications {
    name: BackgroundEnum;
    statModifications: StatsImprovements;
    powers: Power[];
}

export interface BackgroundOptions {
    name: BackgroundEnum;
    statModifications: {
        mandatory: Partial<Stats>;
        optional: Partial<Stats>;
        chooseOptionals: number;
    };
    corePowers: string[];
    description: string;
}

export interface StatsImprovements {
    mandatory: Partial<Stats>;
    optional: Partial<Stats>;
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

export interface Soldier {
    type: string;
    stats: Stats;
    cost: number;
    gearSlots: number;
    gear: string[];
    group: SoldierGroups;
    amount: number;
}

export interface SoldierMetadata {
    type: string;
    cost: number;
    stats: Stats;
    gear: string[];
    group: SoldierGroups;
}

export interface CharacterMetadata {
    stats: Stats;
    level: number;
    gearSlots: number;
    type: string;
}

export interface CrewState {
    Credits: number;
    Captain?: Character;
    FirstMate?: Character;
    Soldiers: Soldier[];
    ShipName: string;
    Experience: number;
}

export const InitialCrewState: CrewState = {
    Credits: 400,
    Soldiers: [],
    ShipName: "",
    Experience: 0,
};
