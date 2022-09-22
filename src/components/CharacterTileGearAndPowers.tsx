import React from "react";
import { getGearDetails } from "../GearUtils";
import { Character, Gear, ModifiedGear, Soldier } from "../types";

const renderGear = (gear: Gear[] | ModifiedGear[], renderSoldier?: boolean, isPdf?: boolean) => <table className="character-tile-table" style={{ width: "100%" }}>
    <colgroup>
        <col style={{ width: "25%" }} />
        <col style={{ width: "75%" }} />
    </colgroup>
    <tbody>
        <tr className={isPdf ? "medium-pdf-text" : "small-text"}>
            <td style={{ fontSize: "1rem", paddingRight: "1rem", fontWeight: "bold" }}>Gear</td>
            <td>
                {`${renderSoldier ?
                    gear.map((gearItem: ModifiedGear) => gearItem.name).join(", ") :
                    gear.map((gearItem: ModifiedGear) => `${gearItem.name} (${gearItem.gearSlots})`).join(", ")}`}</td>
        </tr>
    </tbody>
</table>;

export const CharacterTileGearAndPowers = ({ character, isPdf }: { character: Character; isPdf?: boolean }) =>
    <React.Fragment>
        <table className="character-tile-table" style={{ width: "100%", textAlign: "left" }}>
            <colgroup>
                <col style={{ width: "25%" }} />
                <col style={{ width: "75%" }} />
            </colgroup>
            <tbody>
                <tr className={isPdf ? "medium-pdf-text" : "small-text"}>
                    <td style={{ fontSize: "1rem", paddingRight: "1rem", fontWeight: "bold" }}>Powers</td>
                    <td>{`${character.powers?.map((power) => `${power.name} (${power.activation})`).join(", ")}`}</td>
                </tr>
            </tbody>
        </table>
        {character.gear ? renderGear(character.gear, false, isPdf) : null}
    </React.Fragment>;

export const SoldierTileGearAndPowers = ({ soldier, isPdf }: { soldier: Soldier; isPdf?: boolean }) =>
    <React.Fragment>
        {soldier.gear ? renderGear(soldier.gear.map(getGearDetails), true, isPdf) : null}
    </React.Fragment>;
