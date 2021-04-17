import { Stats } from "./Characters";

export enum SoldierGroups {
    Standard = "Standard",
    Specialist = "Specialist",
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
