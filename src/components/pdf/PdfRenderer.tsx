import React, { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { CrewState } from "../../types";
import { PdfCharacters, PdfSoldiers } from "./PdfRosterComponents";

const hasDronePower = (state: CrewState) => !!state.Captain.powers.find((pwr) => pwr.name === "Drone") || !!state.FirstMate.powers.find((pwr) => pwr.name === "Drone");

export const PdfRenderer = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const hasDrone = hasDronePower(state);
    if (state.Soldiers.length > 5 || (state.Soldiers.length > 4 && hasDrone)) {
        return <React.Fragment>
            <div className="pdf-container">
                <PdfCharacters characters={[state.Captain]} />
                <PdfCharacters characters={[state.FirstMate]} />
            </div>
            <div className="pdf-container">
                <PdfSoldiers soldiers={state.Soldiers.filter((_value, idx) => idx < 5)} hasDrone={false} />
                <PdfSoldiers soldiers={state.Soldiers.filter((_value, idx) => idx >= 5)} hasDrone={hasDrone} />
            </div>
        </React.Fragment>;
    }
    return <div className="pdf-container">
        <PdfCharacters characters={[state.Captain, state.FirstMate]} />
        <PdfSoldiers soldiers={state.Soldiers} hasDrone={hasDrone} />
    </div>;
};
