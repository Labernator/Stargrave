import React from "react";
import { Gear, ModifiedGear } from "../types/Characters";
import { gearSortAlgorithm, getActualNotes, getDamageModifierString, getGearDetails } from "../Utils";
export const GearLabels = ({ gearList }: { gearList: Array<ModifiedGear | string> | undefined }) =>
    <React.Fragment>
        {gearList?.map((gearItem) => typeof (gearItem) === "string" ? getGearDetails(gearItem) : { ...getGearDetails(gearItem.name), gearSlots: gearItem.gearSlots }).sort((a, b) => gearSortAlgorithm(a) - gearSortAlgorithm(b)).map((gear) =>
            <GearLabel gear={gear} gearList={gearList} css="background-power-selection" />
        )}
    </React.Fragment> || null;
export const GearLabel = ({ gear, gearList, css }: { gear: Gear; gearList: Array<ModifiedGear | string>; css?: string }) => <div className={css || ""}>
    <div>{`${gear.name} ( ${gear.gearSlots} )`} </div>
    {gear.type === "Weapon" ? <div style={{ fontSize: "0.65rem" }}>
        {gear.maxRange === "Melee" || gear.maxRange === "Template" ? gear.maxRange : `Range: ${gear.maxRange}`} / {`${getDamageModifierString(gear)} dmg`}</div > :
        gear.type === "Armour" ? <div style={{ fontSize: "0.65rem" }}> {`+${gear.armourModifier || 0} Armour ${getActualNotes(gearList, gear) ? "/" : ""} ${getActualNotes(gearList, gear)}`}</div> : null}
    {gear.type === "Armour" ? null : < div style={{ fontSize: "0.65rem" }}> {getActualNotes(gearList, gear)} </div>}
</div>;
