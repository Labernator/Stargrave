import { store } from "..";
import { Character } from "../types/Characters";
import { CharacterStatusBarTable } from "./CharacterStatusBarTable";
import { CharacterTileGearAndPowers } from "./CharacterTileGearAndPowers";
import { CharacterTileHeader } from "./CharacterTileHeader";

export const CharacterComponent = ({ isCaptain }: { isCaptain: boolean }) => {
    const state = store.getState();
    const character = (isCaptain ? state.Captain : state.FirstMate) as Character;
    const id = isCaptain ? "captain" : "firstmate";
    return <div key={`${id}_tile`} className="character-tile">
        <CharacterTileHeader character={character} />
        <CharacterStatusBarTable character={character} gearSlotsUsed={character.gear?.reduce((acc, gearItem) => acc + gearItem.gearSlots, 0) || 0} isTileTable={true} />
        <CharacterTileGearAndPowers character={character} />
    </div>;
};
