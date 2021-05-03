import { store } from "..";
import { Character } from "../types/Characters";
import { getGearDetails } from "../Utils";
import { GearLabels } from "./GearLabels";
import { PowerLabels } from "./PowerLabels";
import { StatusBarTable } from "./StatusBarTable";

export const CharacterComponent = ({ isCaptain }: { isCaptain: boolean }) => {
    const state = store.getState();
    const character = (isCaptain ? state.Captain : state.FirstMate) as Character;
    const id = isCaptain ? "captain" : "firstmate";
    return <div key={`${id}_tile`} className="character-tile">
        <StatusBarTable character={character} statModifications={{}} gearSlotsUsed={character.gear?.reduce((acc, gearItem) => acc + getGearDetails(gearItem).gearSlots, 0) || 0} showNameAndType={true} />
        <div style={{ float: "left", width: "33%" }}>
            <div className="modal-header" style={{ padding: "0.2rem" }}>Powers</div>
            <PowerLabels powers={character.background?.powers} isCaptain={isCaptain} />
        </div>
        <div style={{ float: "left", width: "65%" }}>
            <div className="modal-header" style={{ padding: "0.2rem" }}>Gear</div>
            <GearLabels gearList={character.gear} />
        </div>
    </div>;
};
