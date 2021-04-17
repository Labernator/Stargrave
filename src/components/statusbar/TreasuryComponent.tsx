import React, { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { TreasuryIcon } from "../../images";
import { CrewState } from "../../types/State";

export const TreasuryComponent = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    return <GenericTreasuryComponent treasury={state.Credits} text="Treasury" title="Current amount of credits in your treasury" />;
};

export const GenericTreasuryComponent = ({ treasury, title, text }: { treasury: number; title: string; text: string }) => {

    const openHistory = () => {
        console.error("TreasuryHistory - Implementation missing");
    };

    return <div className="statusbar-tiles" title={title}>
        <div className="toolbar-two-column-header-text small-text" onClick={openHistory}>{text}</div>
        <img
            src={TreasuryIcon}
            className="toolbar-icon"
            id={"TreasuryIcon"}
            alt={"TreasuryIcon"}>
        </img>
        <div className="toolbar-text">
            {`${treasury} \xA5`}
        </div>
    </div>;
};
