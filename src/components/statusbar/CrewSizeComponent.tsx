import { CSSProperties } from "react";
import { useHistory } from "react-router-dom";
import { CrewIcon } from "../../images";
import { numberOfCrewMembers } from "../../Utils";

export const CrewSizeComponent = ({ externalStyles, virtualCrewSize }: { externalStyles?: CSSProperties; virtualCrewSize?: number }) => {
    const history = useHistory();
    return <div
        style={externalStyles}
        onClick={() => history.push("/SoldierSelection")}
        className="statusbar-component"
        title={"Current size of your crew"}>
        <img
            src={CrewIcon}
            className={"toolbar-compact-icon"}
            id={"CrewIcon"}
            alt={"CrewIcon"}>
        </img>
        <div className={"toolbar-compact-text"}>{virtualCrewSize || numberOfCrewMembers()}/7</div>
    </div>;
};
