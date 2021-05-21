import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_CREWNAME } from "../redux/actions";
import { NameComponent } from "./NameComponent";

export const ShipName = () => {
    const [name, setName] = useState<string>("");
    const dispatch = useDispatch();
    const history = useHistory();
    return <React.Fragment>
        <div className="chapter-header">Welcome to Stargarve - Science Fiction wargames in the ravaged galaxy</div>
        {/* <div className="modal-header">This nifty little tool is supposed to guide you through the process of creating your crew for a game or even a campaign of Stargrave.</div> */}
        <div className="modal-header">
            In the following screens you will design yourself a captain that is leading your crew, configure a loyal first mate to assist your fearless leader and hire disposable bodies (crewmen) to help you to complete your objectives
            </div>
        <div className="modal-header">But first things first. Your crew needs a ship to get to their missions. What is the name of your ship?</div>
        <NameComponent inputCallback={setName} currentStateValue={name} tooltip={"Your ship needs a name"} />
        <button
            onClick={() => {
                dispatch({ type: SET_CREWNAME, payload: name });
                history.push("/CaptainCreation");
            }}
            className={name ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
        >Confirm</button>
    </React.Fragment>;
};
