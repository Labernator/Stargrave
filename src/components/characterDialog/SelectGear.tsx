import React, { useEffect, useState } from "react";
import * as GearItems from "../../data/Gear.json";
import { Gear, ModifiedGear } from "../../types/Characters";
import { gearSortAlgorithm, getActualNotes, getDamageModifierString, getGearDetails } from "../../Utils";
import { GearDropDown } from "./GearDropdown";

const gearList = GearItems.general as Gear[];
const defaultKnife = { name: getGearDetails("Knife").name, gearSlots: getGearDetails("Knife").gearSlots };
const defaultArmour = { name: getGearDetails("No Armour").name, gearSlots: getGearDetails("No Armour").gearSlots };
export const SelectGear = (
    { isCaptain, updateGear, finish }:
        { isCaptain: boolean; updateGear(value: ModifiedGear[]): void; finish(): void }
) => {
    const [selectedGear, setSelectedGear] = useState<ModifiedGear[]>([defaultKnife, defaultArmour]);
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
    const getSelectedArmour = () => getGearByType("Armour")?.find((armour) => isGearSelected(armour.name));
    const getSelectedMelee = () => getGearByType("Weapon")?.filter((weapon) => weapon.maxRange === "Melee")?.find((melee) => isGearSelected(melee.name));
    const getCSSClasses = (name: string, withMax?: boolean) => isGearSelected(name) ? "gear-selection selected" : itemTooLarge(name) || (withMax && maxGear()) ? "gear-selection disabled" : "gear-selection";
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
                if (getSelectedArmour()?.name === "Combat Armour") {
                    setSelectedGear([
                        ...selectedGear.filter((gear) => gear.name !== "Combat Armour" && gear.name !== "Hand Weapon" && gear.name !== "Filter Mask" && gear.name !== "Pistol"),
                        defaultKnife,
                        { name: gearName, gearSlots: gearDetails.gearSlots },
                    ]);
                } else {
                    setSelectedGear([...selectedGear.filter((selGear) => getGearDetails(selGear.name).type !== gearDetails.type), { name: gearName, gearSlots: gearDetails.gearSlots }]);
                }
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
        <div className="single-selection-gear">
            <div className="modal-header">Armour</div>
            <GearDropDown
                dropdownOptions={{
                    id: "Armour",
                    placeholder: getSelectedArmour() || { ...defaultArmour, type: "Armour" },
                }}
                list={getGearByType("Armour") || []}
                callbackFn={onClickHandler}
            />
        </div>
        <div className="single-selection-gear">
            <div className="modal-header">Melee Weapons</div>
            <GearDropDown
                dropdownOptions={{
                    id: "Melee",
                    placeholder: getSelectedMelee() || { ...defaultKnife, type: "Weapon", maxRange: "Melee" },
                }}
                list={getGearByType("Weapon")?.filter((weapon) => weapon.maxRange === "Melee") || []}
                callbackFn={onClickHandler}
            />
        </div>
        <div className="modal-header">Equipment</div>
        {getGearByType("Equipment")?.map((equi) =>
            <div className="single-selection-gear">
                <div className={getCSSClasses(equi.name)} onClick={() => onClickHandler(equi.name)}>
                    <div className="gear-label-name">{`${equi.name} ( ${isGearSelected(equi.name) ? (selectedGear.find((item) => item.name === equi.name) as ModifiedGear).gearSlots : equi.gearSlots} )`}</div>
                    <div className="medium-text">{equi.notes}</div>
                </div>
            </div>)}

        <div className="modal-header">Shooting Weapons</div>
        {getGearByType("Weapon")?.filter((weapon) => weapon.maxRange !== "Melee").sort((a, b) => gearSortAlgorithm(a) - gearSortAlgorithm(b)).map((weapon) =>
            <div className="single-selection-gear">
                <div className={getCSSClasses(weapon.name, true)} onClick={() => onClickHandler(weapon.name)}>
                    <div className="gear-label-name">{`${weapon.name} ( ${isGearSelected(weapon.name) ? (selectedGear.find((item) => item.name === weapon.name) as ModifiedGear).gearSlots : weapon.gearSlots} )`}</div>
                    <div className="medium-text">{`Range: ${weapon.maxRange}`} / {`${getDamageModifierString(weapon)} dmg`}</div>
                    {weapon.notes ? <div className="medium-text">{getActualNotes(selectedGear, weapon)}</div> : null}
                </div>
            </div>)}
        <button
            onClick={() => { updateGear(selectedGear.sort((a, b) => (a.name.localeCompare(b.name)))); finish(); }}
            className={"dialog-btn confirm-btn"}
        >{`${"Confirm"}`}</button>
    </React.Fragment>;
};
