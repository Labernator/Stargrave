import { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { useHistory } from "react-router-dom";
import { PostGameIcon } from "../../images";
import { CrewState } from "../../types";

export const AdvanceComponent = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const history = useHistory();
    return <div className="statusbar-tiles" onClick={() => history.push("/PostGameSequence")} title="Click to open the post game sequence">
        <img
            src={PostGameIcon}
            style={{ paddingLeft: "0.2rem" }}
            className="toolbar-compact-icon"
            id={"PostGameIcon"}
            alt={"Post Game Sequence"}>
        </img>
        <div className={"toolbar-compact-text"}>
            {`${state.Experience}`}
        </div>
    </div>;
};
