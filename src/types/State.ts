// import * as Characters from "../data/Characters.json";
import { Character, Soldier } from "./Characters";

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
