import { useContext } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeaveIcon, StarshipIcon } from "../../images";
import { SET_CREW, SET_CREWNAME } from "../../redux/actions";
import { CrewState, InitialCrewState } from "../../types/State";
import { InputComponent } from "../InputComponent";

export const ShipnameComponent = () => {
    const { store } = useContext(ReactReduxContext);
    const dispatch = useDispatch();
    const history = useHistory();
    const state = store.getState() as CrewState;

    return <div className="shipname">
        <img style={{ paddingLeft: "0.6rem" }} className="shipname-icon" src={StarshipIcon}></img>
        <InputComponent
            callback={(name: string) => dispatch({ type: SET_CREWNAME, payload: name })}
            currentState={state.Title}
            tooltip={state.Title} cssClass="input-field" />
        <img
            className="shipname-icon"
            src={LeaveIcon}
            onClick={() => {
                dispatch({ type: SET_CREW, payload: InitialCrewState });
                history.push("/");
            }}></img>
    </div>;
};
