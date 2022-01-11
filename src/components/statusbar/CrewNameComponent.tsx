import { useDispatch } from "react-redux";
import { store } from "../..";
import { LeaveIcon, StarshipIcon } from "../../images";
import { SET_CREWNAME } from "../../redux/actions";
import { NameComponent } from "../NameComponent";

export const CrewNameComponent = () => {
    const state = store.getState();
    const dispatch = useDispatch();
    const setCrewName = (name: string) => {
        dispatch({ type: SET_CREWNAME, payload: name });
    };

    return <div style={{ display: "inline-flex" }}>
        <img className="starship-icon" src={StarshipIcon}></img>
        <div>
            <NameComponent inputCallback={setCrewName} currentStateValue={state.Title} tooltip="Your ship needs a name" />
        </div>
        <img className="leave-icon" src={LeaveIcon}></img>
    </div>;
};
