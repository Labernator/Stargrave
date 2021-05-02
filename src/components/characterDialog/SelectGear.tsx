import React, { useEffect, useState } from "react";
import * as GearItems from "../../data/Gear.json";
import { Gear } from "../../types/Characters";
import { getGearDetails } from "../../Utils";

const gearList = GearItems.general as Gear[];

export const SelectGear = (
    { isCaptain, updateGear, finish }:
        { isCaptain: boolean; updateGear(value: string[]): void; finish(): void }
) => {
    const [selectedGear, setSelectedGear] = useState<string[]>(["Knife"]);
    useEffect(() => updateGear(selectedGear), [selectedGear]);
    const isGearSelected = (gear: string) => !!selectedGear.find((gr) => gr === gear);
    const maxGear = () => selectedGear.reduce((acc, gear) => acc + getGearDetails(gear).gearSlots, 0) >= (isCaptain ? 6 : 5);
    const getGearByType = (gearType: string) => {
        switch (gearType) {
            case "Armour": return gearList.filter((gear) => gear.type === "Armour");
            case "Weapon": return gearList.filter((gear) => gear.type === "Weapon");
            case "Equipment": return gearList.filter((gear) => gear.type === "Equipment");
        }
    };
    const getCSSClasses = (name: string, withMax?: boolean) => isGearSelected(name) ? "background-power-selection selected" : itemTooLarge(name) || (withMax && maxGear()) ? "background-power-selection disabled" : "background-power-selection";
    const itemTooLarge = (gearName: string) => selectedGear.reduce((acc, gearItem) => acc + getGearDetails(gearItem).gearSlots, 0) + getGearDetails(gearName).gearSlots > (isCaptain ? 6 : 5);
    const onClickHandler = (gearName: string) => {
        if (isGearSelected(gearName)) {
            setSelectedGear(selectedGear.filter((gear) => gear !== gearName));
        } else {
            if (itemTooLarge(gearName) || (getGearDetails(gearName).type === "Weapon" && maxGear())) {
                return;
            }
            if (getGearDetails(gearName).type === "Armour") {
                setSelectedGear([...selectedGear.filter((selGear) => getGearDetails(selGear).type !== getGearDetails(gearName).type), gearName]);
                return;
            }
            if ((getGearDetails(gearName).type === "Weapon" && getGearDetails(gearName).maxRange === "Melee")) {
                setSelectedGear([
                    ...selectedGear.filter((selGear) => getGearDetails(selGear).maxRange !== "Melee"),
                    gearName,
                ]);
                return;
            }
            setSelectedGear([...selectedGear, gearName]);
        }
    };
    const getDamageModifierString = (weapon: Gear) => {
        if (!weapon.damageModifier) {
            return "+0";
        }
        if (weapon.damageModifier > 0) {
            return `+${weapon.damageModifier}`;
        }

        return `${weapon.damageModifier}`;
    };
    return <React.Fragment>
        <div className="gear-section">
            <div className="modal-header">Equipment</div>
            {getGearByType("Equipment")?.map((equi) =>
                <div className={getCSSClasses(equi.name)} style={{ width: "45%" }} onClick={() => onClickHandler(equi.name)}>
                    <div>{`${equi.name} ( ${equi.gearSlots} )`}</div>
                    <div style={{ fontSize: "0.65rem" }}>{equi.notes}</div>
                </div>)}
            <div className="modal-header">Armour</div>
            {getGearByType("Armour")?.map((armour) =>
                <div className={getCSSClasses(armour.name)} style={{ width: "45%" }} onClick={() => onClickHandler(armour.name)}>
                    <div>{`${armour.name} ( ${armour.gearSlots} )`}</div>
                    <div style={{ fontSize: "0.65rem" }}>{`Armour: +${armour.armourModifier}`}</div>
                    {armour.notes ? <div style={{ fontSize: "0.65rem" }}>{armour.notes}</div> : null}
                </div>)}
        </div>

        <div className="gear-section">
            <div className="modal-header">Melee Weapons</div>
            {getGearByType("Weapon")?.filter((weapon) => weapon.maxRange === "Melee").map((weapon) =>
                <div className={getCSSClasses(weapon.name, true)} style={{ width: "45%" }} onClick={() => onClickHandler(weapon.name)}>
                    <div>{`${weapon.name} ( ${weapon.gearSlots} )`}</div>
                    <div style={{ fontSize: "0.65rem" }}>{weapon.maxRange ? `Range: ${weapon.maxRange}` : "Melee"} / {`Gear Slots: ${weapon.gearSlots}`} / {`Damage: ${getDamageModifierString(weapon)}`}</div>
                    {weapon.notes ? <div style={{ fontSize: "0.65rem" }}>{weapon.notes}</div> : null}
                </div>)}
            <div className="modal-header">Shooting Weapons</div>
            {getGearByType("Weapon")?.filter((weapon) => weapon.maxRange !== "Melee").map((weapon) =>
                <div className={getCSSClasses(weapon.name, true)} style={{ width: "45%" }} onClick={() => onClickHandler(weapon.name)}>
                    <div>{`${weapon.name} ( ${weapon.gearSlots} )`}</div>
                    <div style={{ fontSize: "0.65rem" }}>{weapon.maxRange ? `Range: ${weapon.maxRange}` : "Melee"} / {`Gear Slots: ${weapon.gearSlots}`} / {`Damage: ${getDamageModifierString(weapon)}`}</div>
                    {weapon.notes ? <div style={{ fontSize: "0.65rem" }}>{weapon.notes}</div> : null}
                </div>)}
        </div>
        <button
            onClick={() => { updateGear(selectedGear.sort((a, b) => (a.localeCompare(b)))); finish(); }}
            className={"power-btn"}
        >{`${"Confirm Gear selection and finish character creation"}`}</button>
    </React.Fragment>;
};
