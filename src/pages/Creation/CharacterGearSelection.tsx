import React, { useContext, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CustomBackButtonComponent } from "../../components/common/CustomBackButton";
import { FlexContainer } from "../../components/Containers";
import { GearDropDown } from "../../components/dropdowns/GearDropdown";
import { CharacterStatsHeader } from "../../components/statusbar/CharacterStatsHeader";
import { getNormalArmour, getNormalEquipment, getNormalGearDetails, getNormalMeleeWeapons, getNormalRangedWeapons, isWeapon } from "../../GearUtils";
import { SET_CAPTAINS_GEAR, SET_CAPTAINS_POWERS, SET_FIRSTMATE_GEAR } from "../../redux/actions";
import { CharactersEnum, CrewState, ModifiedGear, Weapon } from "../../types";
import { getActualNotes, getDamageModifierString } from "../../Utils";

export const CharacterSelectGearPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const history = useHistory();
    const dispatch = useDispatch();
    const characterType = history.location.state as CharactersEnum;
    const character = characterType === CharactersEnum.Captain ? state.Captain : state.FirstMate;
    const defaultKnife = getNormalGearDetails("Knife");
    const defaultArmour = getNormalGearDetails("No Armour");
    const [selectedGear, setSelectedGear] = useState<ModifiedGear[]>([defaultKnife, defaultArmour]);
    const isGearSelected = (gear: string) => !!selectedGear.find((gr) => gr.name === gear);
    const maxGear = () => selectedGear.reduce((acc, gear) => acc + gear.gearSlots, 0) >= (character.gearSlots);

    const getSelectedArmour = () => getNormalArmour().find((armour) => isGearSelected(armour.name));
    const getSelectedMelee = () => getNormalMeleeWeapons().find((melee) => isGearSelected(melee.name));
    const getCSSClasses = (name: string, withMax?: boolean) => isGearSelected(name) ? "gear-selection selected" : itemTooLarge(name) || (withMax && maxGear()) ? "gear-selection disabled" : "gear-selection";
    const itemTooLarge = (gearName: string) => selectedGear.reduce((acc, gearItem) => acc + gearItem.gearSlots, 0) + getNormalGearDetails(gearName).gearSlots > (character.gearSlots);
    const onClickHandler = (gearName: string) => {
        if (isGearSelected(gearName)) {
            if (gearName === "Combat Armour") {
                setSelectedGear([...selectedGear.filter((gear) => gear.name !== gearName && gear.name !== "Hand Weapon" && gear.name !== "Filter Mask" && gear.name !== "Pistol"), defaultKnife]);
                return;
            }
            setSelectedGear(selectedGear.filter((gear) => gear.name !== gearName));
        } else {
            const gearDetails = getNormalGearDetails(gearName);
            if (itemTooLarge(gearName) || (gearDetails.type === "Weapon" && maxGear())) {
                return;
            }
            if (gearDetails.type === "Armour") {
                if (gearDetails.name === "Combat Armour") {
                    setSelectedGear(
                        [
                            ...selectedGear.filter((selGear) => getNormalGearDetails(selGear.name).type !== "Armour").filter((selGear) => (getNormalGearDetails(selGear.name) as Weapon).maxRange !== "Melee"),
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
                    setSelectedGear([...selectedGear.filter((selGear) => getNormalGearDetails(selGear.name).type !== gearDetails.type), { name: gearName, gearSlots: gearDetails.gearSlots }]);
                }
                return;
            }
            if ((isWeapon(gearDetails) && gearDetails.maxRange === "Melee")) {
                setSelectedGear([
                    ...selectedGear.filter((selGear) => (getNormalGearDetails(selGear.name) as Weapon).maxRange !== "Melee"),
                    { name: gearName, gearSlots: gearDetails.gearSlots },
                ]);
                return;
            }
            setSelectedGear([...selectedGear, { name: gearName, gearSlots: gearDetails.gearSlots }]);
        }
    };

    return <React.Fragment>
        <CharacterStatsHeader characterType={characterType} gearSlots={selectedGear.reduce((acc, gearItem) => acc + gearItem.gearSlots, 0)} />
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="single-selection-gear">
                <div className="modal-header">Armour</div>
                <GearDropDown
                    dropdownOptions={{
                        id: "Armour",
                        placeholder: getSelectedArmour() || defaultArmour,
                    }}
                    list={getNormalArmour()}
                    callbackFn={onClickHandler}
                />
            </div>
            <div className="single-selection-gear">
                <div className="modal-header">Melee Weapons</div>
                <GearDropDown
                    dropdownOptions={{
                        id: "Melee",
                        placeholder: getSelectedMelee() || defaultKnife,
                    }}
                    list={getNormalMeleeWeapons()}
                    callbackFn={onClickHandler}
                />
            </div>
        </div>

        <div className="modal-header">Equipment</div>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {getNormalEquipment().map((equi) =>
                <div className="single-selection-gear">
                    <div className={getCSSClasses(equi.name)} onClick={() => onClickHandler(equi.name)}>
                        <FlexContainer firstItem={equi.name} secondItem={`(${isGearSelected(equi.name) ? (selectedGear.find((item) => item.name === equi.name) as ModifiedGear).gearSlots : equi.gearSlots})`} />
                        <div className="medium-text">{equi.notes}</div>
                    </div>
                </div>)}
        </div>
        <div className="modal-header">Shooting Weapons</div>
        {/* {getGearByType("Weapon")?.filter((weapon) => weapon.maxRange !== "Melee").sort((a, b) => gearSortAlgorithm(a) - gearSortAlgorithm(b)).map((weapon) => */}
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {getNormalRangedWeapons().map((weapon) =>
                <div className="single-selection-gear">
                    <div className={getCSSClasses(weapon.name, true)} onClick={() => onClickHandler(weapon.name)}>
                        <FlexContainer firstItem={weapon.name} secondItem={`(${isGearSelected(weapon.name) ? (selectedGear.find((item) => item.name === weapon.name) as ModifiedGear).gearSlots : weapon.gearSlots})`} />
                        <div className="medium-text">{`Range: ${weapon.maxRange}`} / {`${getDamageModifierString(weapon)} dmg`}</div>
                        {weapon.notes ? <div className="medium-text">{getActualNotes(selectedGear, weapon)}</div> : null}
                    </div>
                </div>)}
        </div>
        <button
            onClick={() => {
                dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_GEAR : SET_FIRSTMATE_GEAR, payload: selectedGear.sort((a, b) => (a.name.localeCompare(b.name))) });
                history.push(characterType === CharactersEnum.Captain ? "/CharacterName" : "/SoldierSelection", CharactersEnum.FirstMate);
            }}
            className={"page-btn selected"}
        >{`${"Confirm"}`}</button>
        <CustomBackButtonComponent
            dispatchFunction={() => dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_POWERS : SET_CAPTAINS_POWERS, payload: [] })}
            customHistory={() => history.push("/CharacterPowerSelection", characterType)}
        />
    </React.Fragment>;
};
