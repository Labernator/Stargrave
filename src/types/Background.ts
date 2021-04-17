import { Power, Stats } from "./Characters";

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
