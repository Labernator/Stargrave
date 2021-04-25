import React, { useState } from "react";
import * as Characters from "../data/Characters.json";
import { AddIcon } from "../images";
import { CharacterMetadata } from "../types/Metadata";
import { CharacterCreationDialog } from "./characterDialog/CharacterCreationWrapper";

const baseCaptain = Characters.Captain as CharacterMetadata;
const baseFirstMate = Characters.FirstMate as CharacterMetadata;
export const AddCharacterComponent = ({ isCaptain }: { isCaptain: boolean }) => {
    const [showDialog, setDialogShown] = useState<boolean>(false);
    return <div key={`${isCaptain ? "captain" : "firstmate"}_tile`} className="add-character-tile" onClick={() => setDialogShown(true)}>
        {showDialog ? <CharacterCreationDialog baseCharacter={isCaptain ? { ...baseCaptain, name: "" } : { ...baseFirstMate, name: "" }} callback={setDialogShown} /> : undefined}
        <div>
            <div style={{ float: "left" }}>
                <img className="background-image add-image" src={AddIcon} alt="addIcon" />
                <div className="background-title add-title">{`Click here to add a ${isCaptain ? "Captain" : "First Mate"} to your crew`}</div>
            </div>
        </div>
    </div>;
};
