import { CSSProperties } from "react";
import { CrewIcon } from "../../images";
import { numberOfCrewMembers } from "../../Utils";

export const CrewSizeComponent = ({ externalStyles, virtualCrewSize }: { externalStyles?: CSSProperties; virtualCrewSize?: number }) => {

    const openHireMenu = () => {
        console.error("HireMenu - Implementation missing");
    };

    return <div style={externalStyles} className="statusbar-tiles" title={"Current size of your crew"}>
        <img
            src={CrewIcon}
            className={"toolbar-compact-icon"}
            id={"CrewIcon"}
            alt={"CrewIcon"}>
        </img>
        <div className={"toolbar-compact-text"}>{virtualCrewSize || numberOfCrewMembers()} / 10</div>
    </div>;
};
