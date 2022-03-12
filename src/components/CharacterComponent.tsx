import { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { CrewState } from "../types";
import { CharacterInjuries } from "./CharacterInjuries";
import { CharacterStatusBarTable } from "./CharacterStatusBarTable";
import { CharacterTileGearAndPowers } from "./CharacterTileGearAndPowers";
import { CharacterTileHeader } from "./CharacterTileHeader";

export const CharacterComponent = ({ isCaptain, isPdf }: { isCaptain: boolean; isPdf?: boolean }) => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const character = (isCaptain ? state.Captain : state.FirstMate);
    const id = isCaptain ? "captain" : "firstmate";
    return <div key={`${id}_tile`} className={isPdf ? "pdf-tile" : "character-tile"}>
        <CharacterTileHeader character={character} />
        <CharacterStatusBarTable character={character} gearSlotsUsed={character.gear?.reduce((acc, gearItem) => acc + gearItem.gearSlots, 0) || 0} isTileTable={true} />
        <CharacterTileGearAndPowers character={character} isPdf={isPdf} />
        <CharacterInjuries character={character} />
    </div>;
};
