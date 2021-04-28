import React from "react";
import { useDispatch } from "react-redux";
import { store } from "../..";
import { SET_CREWNAME } from "../../redux/actions";
import { InputComponent } from "../InputControl";

export const CrewNameComponent = () => {
    const state = store.getState();
    const dispatch = useDispatch();
    const openHistory = () => {
        console.error("TreasuryHistory - Implementation missing");
    };

    const setCrewName = (name: string) => {
        dispatch({ type: SET_CREWNAME, payload: name });
    };

    return <div className="statusbar-tiles" style={{ minWidth: "14rem" }}>
        <div className="toolbar-two-column-header-text small-text" onClick={openHistory}>Crew Name</div>
        <InputComponent callback={setCrewName} currentState={state.Title} tooltip="Your crew needs a name" cssClass="input-field" />
    </div>;
};
