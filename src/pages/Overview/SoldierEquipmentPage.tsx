import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { PageBackBtnComponent } from "../../components/common/BackButton";
import { SoldierEditor } from "../../components/SoldierEditor";
import { getGearDetails, isSpecialWeapon } from "../../GearUtils";
import { ADD_LOOT, MODIFY_SOLDIER } from "../../redux/actions";
import { AdvancedWeapons, LootCategories, Soldier } from "../../types";

interface EquipmentState {
    crewMember: Soldier;
    equipment: AdvancedWeapons | undefined;
}
export const SoldierEquipmentPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { crewMember, equipment } = history.location.state as EquipmentState;
    const [gear, setGear] = useState<string[]>(crewMember.gear);
    return <div className="flex-container">
        <SoldierEditor previewSoldier={{ ...crewMember, name: crewMember.name, gearSlots: 1, gear }} specialWeapon={equipment || crewMember.gear.map(getGearDetails).find(isSpecialWeapon)} callback={setGear} />
        <div className="page-btn selected" onClick={() => {
            if (!gear.find((g) => g === equipment?.name)) {
                dispatch({ type: ADD_LOOT, payload: { name: equipment?.name, type: LootCategories.AdvancedWeapons } });
            }
            const specialWeapon = crewMember.gear.map(getGearDetails).find(isSpecialWeapon);
            if (specialWeapon && !gear.find((g) => g === specialWeapon.name)) {
                dispatch({ type: ADD_LOOT, payload: { name: specialWeapon.name, type: LootCategories.AdvancedWeapons } });
            }
            dispatch({ type: MODIFY_SOLDIER, payload: { ...crewMember, gear } });
            history.goBack();
        }
        }>{"Confirm current equipment"}</div>
        {/*TODO: put equi back to bay*/}
        <PageBackBtnComponent />
    </div>;
};
// export const SoldierEquipmentPage = () => {
//     const history = useHistory();
//     const dispatch = useDispatch();
//     const { crewMember, equipment } = history.location.state as EquipmentState;
//     const gearList = [...crewMember.gear];
//     const customList: string[] = [];
//     for (const stuff of gearList) {
//         customList.push(stuff);
//         if (!isGeneralGear(stuff)) {
//             const gearDetails = getGearDetails(stuff) as SpecialGear;
//             if ((isAdvancedTech(gearDetails) || isAdvancedWeapon(gearDetails)) && gearDetails.equivalent) {
//                 customList.push(gearDetails.equivalent);
//             }
//         } else {
//             if (stuff === "Carbine") {
//                 customList.push("Shotgun");
//             }
//             if (stuff === "Shotgun") {
//                 customList.push("Carbine");
//             }
//         }
//     }
//     if (equipment) {
//         customList.push(equipment.name);
//     }
//     const initialGearState: Gear[] = crewMember.gear.map(getGearDetails);
//     const [selectedGear, setSelectedGear] = useState<Gear[]>(initialGearState);
//     const isGearSelected = (gear: string) => !!selectedGear.find((gr) => gr.name === gear);

//     const WeaponLabel = ({ weapon }: { weapon: Gear }) =>
//         <div
//             className={isGearSelected(weapon.name) ? "soldier-gear selected" : "soldier-gear"}
//             onClick={() => {
//                 const sel = isGearSelected(weapon.name);
//                 if (!sel) {
//                     if (isSpecialWeapon(weapon)) {
//                         const equiSel = selectedGear.find((gear) => gear.name === weapon.equivalent);
//                         if (equiSel) {
//                             setSelectedGear([...selectedGear.filter((gear) => gear.name !== weapon.equivalent), weapon]);
//                         }
//                     }
//                 }
//             }}>
//             <div className="emphasized">{`${weapon.name} ( ${isGearSelected(weapon.name) ? (selectedGear.find((item) => item.name === weapon.name) as ModifiedGear).gearSlots : weapon.gearSlots} )`}</div>
//             <div className="medium-text">{weapon.maxRange === "Melee" || weapon.maxRange === "Template" ? weapon.maxRange : `Range: ${weapon.maxRange}`} / {`${getDamageModifierString(weapon)} dmg`}</div >
//             {weapon.notes ? <div className="medium-text">{getActualNotes(selectedGear, weapon)}</div> : null}
//         </div>;

//     const ArmourLabel = ({ armour }: { armour: Gear }) => <div className={isGearSelected(armour.name) ? "soldier-gear selected" : "soldier-gear"} onClick={() => undefined}>
//         <div className="emphasized">{`${armour.name} ( ${isGearSelected(armour.name) ? (selectedGear.find((item) => item.name === armour.name) as ModifiedGear).gearSlots : armour.gearSlots} )`}</div>
//         <div className="medium-text">{`+${armour.armourModifier || 0} Armour ${getActualNotes(selectedGear, armour) ? "/" : ""} ${getActualNotes(selectedGear, armour)}`}</div>
//         {armour.notes ? <div className="medium-text">{getActualNotes(selectedGear, armour)}</div> : null}
//     </div>;

//     const EquipmentLabel = ({ equi }: { equi: Gear }) => <div className={isGearSelected(equi.name) ? "soldier-gear selected" : "soldier-gear"} onClick={() => undefined}>
//         <div className="emphasized">{`${equi.name} ( ${isGearSelected(equi.name) ? (selectedGear.find((item) => item.name === equi.name) as ModifiedGear).gearSlots : equi.gearSlots} )`}</div>
//         {<div className="medium-text">{getActualNotes(selectedGear, equi)}</div>}
//     </div>;
//     return <React.Fragment>
//         <CustomStatsHeader character={crewMember} gearSlots={selectedGear.filter((gear) => !isGeneralGear(gear.name)).length} />
//         <div style={{ display: "flex", clear: "both", flexDirection: "column" }}>
//             {customList.map(getGearDetails).map((gear) => gear.type === "Weapon" ? <WeaponLabel weapon={gear} /> : gear.type === "Armour" ? <ArmourLabel armour={gear} /> : <EquipmentLabel equi={gear} />
//             )}
//         </div>
//         <button
//             onClick={() => {
//                 if (equipment && !isGearSelected(equipment.name)) {
//                     dispatch({ type: ADD_LOOT, payload: { name: equipment.name, type: getLootCategory(equipment) } });
//                 }
//                 dispatch({ type: MODIFY_SOLDIER, payload: { ...crewMember, gear: selectedGear.sort((a, b) => (a.name.localeCompare(b.name))).map((selGear) => selGear.name) } });
//                 history.goBack();
//             }}
//             className={"dialog-btn confirm-btn"}
//         >{`${"Confirm"}`}</button>
//         <CustomBackButtonComponent dispatchFunction={() => equipment ? dispatch({ type: ADD_LOOT, payload: { name: equipment.name, type: getLootCategory(equipment) } }) : undefined} />
//     </React.Fragment>;
// };
