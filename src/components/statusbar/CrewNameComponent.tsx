import { useDispatch } from "react-redux";
import { store } from "../..";
import { SET_CREWNAME } from "../../redux/actions";
import { NameComponent } from "../NameComponent";

export const CrewNameComponent = () => {
    const state = store.getState();
    const dispatch = useDispatch();
    const setCrewName = (name: string) => {
        dispatch({ type: SET_CREWNAME, payload: name });
    };

    return <NameComponent inputCallback={setCrewName} currentStateValue={state.Title} />;
};
