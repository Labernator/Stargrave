import React, { useContext, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CustomBackButtonComponent } from "../../components/common/CustomBackButton";
import { NameComponent } from "../../components/NameComponent";
import { CharacterStatsHeader } from "../../components/statusbar/CharacterStatsHeader";
import { SET_CAPTAINS_NAME, SET_FIRSTMATE_NAME, SET_SHIPNAME } from "../../redux/actions";
import { CharactersEnum, CrewState } from "../../types";
export const CharacterNamePage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const history = useHistory();
    const dispatch = useDispatch();
    const characterType = history.location.state as CharactersEnum;
    const [name, setName] = useState<string>(characterType === CharactersEnum.Captain ? state.Captain.name : state.FirstMate.name);

    return <React.Fragment>
        <CharacterStatsHeader characterType={characterType} />
        <div className="modal-header">
            {`This is your ${characterType} base stat line. \n\nIn the following screens you will be able to select a background, improve some stats, select powers and equip your ${characterType} with some useful gear.`}
        </div>
        <div className="modal-header">{`But first of all, your ${characterType} needs a name:`}</div>
        <NameComponent inputCallback={setName} currentStateValue={name} tooltip={`${characterType}'s name`} />
        <button
            onClick={() => {
                if (name) {
                    dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_NAME : SET_FIRSTMATE_NAME, payload: name });
                    history.push("/CharacterBackground", characterType);
                }
            }}
            className={name ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
        >Confirm</button>
        <CustomBackButtonComponent dispatchFunction={() => dispatch({ type: SET_SHIPNAME, payload: "" })} />
    </React.Fragment>;
};
