import { Character, Soldier } from "../types";
import { isCaptain } from "../Utils";

export const CharacterTileHeader = ({ character }: { character: Character }) =>
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: "bold" }}>
        <div>{`${isCaptain(character.type) ? "Cpt." : "Ltn."} ${character.name} (${character.background})`}</div>
        <div>{`Level ${character.level}`}</div>
    </div>;
export const SoldierTileHeader = ({ soldier }: { soldier: Soldier }) =>
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "1.1rem", fontWeight: "bold" }}>
        <div>{`${soldier.name} (${soldier.type})`}</div>
    </div>;
