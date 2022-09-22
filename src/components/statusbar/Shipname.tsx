import { useContext } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeaveIcon, MaintenanceIcon } from "../../images";
import { SET_CREW, SET_SHIPNAME } from "../../redux/actions";
import { CrewState, InitialCrewState } from "../../types";
import { InputComponent } from "../InputComponent";

export const ShipnameComponent = () => {
    const { store } = useContext(ReactReduxContext);
    const dispatch = useDispatch();
    const history = useHistory();
    const state = store.getState() as CrewState;

    return <div className="shipname">
        <img alt="shipname icon" className="shipname-icon" src={MaintenanceIcon} onClick={() => history.push("/Transactions")}></img>
        <InputComponent
            callback={(name: string) => dispatch({ type: SET_SHIPNAME, payload: name })}
            currentState={state.ShipName}
            tooltip={state.ShipName} cssClass="input-field" />
        <img
            alt="leave icon"
            className="shipname-icon"
            src={LeaveIcon}
            onClick={() => {
                dispatch({ type: SET_CREW, payload: InitialCrewState });
                history.push("/");
            }}></img>
    </div>;
};
