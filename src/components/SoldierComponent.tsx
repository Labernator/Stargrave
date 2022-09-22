import { useHistory } from "react-router-dom";
import { isSpecialGear } from "../GearUtils";
import { Soldier } from "../types";
import { CharacterStatusBarTable } from "./CharacterStatusBarTable";
import { SoldierTileGearAndPowers } from "./CharacterTileGearAndPowers";
import { SoldierTileHeader } from "./CharacterTileHeader";

export const SoldierComponent = ({ soldier }: { soldier: Soldier }) => {
    const history = useHistory();
    return <div key={`${soldier.type}_tile`} className={"character-tile"} onClick={() => history.push("/SoldierEquipment", { crewMember: soldier })}>
        <SoldierTileHeader soldier={soldier} />
        <CharacterStatusBarTable character={soldier} gearSlotsUsed={soldier.gear.some(isSpecialGear) ? 1 : 0} isTileTable={true} />
        <SoldierTileGearAndPowers soldier={soldier} />
    </div>;
};
