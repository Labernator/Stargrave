import React, { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { CrewState, ModifiedPower } from "../../types";
import { getPower } from "../../Utils";

export const PrintablePowerCards = ({ printAll }: { printAll: boolean }) => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    let printablePowers: ModifiedPower[] = [];
    const powers = [...state.Captain.powers, ...state.FirstMate.powers];
    if (!printAll) {
        for (const power of powers) {
            if (getPower(power.name).activation !== power.activation) {
                printablePowers.push(power);
            }
        }
    } else {
        printablePowers = [...powers];
    }

    return <React.Fragment>
        <div id="printable-power-cards" className="pdf-container-clone">
            {printablePowers.map((power) => ({ ...getPower(power.name), activation: power.activation })).map((power) =>
                <div id={`power-card-${power.name}`} key={`power-card-${power.name}`} className="power-card">
                    <div className="power-card-header">{power.name} ({power.activation})</div>
                    <div className="power-card-second-header">{power.category} / {power.strain}</div>
                    <div style={{ fontSize: `${power.effect.length > 700 ? 0.65 : power.effect.length > 600 ? 0.7 : 0.78}rem` }} className="power-card-text">{power.effect}</div>
                </div>
            )}
        </div>
    </React.Fragment>;
};
