import React from "react";
import { Character } from "../../types";
import { isCaptain } from "../../Utils";
import { CharacterStatusBarTable } from "../CharacterStatusBarTable";
import { CharacterTileGearAndPowers } from "../CharacterTileGearAndPowers";
import { CharacterTileHeader } from "../CharacterTileHeader";

export const CharacterOverview = (
    { character, finish }:
        { character: Character; finish(): void }
) => <React.Fragment>
        <div className="chapter-header">
            {`Are you satisfied with your ${isCaptain(character.type) ? "Captain" : "First Mate"}?`}
        </div>
        <div key={`${character.type}_tile`} className="character-tile">
            <CharacterTileHeader character={character} />
            <CharacterStatusBarTable character={character} gearSlotsUsed={character.gear?.reduce((acc, gearItem) => acc + gearItem.gearSlots, 0) || 0} isTileTable={true} />
            <CharacterTileGearAndPowers character={character} />
        </div>
        <div className="chapter-header">
            {`Press confirm to continue with ${isCaptain(character.type) ? "creating your First Mate" : "hiring the rest of your crew"}`}
        </div>
        <button
            onClick={finish}
            className={"dialog-btn confirm-btn"}
        >{`${"Confirm"}`}</button>
    </React.Fragment>;
