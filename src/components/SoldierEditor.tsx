import React from "react";
import { getCarbine, getShotgun, getWeaponByName } from "../GearUtils";
import { AdvancedWeapons, Soldier, Weapon } from "../types";
import { GearSelector } from "./GearSelector";
import { SoldierComponent } from "./SoldierComponent";
interface WeaponSelection {
    weapon: Weapon;
    isSelected: boolean;
}
export const SoldierEditor = ({ previewSoldier, specialWeapon, callback }: { previewSoldier: Soldier; specialWeapon?: AdvancedWeapons; callback(gear: string[]): void }) => {

    const gear = previewSoldier.gear;
    const removeDuplicateObjects = (arr: WeaponSelection[]) => arr.filter((w, pos, self) => self.findIndex((item) => item.weapon.name === w.weapon.name) === pos);
    const removeDuplicateStrings = (arr: string[]) => arr.filter((w, pos, self) => self.findIndex((item) => item === w) === pos);
    let selectableWeapons: WeaponSelection[] = [];
    if (specialWeapon && specialWeapon.equivalent) {
        const isSpecialWeaponSelected = !!gear.find((g) => g === specialWeapon.name);
        if (specialWeapon.equivalent === "Shotgun" || specialWeapon.equivalent === "Carbine") {
            selectableWeapons.push({ weapon: getShotgun(), isSelected: !!gear.find((g) => g === "Shotgun") });
            selectableWeapons.push({ weapon: getCarbine(), isSelected: !!gear.find((g) => g === "Carbine") });
        } else {
            selectableWeapons.push({ weapon: getWeaponByName(specialWeapon.equivalent), isSelected: !!gear.find((g) => g === specialWeapon.equivalent) });
        }
        selectableWeapons.push({ weapon: specialWeapon, isSelected: isSpecialWeaponSelected });
    }
    if (gear.find((g) => g === "Shotgun")) {
        selectableWeapons.push({ weapon: getShotgun(), isSelected: true });
        selectableWeapons.push({ weapon: getCarbine(), isSelected: false });
    }
    if (gear.find((g) => g === "Carbine")) {
        selectableWeapons.push({ weapon: getShotgun(), isSelected: false });
        selectableWeapons.push({ weapon: getCarbine(), isSelected: true });
    }
    selectableWeapons = removeDuplicateObjects(selectableWeapons);
    const cleanupGear = (newSelect: string) => {
        const newSelectIsShotgun = newSelect === "Shotgun";
        const newSelectIsCarbine = newSelect === "Carbine";
        if (newSelectIsShotgun || newSelectIsCarbine) {
            if (specialWeapon?.equivalent === "Shotgun" || specialWeapon?.equivalent === "Carbine") {
                callback(removeDuplicateStrings([...gear.filter((g) => g !== specialWeapon?.name && (newSelectIsShotgun ? g !== "Carbine" : g !== "Shotgun")), newSelect]));
                return;
            }
            callback(removeDuplicateStrings([...gear.filter((g) => newSelectIsShotgun ? g !== "Carbine" : g !== "Shotgun"), newSelect]));
            return;
        }
        if (newSelect === specialWeapon?.equivalent) {
            callback(removeDuplicateStrings([...gear.filter((g) => g !== specialWeapon?.name), newSelect]));
            return;
        }
        if (newSelect === specialWeapon?.name) {
            if (specialWeapon?.equivalent === "Shotgun" || specialWeapon?.equivalent === "Carbine") {
                callback(removeDuplicateStrings([...gear.filter((g) => g !== "Carbine" && g !== "Shotgun"), newSelect]));
            } else {
                callback(removeDuplicateStrings([...gear.filter((g) => g !== specialWeapon?.equivalent), newSelect]));
            }
            return;
        }
    };
    return <div className="flex-container" style={{ clear: "both" }}>

        {selectableWeapons.length > 0 ?
            <React.Fragment> <div className="modal-header">You may select which gear the new crew member should take </div>
                {selectableWeapons.map((weapon) => <GearSelector weapon={weapon.weapon} isSelected={weapon.isSelected} clickHandler={() => cleanupGear(weapon.weapon.name)} />)}
            </React.Fragment> : undefined}
        <div className="modal-header">Soldier Preview</div>
        <SoldierComponent soldier={{ ...previewSoldier, gearSlots: 1, gear }} />
    </div>;
};
