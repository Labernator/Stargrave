import { Soldier } from "../types";
import { SoldierStatusBarTable } from "./CharacterStatusBarTable";
import { SoldierTileGearAndPowers } from "./CharacterTileGearAndPowers";
import { SoldierTileHeader } from "./CharacterTileHeader";

export const SoldierComponent = ({ soldier, isPdf }: { soldier: Soldier; isPdf?: boolean }) =>
    <div key={`${soldier.type}_tile`} className={isPdf ? "pdf-soldier-tile" : "character-tile"}>
        <SoldierTileHeader soldier={soldier} />
        <SoldierStatusBarTable soldier={soldier} gearSlotsUsed={0} isTileTable={true} />
        <SoldierTileGearAndPowers soldier={soldier} isPdf={isPdf} />
    </div>;
