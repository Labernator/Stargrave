import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { PageBackBtnComponent } from "../../components/common/BackButton";
import { NameComponent } from "../../components/NameComponent";
import { SET_SHIPNAME } from "../../redux/actions";
import { CharactersEnum } from "../../types";

export const ShipNamePage = () => {
    const [name, setName] = useState<string>("");
    const dispatch = useDispatch();
    const history = useHistory();
    return <React.Fragment>
        <div className="chapter-header">Welcome to Stargarve - Science Fiction wargames in the ravaged galaxy</div>
        <div className="modal-header">
            In the following screens you will design yourself a captain that is leading your crew, configure a loyal first mate to assist your fearless leader and hire disposable bodies (crewmen) to help you complete your objectives.
            </div>
        <div className="modal-header">But first things first. Your crew needs a ship to get to their missions. What is the name of your ship?</div>
        <NameComponent inputCallback={setName} currentStateValue={name} tooltip={"Your ship needs a name"} />
        <button
            onClick={() => {
                dispatch({ type: SET_SHIPNAME, payload: name });
                history.push("/CharacterName", CharactersEnum.Captain);
            }}
            className={name ? "page-btn selected" : "page-btn disabled"}
        >Confirm</button>
        <PageBackBtnComponent />
    </React.Fragment>;
};
