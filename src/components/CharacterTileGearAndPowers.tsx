import React from "react";
import { Character, Gear, ModifiedGear, Soldier } from "../types/Characters";
import { getGearDetails } from "../Utils";

const renderGear = (gear: Gear[] | ModifiedGear[], renderSoldier?: boolean) => <table className="character-tile-table" style={{ width: "100%" }}>
    <colgroup>
        <col style={{ width: "25%" }} />
        <col style={{ width: "75%" }} />
    </colgroup>
    <tbody>
        <tr>
            <td style={{ fontSize: "1rem", paddingRight: "1rem" }}>Gear</td>
            <td className="small-text">
                {`${renderSoldier ?
                    gear.map((gearItem: ModifiedGear) => gearItem.name).join(", ") :
                    gear.map((gearItem: ModifiedGear) => `${gearItem.name} (${gearItem.gearSlots})`).join(", ")}`}</td>
        </tr>
    </tbody>
</table>;

export const CharacterTileGearAndPowers = ({ character }: { character: Character }) =>
    <React.Fragment>
        <table className="character-tile-table" style={{ width: "100%", textAlign: "left" }}>
            <colgroup>
                <col style={{ width: "25%" }} />
                <col style={{ width: "75%" }} />
            </colgroup>
            <tbody>
                <tr>
                    <td style={{ fontSize: "1rem", paddingRight: "1rem" }}>Powers</td>
                    <td className="small-text">{`${character.powers?.map((power) => `${power.name} (${power.activation})`).join(", ")}`}</td>
                </tr>
            </tbody>
        </table>
        {character.gear ? renderGear(character.gear) : null}
    </React.Fragment>;

export const SoldierTileGearAndPowers = ({ soldier }: { soldier: Soldier }) =>
    <React.Fragment>
        {soldier.gear ? renderGear(soldier.gear.map(getGearDetails), true) : null}
    </React.Fragment>;
