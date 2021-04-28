import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ExitIcon } from "../../images";
import { SET_CREW } from "../../redux/actions";
import { InitialCrewState } from "../../types/State";

export const ExitComponent = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    return <div className="statusbar-tiles" onClick={() => {
        dispatch({ type: SET_CREW, payload: InitialCrewState });
        history.push("/");
    }} title="Click to return to main menu">
        <div className="toolbar-two-column-header-text small-text" >Exit</div>
        <img
            src={ExitIcon}
            style={{ gridArea: "2 / 1 / 2 / 2" }}
            className="toolbar-icon"
            id={"ExitIcon"}
            alt={"ExitIcon"}>
        </img>
    </div>;
};
