import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ExitIcon } from "../../images";
import { SET_CREW } from "../../redux/actions";
import { InitialCrewState } from "../../types/State";

export const ExitComponent = ({ compactView, clickFn }: { compactView?: boolean; clickFn?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const defaultFn = () => {
        dispatch({ type: SET_CREW, payload: InitialCrewState });
        history.push("/");
    };
    return <div className="statusbar-tiles" style={{ gridArea: 1 }} onClick={(e) => {
        clickFn ? clickFn(e) : defaultFn();
    }} title="Click to return to main menu">
        {compactView ? null : <div className="toolbar-two-column-header-text small-text" >Exit</div>}
        <img
            src={ExitIcon}
            style={compactView ? { gridArea: "1 / 1 / 1 / 2" } : { gridArea: "2 / 1 / 2 / 2" }}
            className={compactView ? "toolbar-compact-icon" : "toolbar-icon"}
            id={"ExitIcon"}
            alt={"ExitIcon"}>
        </img>
    </div>;
};
