import { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { TreasuryIcon } from "../../images";
import { CrewState } from "../../types/State";

export const TreasuryComponent = ({ compactView }: { compactView?: boolean }) => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    return <GenericTreasuryComponent treasury={state.Credits} text="Treasury" title="Current amount of credits in your treasury" compactView={compactView} />;
};

export const GenericTreasuryComponent = ({ treasury, title, text, compactView }: { treasury: number; title: string; text: string; compactView?: boolean }) => {

    const openHistory = () => {
        console.error("TreasuryHistory - Implementation missing");
    };

    return <div className="statusbar-tiles" title={title}>
        {compactView ? null : <div className="toolbar-two-column-header-text small-text" onClick={openHistory}>{text}</div>}
        <img
            src={TreasuryIcon}
            className={compactView ? "toolbar-compact-icon" : "toolbar-icon"}
            id={"TreasuryIcon"}
            alt={"TreasuryIcon"}>
        </img>
        <div className={compactView ? "toolbar-compact-text" : "toolbar-text"}>
            {`${treasury} \xA5`}
        </div>
    </div>;
};
