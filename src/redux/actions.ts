import { BackgroundEnum, Character, CrewState, LootItem, ModifiedGear, ModifiedPower, ShipUpgrade, Soldier, Stats, Transaction } from "../types";

export const ADD_XP = "ADD_XP";
export const ADD_LOOT = "ADD_LOOT";
export const BUY_LOOT = "BUY_LOOT";
export const SPEND_XP = "SPEND_XP";
export const REWIND_XP = "REWIND_XP";
export const ADD_SOLDIERS = "ADD_SOLDIERS";
export const SET_CAPTAINS_NAME = "SET_CAPTAINS_NAME";
export const SET_CAPTAINS_BACKGROUND = "SET_CAPTAINS_BACKGROUND";
export const SET_CAPTAINS_STATS = "SET_CAPTAINS_STATS";
export const SET_CAPTAINS_POWERS = "SET_CAPTAINS_POWERS";
export const SET_CAPTAINS_GEAR = "SET_CAPTAINS_GEAR";
export const SET_FIRSTMATE_NAME = "SET_FIRSTMATE_NAME";
export const SET_FIRSTMATE_BACKGROUND = "SET_FIRSTMATE_BACKGROUND";
export const SET_FIRSTMATE_GEAR = "SET_FIRSTMATE_GEAR";
export const SET_FIRSTMATE_STATS = "SET_FIRSTMATE_STATS";
export const SET_FIRSTMATE_POWERS = "SET_FIRSTMATE_POWERS";
export const SET_FIRST_MATE = "SET_FIRST_MATE";
export const SET_CAPTAIN = "SET_CAPTAIN";
export const SET_CREW = "SET_CREW";
export const SET_SHIPNAME = "SET_SHIPNAME";
export const MODIFY_SOLDIER = "MODIFY_SOLDIER";
export const REMOVE_SOLDIERS = "REMOVE_SOLDIERS";
export const SELL_LOOT = "SELL_LOOT";
export const ADD_CREDITS = "ADD_CREDITS";
export const REMOVE_CREDITS = "REMOVE_CREDITS";
export const CONVERT_INFORMATION = "CONVERT_INFORMATION";
export const REMOVE_LOOT_FROM_CARGO_BAY = "REMOVE_LOOT_FROM_CARGO_BAY";
export const SHIP_UPGRADE = "SHIP_UPGRADE";
interface SetCrew {
    type: typeof SET_CREW;
    payload: CrewState;
}

interface AddXp {
    type: typeof ADD_XP;
    payload: number;
}

interface SpendXp {
    type: typeof SPEND_XP;
    payload: number;
}

interface RewindXp {
    type: typeof REWIND_XP;
}

interface SetCrewName {
    type: typeof SET_SHIPNAME;
    payload: string;
}

interface SetCaptainsName {
    type: typeof SET_CAPTAINS_NAME;
    payload: string;
}

interface SetFirstMateName {
    type: typeof SET_FIRSTMATE_NAME;
    payload: string;
}
interface SetFirstMateBackground {
    type: typeof SET_FIRSTMATE_BACKGROUND;
    payload: BackgroundEnum | undefined;
}
interface SetCaptainsBackground {
    type: typeof SET_CAPTAINS_BACKGROUND;
    payload: BackgroundEnum | undefined;
}
interface SetCaptainsPowers {
    type: typeof SET_CAPTAINS_POWERS;
    payload: ModifiedPower[];
}

interface SetCaptainsGear {
    type: typeof SET_CAPTAINS_GEAR;
    payload: ModifiedGear[];
}

interface SetFirstMateGear {
    type: typeof SET_FIRSTMATE_GEAR;
    payload: ModifiedGear[];
}

interface SetFirstMatePowers {
    type: typeof SET_FIRSTMATE_POWERS;
    payload: ModifiedPower[];
}

interface SetCaptainsStats {
    type: typeof SET_CAPTAINS_STATS;
    payload: Stats;
}

interface SetFirstMateStats {
    type: typeof SET_FIRSTMATE_STATS;
    payload: Stats;
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

interface ModifySoldier {
    type: typeof MODIFY_SOLDIER;
    payload: Soldier;
}
interface RemoveSoldiers {
    type: typeof REMOVE_SOLDIERS;
    payload: Soldier[];
}

interface AddLoot {
    type: typeof ADD_LOOT;
    payload: LootItem;
}

interface SellLoot {
    type: typeof SELL_LOOT;
    payload: { loot: LootItem; credits: number };
}

interface BuyLoot {
    type: typeof BUY_LOOT;
    payload: { loot: LootItem; credits: number };
}

interface RemoveLootFromCargoBay {
    type: typeof REMOVE_LOOT_FROM_CARGO_BAY;
    payload: { loot: LootItem };
}
interface ConvertInformation {
    type: typeof CONVERT_INFORMATION;
    payload: { loot: LootItem };
}

interface AddCredits {
    type: typeof ADD_CREDITS;
    payload: Transaction;
}

interface RemoveCredits {
    type: typeof REMOVE_CREDITS;
    payload: Transaction;
}

interface UpgradeShip {
    type: typeof SHIP_UPGRADE;
    payload: ShipUpgrade;
}

export type Actions = AddCredits | AddLoot | AddSoldiers | AddXp | BuyLoot | ConvertInformation | ModifySoldier | SellLoot | RemoveLootFromCargoBay | RemoveCredits | RemoveSoldiers |
    RewindXp | SetCrew | SetCrewName | SetCaptainsBackground | SetCaptainsGear | SetCaptainsName | SetCaptainsPowers |
    SetCaptainsStats | SetCaptain | SetFirstMate | SetFirstMateBackground | SetFirstMateGear | SetFirstMateStats | SetFirstMatePowers |
    SetFirstMateName | SpendXp | UpgradeShip;
