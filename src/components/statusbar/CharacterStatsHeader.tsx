import { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { Character, CharactersEnum, CrewState, Soldier } from "../../types";
import { isCharacter } from "../../Utils";
import { CharacterStatusBarTable } from "../CharacterStatusBarTable";

export const CharacterStatsHeader = ({ characterType, gearSlots }: { characterType: CharactersEnum; gearSlots?: number }) => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const character = characterType === CharactersEnum.Captain ? state.Captain : state.FirstMate;
    return <div key="statusbar" id="statusbar" className="statusbar" >
        <div className="statusbar-tiles" style={{ display: "block", float: "none" }}>{`${characterType === CharactersEnum.Captain ? "Cpt." : "Ltn."} ${character.name}` || "Unnamed Character"}</div>
        <CharacterStatusBarTable
            character={character}
            gearSlotsUsed={gearSlots || character.gear?.reduce((acc, gearItem) => acc + gearItem.gearSlots, 0) || 0} />
    </div>;
};

export const CustomStatsHeader = ({ character, gearSlots }: { character: Character | Soldier; gearSlots?: number }) => <div key="statusbar" id="statusbar" className="statusbar" >
    <div className="statusbar-tiles" style={{ display: "block", float: "none" }}>{`${isCharacter(character) ? character.name : character.type}` || "Unnamed Character"}</div>
    <CharacterStatusBarTable
        character={character}
        gearSlotsUsed={gearSlots === undefined ? (isCharacter(character) ? character.gear?.reduce((acc, gearItem) => acc + gearItem.gearSlots, 0) : 0) : gearSlots} />
</div>;
