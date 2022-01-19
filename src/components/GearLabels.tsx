import React from "react";
import { Gear, ModifiedGear } from "../types";
import { getActualNotes, getDamageModifierString } from "../Utils";
export const GearLabel = ({ gear, gearList }: { gear: Gear; gearList: Array<ModifiedGear | string> }) =>
    <React.Fragment>
        <div className="gear-label-name">{`${gear.name} ( ${gear.gearSlots} )`} </div>
        {gear.type === "Weapon" ? <div style={{ fontSize: "0.65rem" }}>
            {gear.maxRange === "Melee" || gear.maxRange === "Template" ? gear.maxRange : `Range: ${gear.maxRange}`} / {`${getDamageModifierString(gear)} dmg`}</div > :
            gear.type === "Armour" ? <div style={{ fontSize: "0.65rem" }}> {`+${gear.armourModifier || 0} Armour ${getActualNotes(gearList, gear) ? "/" : ""} ${getActualNotes(gearList, gear)}`}</div> : null}
        {gear.type === "Armour" ? null : < div style={{ fontSize: "0.65rem" }}> {getActualNotes(gearList, gear)} </div>}
    </React.Fragment>;
