import * as GearItems from "./data/Gear.json";
import { AdvancedTech, AdvancedWeapons, AlienArtefact, Armour, Equipment, Gear, ModifiedGear, NormalGear, SpecialGear, Weapon } from "./types";

const generalGear: NormalGear[] = GearItems.general;
const specialGear: SpecialGear[] = [...GearItems.advancedWeapons, ...GearItems.advancedTech, ...GearItems.alienTech];
const advancedWeapons: AdvancedWeapons[] = GearItems.advancedWeapons;
const advancedTech: AdvancedTech[] = GearItems.advancedTech;
const alienArtefacts: AlienArtefact[] = GearItems.alienTech;
const allEquipment: Array<NormalGear | AdvancedWeapons | AdvancedTech | AlienArtefact> = [...generalGear, ...specialGear];

export const getAdvancedWeapons = () => advancedWeapons;
export const getAdvancedTech = () => advancedTech;
export const getAlienArtefacts = () => alienArtefacts;

export const isWeapon = (someGear: NormalGear): someGear is Weapon => (someGear as Weapon).maxRange !== undefined;
export const isAdvancedTech = (tech: SpecialGear): tech is AdvancedTech => (tech as AdvancedTech).list !== undefined;
export const isAdvancedWeapon = (weapon: SpecialGear): weapon is AdvancedWeapons => (weapon as AdvancedWeapons).maxRange !== undefined;
export const isAlienArtefact = (artefact: SpecialGear): artefact is AlienArtefact => (artefact as AdvancedTech).list === undefined && (artefact as AdvancedWeapons).maxRange === undefined;
export const isSpecialWeapon = (gear: Gear | AdvancedWeapons): gear is AdvancedWeapons => (gear as AdvancedWeapons).sell !== undefined;
export const isGeneralGear = (gearName: string) => !!generalGear.find((gear) => gear.name === gearName);
export const isSpecialGear = (gearName: string) => !!specialGear.find((gear) => gear.name === gearName);

export const getNormalWeapons = () => generalGear.filter((gear) => gear.type === "Weapon") as Weapon[];
export const getNormalRangedWeapons = () => (generalGear.filter((gear) => gear.type === "Weapon") as Weapon[]).filter((weapon) => weapon.maxRange !== "Melee");
export const getNormalMeleeWeapons = () => (generalGear.filter((gear) => gear.type === "Weapon") as Weapon[]).filter((weapon) => weapon.maxRange === "Melee");
export const getNormalArmour = () => generalGear.filter((gear) => gear.type === "Armour") as Armour[];
export const getNormalEquipment = () => generalGear.filter((gear) => gear.type === "Equipment") as Equipment[];

export const getNormalGearDetails = (gearName: string | ModifiedGear) => {
    const foundGear = generalGear.find((gear) => (typeof (gearName) === "string" ? gearName : gearName.name) === gear.name) as NormalGear;
    if (typeof (gearName) !== "string") {
        foundGear.gearSlots = gearName.gearSlots;
    }
    return foundGear;
};

export const getGearDetails = (gearName: string | ModifiedGear) => {
    const foundGear = allEquipment.find((gear) => (typeof (gearName) === "string" ? gearName : gearName.name) === gear.name) as Gear;
    if (typeof (gearName) !== "string") {
        foundGear.gearSlots = gearName.gearSlots;
    }
    return foundGear;
};

export const getGeneralGearByType = (gearType: string) => {
    switch (gearType) {
        case "Armour": return generalGear.filter((gear) => gear.type === "Armour");
        case "Weapon": return generalGear.filter((gear) => gear.type === "Weapon");
        case "Equipment": return generalGear.filter((gear) => gear.type === "Equipment");
    }
    return [];
};

export const getGearByType = (gearType: string) => {
    switch (gearType) {
        case "Armour": return allEquipment.filter((gear) => gear.type === "Armour");
        case "Weapon": return allEquipment.filter((gear) => gear.type === "Weapon");
        case "Equipment": return allEquipment.filter((gear) => gear.type === "Equipment");
    }
    return [];
};

export const getShotgun = () => getNormalWeapons().filter((g) => g.name === "Shotgun")[0];
export const getCarbine = () => getNormalWeapons().filter((g) => g.name === "Carbine")[0];
export const getWeaponByName = (weaponName: string) => getNormalWeapons().filter((g) => g.name === weaponName)[0];
