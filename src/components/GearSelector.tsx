import { Weapon } from "../types";
import { getDamageModifierString } from "../Utils";

export const GearSelector = ({ weapon, isSelected, clickHandler }: { weapon: Weapon; isSelected: boolean; clickHandler(): void }) =>
    <div className={isSelected ? "gear-selection selected" : "gear-selection"} onClick={clickHandler}>
        <div className="emphasized">{`${weapon.name} (${weapon.gearSlots})`}</div>
        <div className="medium-text">{`Range: ${weapon.maxRange}`} / {`${getDamageModifierString(weapon)} dmg`}</div>
        {weapon.notes ? <div className="medium-text">{weapon.notes}</div> : null}
    </div>;
