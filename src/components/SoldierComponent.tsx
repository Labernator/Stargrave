import { Soldier } from "../types/Characters";
import { SoldierStatusBarTable } from "./CharacterStatusBarTable";
import { SoldierTileGearAndPowers } from "./CharacterTileGearAndPowers";
import { SoldierTileHeader } from "./CharacterTileHeader";

export const SoldierComponent = ({ soldier }: { soldier: Soldier }) =>
    <div key={`${soldier.type}_tile`} className="character-tile">
        <SoldierTileHeader soldier={soldier} />
        <SoldierStatusBarTable soldier={soldier} gearSlotsUsed={0} isTileTable={true} />
        <SoldierTileGearAndPowers soldier={soldier} />
    </div>;
