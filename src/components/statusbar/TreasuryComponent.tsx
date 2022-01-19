import { CSSProperties, useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { TreasuryIcon } from "../../images";
import { CrewState } from "../../types";

export const TreasuryComponent = ({ externalStyles, virtualCredits }: { externalStyles?: CSSProperties; virtualCredits?: number }) => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;

    return <div style={externalStyles} className="statusbar-tiles" title={"Current amount of credits in your treasury"}>
        <img
            src={TreasuryIcon}
            className={"toolbar-compact-icon"}
            id={"TreasuryIcon"}
            alt={"TreasuryIcon"}>
        </img>
        <div className={"toolbar-compact-text"}>
            {`${virtualCredits || state.Credits} \xA5`}
        </div>
    </div>;
};
