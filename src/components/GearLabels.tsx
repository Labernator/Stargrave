import React from "react";
import { Gear } from "../types/Characters";
import { getActualNotes, getDamageModifierString, getGearDetails } from "../Utils";
const sortAlgorithm = (gear: Gear) => {
    let count = 0;
    if (gear.type === "Weapon" || gear.type === "Armour") {
        count += 1;
    }
    if (gear.notes) {
        count += 1;
        if (gear.notes.length > 40) {
            count += 0.5;
        }
    }
    return count;
};
export const GearLabels = ({ gearList }: { gearList: string[] | undefined }) => <React.Fragment>{gearList?.map(getGearDetails).sort((a, b) => sortAlgorithm(a) - sortAlgorithm(b)).map((gear) =>
    <div className="background-power-selection" style={{ maxWidth: "50%", margin: "0.1rem" }}>
        <div style={{ fontWeight: "bold" }}>{`${gear.name} ( ${gear.gearSlots} )`}</div>
        {gear.type === "Weapon" ? <div style={{ fontSize: "0.65rem" }}>
            {gear.maxRange === "Melee" || gear.maxRange === "Template" ? gear.maxRange : `Range: ${gear.maxRange}`} / {`Gear Slots: ${gear.gearSlots}`} / {`Damage: ${getDamageModifierString(gear)}`}</div > :
            gear.type === "Armour" ? <div style={{ fontSize: "0.65rem" }}> {`+${gear.armourModifier} Armour ${getActualNotes(gearList, gear) ? "/" : ""} ${getActualNotes(gearList, gear)}`}</div> : null}
        {gear.type === "Armour" ? null : < div style={{ fontSize: "0.65rem" }}> {getActualNotes(gearList, gear)} </div>}
    </div>
)}</React.Fragment> || null;
