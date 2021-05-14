import React, { useState } from "react";
import { Character } from "../../types/Characters";
import { isCaptain } from "../../Utils";
import { NameComponent } from "../NameComponent";

export const SelectName = ({ character, updateAndContinue }: { character: Character; updateAndContinue(value: Character): void }) => {
    const [name, setName] = useState<string>(character.name);
    const characterType = isCaptain(character.type) ? "Captain" : "First Mate";

    return <React.Fragment>
        <div className="modal-header">{`Set a name for your ${characterType}`}</div>
        <NameComponent inputCallback={setName} currentStateValue={name} tooltip={`Your ${characterType} needs a name`} />
        <button
            onClick={() => name ? updateAndContinue({ ...character, name }) : undefined}
            className={name ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
        >Confirm</button>
    </React.Fragment>;
};
