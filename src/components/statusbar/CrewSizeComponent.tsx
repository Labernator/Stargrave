import { CrewIcon } from "../../images";
import { numberOfCrewMembers } from "../../Utils";

export const CrewSizeComponent = ({ compactView }: { compactView?: boolean }) => {

    const openHireMenu = () => {
        console.error("HireMenu - Implementation missing");
    };

    return <div className="statusbar-tiles" title={"Current size of your crew"}>
        {compactView ? null : <div className="toolbar-two-column-header-text small-text" onClick={openHireMenu}>Crew Size</div>}
        <img
            src={CrewIcon}
            className={compactView ? "toolbar-compact-icon" : "toolbar-icon"}
            id={"CrewIcon"}
            alt={"CrewIcon"}>
        </img>
        <div className={compactView ? "toolbar-compact-text" : "toolbar-text"}>{numberOfCrewMembers()} / 10</div>
    </div>;
};
