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
        case ReduxActions.ADD_LOOT:
            return { ...state, Cargo: [...state.Cargo, action.payload] };
        case ReduxActions.BUY_LOOT:
            return {
                ...state,
                Cargo: [...state.Cargo, action.payload.loot],
                Credits: state.Credits - action.payload.credits,
                CreditRecords: [...state.CreditRecords, { credits: action.payload.credits, sign: false, record: `Bought ${action.payload.loot.name}` }],
            };
        case ReduxActions.SELL_LOOT:
            const inventoryId = state.Cargo.findIndex((item) => item.name === action.payload.loot.name);
            if (inventoryId > -1) {
                const hold = state.Cargo;
                hold.splice(inventoryId, 1);
                return action.payload.credits ?
                    {
                        ...state,
                        Cargo: hold,
                        Credits: state.Credits + action.payload.credits,
                        CreditRecords: [...state.CreditRecords, { credits: action.payload.credits, sign: true, record: `Sold ${action.payload.loot.name}` }],
                    } : {
                        ...state,
                        Cargo: hold,
                    };
            }
            return state;
        case ReduxActions.REMOVE_LOOT_FROM_CARGO_BAY:
            const cargoId = state.Cargo.findIndex((item) => item.name === action.payload.loot.name);
            if (cargoId > -1) {
                const hold = state.Cargo;
                hold.splice(cargoId, 1);
                return {
                    ...state,
                    Cargo: hold,
                };
            }
            return state;
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
            const transactionList = action.payload.map((soldier) => ({ credits: soldier.cost, sign: false, record: `Hired a ${soldier.type} named ${soldier.name}` }));
            return {
                ...state,
                Soldiers: state.Soldiers ? [...state.Soldiers, ...action.payload] : action.payload,
                Credits: state.Credits - action.payload.reduce((acc, soldier) => acc + soldier.cost, 0),
                CreditRecords: [...state.CreditRecords, ...transactionList],
            };
        case ReduxActions.ADD_CREDITS:
            return {
                ...state,
                Credits: state.Credits + action.payload.credits,
                CreditRecords: [...state.CreditRecords, action.payload],
            };
        case ReduxActions.REMOVE_CREDITS:
            return {
                ...state,
                Credits: state.Credits - action.payload.credits,
                CreditRecords: [...state.CreditRecords, action.payload],
            };
        case ReduxActions.MODIFY_SOLDIER:
            const idx = state.Soldiers.findIndex((sol) => sol.name === action.payload.name && sol.type === action.payload.type);
            state.Soldiers[idx] = action.payload;
            return state;
        case ReduxActions.REMOVE_SOLDIERS:
            return {
                ...state,
                Soldiers: state.Soldiers.filter((soldier) => action.payload.find((sold) => sold.name === soldier.name && sold.type === soldier.type) === undefined),
            };
        case ReduxActions.CONVERT_INFORMATION:
            const invId = state.Cargo.findIndex((item) => item.name === action.payload.loot.name);
            if (invId > -1) {
                const hold = state.Cargo;
                hold.splice(invId, 1);
                return {
                    ...state, Cargo: hold, Experience: state.Experience + 20, ExperienceRecords: [...xpRecords, state.Experience + 20],
                };
            }
            return state;
        case ReduxActions.SHIP_UPGRADE:
            return {
                ...state,
                ShipUpgrades: [...state.ShipUpgrades, action.payload.name],
                Credits: state.Credits - action.payload.cost,
                CreditRecords: [...state.CreditRecords, { credits: action.payload.cost, sign: false, record: `Upgraded ship with ${action.payload.name}` }],
            };
        default:
            return state;
    }
}
