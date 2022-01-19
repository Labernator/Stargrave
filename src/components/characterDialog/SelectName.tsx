import React, { useState } from "react";
import { Character } from "../../types";
import { isCaptain } from "../../Utils";
import { NameComponent } from "../NameComponent";

export const SelectName = ({ character, updateAndContinue }: { character: Character; updateAndContinue(value: Character): void }) => {
    const [name, setName] = useState<string>(character.name);
    const characterType = isCaptain(character.type) ? "Captain" : "First Mate";

    return <React.Fragment>
        <div className="modal-header">
            {`This is your ${characterType} base stat line. \n\nIn the following screens you will be able to select a background, improve some stats, select powers and equip your ${characterType} with some useful gear.`}
        </div>
        <div className="modal-header">{`But first of all, your ${characterType} needs a name:`}</div>
        <NameComponent inputCallback={setName} currentStateValue={name} tooltip={`${characterType}'s name`} />
        <button
            onClick={() => name ? updateAndContinue({ ...character, name }) : undefined}
            className={name ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
        >Confirm</button>
    </React.Fragment>;
};
