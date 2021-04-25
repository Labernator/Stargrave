import { CrewIcon } from "../../images";
import { numberOfCrewMembers } from "../../Utils";

export const CrewSizeComponent = () => {

    const openHireMenu = () => {
        console.error("HireMenu - Implementation missing");
    };

    return <div className="statusbar-tiles" title={"Current size of your crew"}>
        <div className="toolbar-two-column-header-text small-text" onClick={openHireMenu}>Crew Size</div>
        <img
            src={CrewIcon}
            className="toolbar-icon"
            id={"CrewIcon"}
            alt={"CrewIcon"}>
        </img>
        <div className="toolbar-text">{numberOfCrewMembers()} / 10</div>
    </div>;
};
