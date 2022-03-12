import { CrewState, InitialCrewState } from "../types";
import * as ReduxActions from "./actions";

// tslint:disable-next-line: cyclomatic-complexity
export function stateReducer(state: CrewState = InitialCrewState, action: ReduxActions.Actions): CrewState {
    const xpRecords = state.ExperienceRecords;
    switch (action.type) {
        case ReduxActions.ADD_XP:
            return { ...state, Experience: state.Experience + action.payload, ExperienceRecords: [...xpRecords, state.Experience + action.payload] };
        case ReduxActions.SPEND_XP:
            return { ...state, Experience: state.Experience - action.payload, ExperienceRecords: [...xpRecords, state.Experience - action.payload] };
        case ReduxActions.REWIND_XP:
            return { ...state, Experience: xpRecords.length > 1 ? xpRecords[xpRecords.length - 2] : xpRecords[0], ExperienceRecords: xpRecords.length > 1 ? xpRecords.slice(0, xpRecords.length - 1) : xpRecords };
        case ReduxActions.SET_CREW:
            return action.payload;
        case ReduxActions.SET_SHIPNAME:
            return { ...state, ShipName: action.payload };
        case ReduxActions.SET_CAPTAINS_NAME:
            return { ...state, Captain: { ...state.Captain, name: action.payload } };
        case ReduxActions.SET_CAPTAINS_BACKGROUND:
            return { ...state, Captain: { ...state.Captain, background: action.payload } };
        case ReduxActions.SET_CAPTAINS_GEAR:
            return { ...state, Captain: { ...state.Captain, gear: action.payload } };
        case ReduxActions.SET_CAPTAINS_POWERS:
            return { ...state, Captain: { ...state.Captain, powers: action.payload } };
        case ReduxActions.SET_CAPTAINS_STATS:
            return { ...state, Captain: { ...state.Captain, stats: action.payload } };
        case ReduxActions.SET_FIRSTMATE_NAME:
            return { ...state, FirstMate: { ...state.FirstMate, name: action.payload } };
        case ReduxActions.SET_FIRSTMATE_BACKGROUND:
            return { ...state, FirstMate: { ...state.FirstMate, background: action.payload } };
        case ReduxActions.SET_FIRSTMATE_GEAR:
            return { ...state, FirstMate: { ...state.FirstMate, gear: action.payload } };
        case ReduxActions.SET_FIRSTMATE_POWERS:
            return { ...state, FirstMate: { ...state.FirstMate, powers: action.payload } };
        case ReduxActions.SET_FIRSTMATE_STATS:
            return { ...state, FirstMate: { ...state.FirstMate, stats: action.payload } };
        case ReduxActions.SET_CAPTAIN:
            return { ...state, Captain: action.payload };
        case ReduxActions.SET_FIRST_MATE:
            return { ...state, FirstMate: action.payload };
        case ReduxActions.ADD_SOLDIERS:
            const transactionList = action.payload.map((soldier) => ({ credits: soldier.amount * soldier.cost, sign: false, record: `Hired ${soldier.amount} ${soldier.type}` }));
            return {
                ...state,
                Soldiers: state.Soldiers ? [...state.Soldiers, ...action.payload] : action.payload,
                Credits: state.Credits - action.payload.reduce((acc, soldier) => acc + (soldier.amount * soldier.cost), 0),
                CreditRecords: [...state.CreditRecords, ...transactionList],
            };
        case ReduxActions.MODIFY_SOLDIER:
            const idx = state.Soldiers.findIndex((sol) => sol.id === action.payload.id && sol.type === action.payload.type);
            state.Soldiers[idx] = action.payload;
            return state;
        case ReduxActions.REMOVE_SOLDIERS:
            const removalIdxs: number[] = [];
            const currentSoldiers = state.Soldiers;
            action.payload.forEach((soldier) => {
                removalIdxs.push(currentSoldiers.findIndex((sold) => sold.id === soldier.id && sold.type === soldier.type));
            });
            for (const index of removalIdxs) {
                currentSoldiers.splice(index, 1);
            }
            return {
                ...state, Soldiers: currentSoldiers.map((sol) => {
                    const typeAmount = currentSoldiers.filter((fil) => fil.type === sol.type).length;
                    return sol.id > typeAmount ? { ...sol, id: typeAmount } : sol;
                }),
            };
        default:
            return state;
    }
}
