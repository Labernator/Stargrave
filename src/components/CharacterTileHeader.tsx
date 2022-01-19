import { Character, Soldier } from "../types";
import { isCaptain } from "../Utils";

export const CharacterTileHeader = ({ character }: { character: Character }) =>
    <table className="character-tile-table" style={{ width: "100%" }}>
        <tbody>
            <tr>
                <td>
                    {`${isCaptain(character.type) ? "Cpt." : "Ltn."} ${character.name} (${character.background})`}
                </td>
                <td style={{ textAlign: "end" }}>{`Level ${character.level}`}</td>
            </tr>
        </tbody>
    </table>;

export const SoldierTileHeader = ({ soldier }: { soldier: Soldier }) =>
    <table className="character-tile-table" style={{ width: "100%" }}>
        <tbody>
            <tr>
                <td>
                    {soldier.amount > 0 ? `${soldier.amount}x ${soldier.type}` : soldier.type}
                </td>
                <td style={{ textAlign: "end" }}>{`(${soldier.amount > 0 ? soldier.cost * soldier.amount : soldier.cost} \xA5)`}</td>
            </tr>
        </tbody>
    </table>;
