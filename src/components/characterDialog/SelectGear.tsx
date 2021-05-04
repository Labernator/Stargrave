import React, { useEffect, useState } from "react";
import * as GearItems from "../../data/Gear.json";
import { Gear, ModifiedGear } from "../../types/Characters";
import { getDamageModifierString, getGearDetails } from "../../Utils";

const gearList = GearItems.general as Gear[];
const defaultKnife = { name: getGearDetails("Knife").name, gearSlots: getGearDetails("Knife").gearSlots };
export const SelectGear = (
    { isCaptain, updateGear, finish }:
        { isCaptain: boolean; updateGear(value: ModifiedGear[]): void; finish(): void }
) => {
    const [selectedGear, setSelectedGear] = useState<ModifiedGear[]>([defaultKnife]);
    useEffect(() => updateGear(selectedGear), [selectedGear]);
    const isGearSelected = (gear: string) => !!selectedGear.find((gr) => gr.name === gear);
    const maxGear = () => selectedGear.reduce((acc, gear) => acc + gear.gearSlots, 0) >= (isCaptain ? 6 : 5);
    const getGearByType = (gearType: string) => {
        switch (gearType) {
            case "Armour": return gearList.filter((gear) => gear.type === "Armour");
            case "Weapon": return gearList.filter((gear) => gear.type === "Weapon");
            case "Equipment": return gearList.filter((gear) => gear.type === "Equipment");
        }
    };
    const getCSSClasses = (name: string, withMax?: boolean) => isGearSelected(name) ? "background-power-selection selected" : itemTooLarge(name) || (withMax && maxGear()) ? "background-power-selection disabled" : "background-power-selection";
    const itemTooLarge = (gearName: string) => selectedGear.reduce((acc, gearItem) => acc + gearItem.gearSlots, 0) + getGearDetails(gearName).gearSlots > (isCaptain ? 6 : 5);
    const onClickHandler = (gearName: string) => {
        if (isGearSelected(gearName)) {
            if (gearName === "Combat Armour") {
                setSelectedGear([...selectedGear.filter((gear) => gear.name !== gearName && gear.name !== "Hand Weapon" && gear.name !== "Filter Mask" && gear.name !== "Pistol"), defaultKnife]);
                return;
            }
            setSelectedGear(selectedGear.filter((gear) => gear.name !== gearName));
        } else {
            const gearDetails = getGearDetails(gearName);
            if (itemTooLarge(gearName) || (gearDetails.type === "Weapon" && maxGear())) {
                return;
            }
            if (gearDetails.type === "Armour") {
                if (gearDetails.name === "Combat Armour") {
                    setSelectedGear(
                        [
                            ...selectedGear.filter((selGear) => getGearDetails(selGear.name).type !== "Armour").filter((selGear) => getGearDetails(selGear.name).maxRange !== "Melee"),
                            { name: gearName, gearSlots: gearDetails.gearSlots },
                            { name: "Hand Weapon", gearSlots: 0 },
                            { name: "Filter Mask", gearSlots: 0 },
                            { name: "Pistol", gearSlots: 0 }]);
                    return;
                }
                setSelectedGear([...selectedGear.filter((selGear) => getGearDetails(selGear.name).type !== gearDetails.type), { name: gearName, gearSlots: gearDetails.gearSlots }]);
                return;
            }
            if ((gearDetails.type === "Weapon" && gearDetails.maxRange === "Melee")) {
                setSelectedGear([
                    ...selectedGear.filter((selGear) => getGearDetails(selGear.name).maxRange !== "Melee"),
                    { name: gearName, gearSlots: gearDetails.gearSlots },
                ]);
                return;
            }
            setSelectedGear([...selectedGear, { name: gearName, gearSlots: gearDetails.gearSlots }]);
        }
    };

    return <React.Fragment>
        <div className="gear-section">
            <div className="modal-header">Equipment</div>
            {getGearByType("Equipment")?.map((equi) =>
                <div className={getCSSClasses(equi.name)} style={{ width: "45%" }} onClick={() => onClickHandler(equi.name)}>
                    <div>{`${equi.name} ( ${isGearSelected(equi.name) ? (selectedGear.find((item) => item.name === equi.name) as ModifiedGear).gearSlots : equi.gearSlots} )`}</div>
                    <div style={{ fontSize: "0.65rem" }}>{equi.notes}</div>
                </div>)}
            <div className="modal-header">Armour</div>
            {getGearByType("Armour")?.map((armour) =>
                <div className={getCSSClasses(armour.name)} style={{ width: "45%" }} onClick={() => onClickHandler(armour.name)}>
                    <div>{`${armour.name} ( ${isGearSelected(armour.name) ? (selectedGear.find((item) => item.name === armour.name) as ModifiedGear).gearSlots : armour.gearSlots} )`}</div>
                    <div style={{ fontSize: "0.65rem" }}>{`Armour: +${armour.armourModifier}`}</div>
                    {armour.notes ? <div style={{ fontSize: "0.65rem" }}>{armour.notes}</div> : null}
                </div>)}
        </div>

        <div className="gear-section">
            <div className="modal-header">Melee Weapons</div>
            {getGearByType("Weapon")?.filter((weapon) => weapon.maxRange === "Melee").map((weapon) =>
                <div className={getCSSClasses(weapon.name, true)} style={{ width: "45%" }} onClick={() => onClickHandler(weapon.name)}>
                    <div>{`${weapon.name} ( ${isGearSelected(weapon.name) ? (selectedGear.find((item) => item.name === weapon.name) as ModifiedGear).gearSlots : weapon.gearSlots} )`}</div>
                    <div style={{ fontSize: "0.65rem" }}>{weapon.maxRange ? `Range: ${weapon.maxRange}` : "Melee"} / {`Gear Slots: ${weapon.gearSlots}`} / {`Damage: ${getDamageModifierString(weapon)}`}</div>
                    {weapon.notes ? <div style={{ fontSize: "0.65rem" }}>{weapon.notes}</div> : null}
                </div>)}
            <div className="modal-header">Shooting Weapons</div>
            {getGearByType("Weapon")?.filter((weapon) => weapon.maxRange !== "Melee").map((weapon) =>
                <div className={getCSSClasses(weapon.name, true)} style={{ width: "45%" }} onClick={() => onClickHandler(weapon.name)}>
                    <div>{`${weapon.name} ( ${isGearSelected(weapon.name) ? (selectedGear.find((item) => item.name === weapon.name) as ModifiedGear).gearSlots : weapon.gearSlots} )`}</div>
                    <div style={{ fontSize: "0.65rem" }}>{weapon.maxRange ? `Range: ${weapon.maxRange}` : "Melee"} / {`Gear Slots: ${weapon.gearSlots}`} / {`Damage: ${getDamageModifierString(weapon)}`}</div>
                    {weapon.notes ? <div style={{ fontSize: "0.65rem" }}>{weapon.notes}</div> : null}
                </div>)}
        </div>
        <button
            onClick={() => { updateGear(selectedGear.sort((a, b) => (a.name.localeCompare(b.name)))); finish(); }}
            className={"power-btn"}
        >{`${"Confirm Gear selection and finish character creation"}`}</button>
    </React.Fragment>;
};
