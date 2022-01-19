import { store } from "..";
import { Character } from "../types";
import { CharacterStatusBarTable } from "./CharacterStatusBarTable";
import { CharacterTileGearAndPowers } from "./CharacterTileGearAndPowers";
import { CharacterTileHeader } from "./CharacterTileHeader";

export const CharacterComponent = ({ isCaptain, isPdf }: { isCaptain: boolean; isPdf?: boolean }) => {
    const state = store.getState();
    const character = (isCaptain ? state.Captain : state.FirstMate) as Character;
    const id = isCaptain ? "captain" : "firstmate";
    return <div key={`${id}_tile`} className={isPdf ? "pdf-tile" : "character-tile"}>
        <CharacterTileHeader character={character} />
        <CharacterStatusBarTable character={character} gearSlotsUsed={character.gear?.reduce((acc, gearItem) => acc + gearItem.gearSlots, 0) || 0} isTileTable={true} />
        <CharacterTileGearAndPowers character={character} isPdf={isPdf} />
    </div>;
};
