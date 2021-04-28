import { Character } from "../types/Characters";
import { CrewState, InitialCrewState } from "../types/State";
import * as ReduxActions from "./actions";

// tslint:disable-next-line: cyclomatic-complexity
export function stateReducer(state: CrewState = InitialCrewState, action: ReduxActions.Actions): CrewState {
    switch (action.type) {
        case ReduxActions.SET_CREW:
            return action.payload;
        case ReduxActions.SET_CREWNAME:
            return { ...state, Title: action.payload };
        case ReduxActions.SET_CAPTAINS_NAME:
            return { ...state, Captain: { ...state.Captain as Character, name: action.payload } };
        case ReduxActions.SET_CAPTAIN:
            return { ...state, Captain: action.payload };
        case ReduxActions.SET_FIRST_MATE:
            return { ...state, FirstMate: action.payload };
        case ReduxActions.ADD_SOLDIERS:
            const soldiers = state.Soldiers ? [...state.Soldiers, ...action.payload] : action.payload;
            return { ...state, Soldiers: soldiers, Credits: state.Credits - action.payload.reduce((acc, soldier) => acc + (soldier.amount * soldier.cost), 0) };
        default:
            return state;
    }
}
