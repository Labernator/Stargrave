import { Character, CrewState, Soldier } from "../types";

export const ADD_SOLDIERS = "ADD_SOLDIERS";
export const SET_CAPTAINS_NAME = "SET_CAPTAINS_NAME";
export const SET_FIRST_MATE = "SET_FIRST_MATE";
export const SET_CAPTAIN = "SET_CAPTAIN";
export const SET_CREW = "SET_CREW";
export const SET_SHIPNAME = "SET_SHIPNAME";

interface SetCrew {
    type: typeof SET_CREW;
    payload: CrewState;
}

interface SetCrewName {
    type: typeof SET_SHIPNAME;
    payload: string;
}

interface SetCaptainsName {
    type: typeof SET_CAPTAINS_NAME;
    payload: string;
}

interface SetCaptain {
    type: typeof SET_CAPTAIN;
    payload: Character;
}

interface SetFirstMate {
    type: typeof SET_FIRST_MATE;
    payload: Character;
}

interface AddSoldiers {
    type: typeof ADD_SOLDIERS;
    payload: Soldier[];
}
export type Actions = SetCrew | SetCrewName | SetCaptainsName | SetCaptain | SetFirstMate | AddSoldiers;
