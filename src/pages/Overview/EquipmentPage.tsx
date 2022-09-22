import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CustomBackButtonComponent } from "../../components/common/CustomBackButton";
import { GearDropDown2 } from "../../components/dropdowns/GearDropdown2";
import { CustomStatsHeader } from "../../components/statusbar/CharacterStatsHeader";
import { getGearDetails, getGeneralGearByType, getNormalGearDetails, getNormalMeleeWeapons, getNormalRangedWeapons, isAdvancedWeapon, isGeneralGear, isWeapon } from "../../GearUtils";
import { ADD_LOOT, SET_CAPTAINS_GEAR, SET_FIRSTMATE_GEAR } from "../../redux/actions";
import { AdvancedTech, AdvancedWeapons, AlienArtefact, Character, CharactersEnum, Gear, ModifiedGear } from "../../types";
import { getActualNotes, getDamageModifierString, getLootCategory } from "../../Utils";

interface EquipmentState {
    crewMember: Character;
    equipment?: AdvancedTech | AlienArtefact | AdvancedWeapons;
}

export const EquipmentPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { crewMember, equipment } = history.location.state as EquipmentState;
    const currentGear = crewMember.gear.map(getGearDetails);
    const [selectedGear, setSelectedGear] = useState<Gear[]>(currentGear);
    const generalArmourList = getGeneralGearByType("Armour");
    const generalMeleeList = getNormalMeleeWeapons();
    const generalShootingList = getNormalRangedWeapons();
    const generalEquipmentList = getGeneralGearByType("Equipment");
    const currentArmourList = currentGear.filter((g) => g.type === "Armour");
    const currentMeleeList = currentGear.filter((g) => isWeapon(g) && g.maxRange === "Melee");
    const currentEquipment = currentGear.filter((g) => g.type === "Equipment");
    const currentShootingList = currentGear.filter((g) => isWeapon(g) && g.maxRange !== "Melee");
    const armourList = currentArmourList.concat(generalArmourList.filter((gItem) => currentArmourList.map((x) => x.name).indexOf(gItem.name) < 0));
    const meleeWeaponsList = currentMeleeList.concat(generalMeleeList.filter((gItem) => currentMeleeList.map((x) => x.name).indexOf(gItem.name) < 0));
    const equipmentList = currentEquipment.concat(generalEquipmentList.filter((gItem) => currentEquipment.map((x) => x.name).indexOf(gItem.name) < 0));
    const shootingWeaponsList = currentShootingList.concat(generalShootingList.filter((gItem) => currentShootingList.map((x) => x.name).indexOf(gItem.name) < 0));

    const defaultKnife = getNormalGearDetails("Knife");
    const defaultArmour = getNormalGearDetails("No Armour");
    if (equipment?.type === "Armour") {
        armourList.push(equipment);
    }
    if (equipment?.type === "Weapon" && isAdvancedWeapon(equipment)) {
        if (equipment.maxRange === "Melee") {
            meleeWeaponsList.push(equipment);
        } else {
            shootingWeaponsList.push(equipment);
        }
    }
    if (equipment?.type === "Equipment") {
        equipmentList.push(equipment);
    }
    const isGearSelected = (gear: string) => !!selectedGear.find((gr) => gr.name === gear);
    const maxGear = () => selectedGear.reduce((acc, gear) => acc + gear.gearSlots, 0) >= (crewMember.gearSlots);
    const isTooMuchGear = () => selectedGear.reduce((acc, gear) => acc + gear.gearSlots, 0) > (crewMember.gearSlots);
    const getSelectedArmour = () => armourList.find((armour) => isGearSelected(armour.name));
    const getSelectedMelee = () => meleeWeaponsList.find((melee) => isGearSelected(melee.name));
    const getCSSClasses = (gear: Gear, withMax?: boolean) => isGearSelected(gear.name) ? "gear-selection selected" : itemTooLarge(gear) || (withMax && maxGear()) ? "gear-selection disabled" : "gear-selection";
    const itemTooLarge = (gear: Gear) => selectedGear.reduce((acc, gearItem) => acc + gearItem.gearSlots, 0) + gear.gearSlots > (crewMember.gearSlots);
    const onClickHandler = (gear: Gear) => {
        if (isGearSelected(gear.name)) {
            if (gear.name === "Combat Armour") {
                setSelectedGear([...selectedGear.filter((selGear) => gear.name !== selGear.name && selGear.name !== "Hand Weapon" && selGear.name !== "Filter Mask" && selGear.name !== "Pistol"), defaultKnife]);
                return;
            }
            setSelectedGear(selectedGear.filter((selGear) => selGear.name !== gear.name));
        } else {
            if (gear.type === "Armour") {
                if (gear.name === "Combat Armour") {
                    setSelectedGear([
                        ...selectedGear.filter((selGear) => selGear.type !== "Armour").filter((selGear) => selGear.maxRange !== "Melee"),
                        gear,
                        { ...getNormalGearDetails("Hand Weapon"), gearSlots: 0 },
                        { ...getNormalGearDetails("Filter Mask"), gearSlots: 0 },
                        { ...getNormalGearDetails("Pistol"), gearSlots: 0 },
                    ]);
                    return;
                }
                if (getSelectedArmour()?.name === "Combat Armour") {
                    setSelectedGear([
                        ...selectedGear.filter((selGear) => selGear.name !== "Combat Armour" && selGear.name !== "Hand Weapon" && selGear.name !== "Filter Mask" && selGear.name !== "Pistol"),
                        defaultKnife,
                        gear,
                    ]);
                } else {
                    setSelectedGear([...selectedGear.filter((selGear) => selGear.type !== gear.type), gear]);
                }
                return;
            }
            if ((gear.type === "Weapon" && gear.maxRange === "Melee")) {
                setSelectedGear([
                    ...selectedGear.filter((selGear) => selGear.maxRange !== "Melee"),
                    gear,
                ]);
                return;
            }
            setSelectedGear([...selectedGear, gear]);
        }
    };

    return <React.Fragment>
        <CustomStatsHeader character={crewMember} gearSlots={selectedGear.reduce((acc, gearItem) => acc + gearItem.gearSlots, 0)} />
        <div className="single-selection-gear">
            <div className="modal-header">Armour</div>
            <GearDropDown2
                dropdownOptions={{
                    id: "Armour",
                    placeholder: getSelectedArmour() || defaultArmour,
                }}
                list={armourList}
                callbackFn={(entry) => onClickHandler(getGearDetails(entry))}
            />
        </div>
        <div className="single-selection-gear">
            <div className="modal-header">Melee Weapons</div>
            <GearDropDown2
                dropdownOptions={{
                    id: "Melee",
                    placeholder: getSelectedMelee() || defaultKnife,
                }}
                list={meleeWeaponsList}
                callbackFn={(entry) => onClickHandler(getGearDetails(entry))}
            />
        </div>
        <div className="modal-header">Equipment</div>
        <div>
            {equipmentList.map((equi) =>
                <div className="single-selection-gear">
                    <div className={getCSSClasses(equi)} onClick={() => onClickHandler(equi)}>
                        <div className="emphasized">{`${equi.name} ( ${isGearSelected(equi.name) ? (selectedGear.find((item) => item.name === equi.name) as ModifiedGear).gearSlots : equi.gearSlots} )`}</div>
                        <div className="medium-text">{equi.notes}</div>
                    </div>
                </div>)}
        </div>
        <div className="modal-header">Shooting Weapons</div>
        <div>
            {shootingWeaponsList.map((weapon) =>
                <div className="single-selection-gear">
                    <div className={getCSSClasses(weapon, true)} onClick={() => onClickHandler(weapon)}>
                        <div className="emphasized">{`${weapon.name} ( ${isGearSelected(weapon.name) ? (selectedGear.find((item) => item.name === weapon.name) as ModifiedGear).gearSlots : weapon.gearSlots} )`}</div>
                        <div className="medium-text">{`Range: ${weapon.maxRange}`} / {`${getDamageModifierString(weapon)} dmg`}</div>
                        {weapon.notes ? <div className="medium-text">{getActualNotes(selectedGear, weapon)}</div> : null}
                    </div>
                </div>)}
        </div>
        <button
            onClick={() => {
                if (equipment && !isGearSelected(equipment.name)) {
                    dispatch({ type: ADD_LOOT, payload: { name: equipment.name, type: getLootCategory(equipment) } });
                }
                const nonStandardGear = crewMember.gear.filter((gear) => !isGeneralGear(gear.name));
                for (const specialGear of nonStandardGear) {
                    if (!isGearSelected(specialGear.name)) {
                        dispatch({ type: ADD_LOOT, payload: { name: specialGear.name, type: getLootCategory(getGearDetails(specialGear) as AlienArtefact | AdvancedTech | AdvancedWeapons) } });
                    }
                }

                dispatch({ type: crewMember.type === CharactersEnum.Captain ? SET_CAPTAINS_GEAR : SET_FIRSTMATE_GEAR, payload: selectedGear.map((g) => ({ name: g.name, gearSlots: g.gearSlots })).sort((a, b) => (a.name.localeCompare(b.name))) });
                history.goBack();
            }}
            className={isTooMuchGear() ? "dialog-btn confirm-btn disabled" : "dialog-btn confirm-btn"}
        >{`${"Confirm"}`}</button>
        <CustomBackButtonComponent dispatchFunction={() => equipment ? dispatch({ type: ADD_LOOT, payload: { name: equipment.name, type: getLootCategory(equipment) } }) : undefined} />
    </React.Fragment>;
};
