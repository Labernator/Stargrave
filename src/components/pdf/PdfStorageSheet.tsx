import React, { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { CrewState } from "../../types";

export const StorageSheet = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const storage = state.ShipsHold;
    const Square = ({ checked }: { checked?: boolean }) => <div className="pdf-xp-checkbox" >{checked ? "X" : ""}</div>;
    const Squares = ({ x }: { x: number }) => <div>{Array.from({ length: x }).map(() => <Square />)}</div>;
    const expTable = () => <div style={{ width: "50 %", float: "right" }}>
        <div className="very-large-text">Mission Log:</div>
        <div className="pdf-xp-checkbox-container">
            <div>Played a scenario (30xp)</div>
            <Square checked={true} />
        </div>
        <div className="pdf-xp-checkbox-container">
            <div>At Least one own crew member killed (30xp)</div>
            <Square />
        </div>
        <div className="pdf-xp-checkbox-container">
            <div>Loot tokens unlocked <br />(+20 xp)</div>
            <Squares x={7} />
        </div>
        <div className="pdf-xp-checkbox-container">
            <div>Successful power casts <br />(+10 xp / Max 100 xp)</div>
            <Squares x={10} />
        </div>
        <div className="pdf-xp-checkbox-container">
            <div>Rival crew members killed <br />(+10 xp / Max 40 xp)</div>
            <Squares x={4} />
        </div>
        <div className="pdf-xp-checkbox-container">
            <div>NPCs killed <br />(+5 xp / Max 20 xp)</div>
            <Squares x={4} />
        </div>
        <div></div>
        <div className="pdf-xp-checkbox-container">
            <div>Scenario specific xp gained</div>
            <Squares x={8} />
        </div>
        <div className="pdf-xp-checkbox-container">
            <div>Total XP Gained:</div>
            <div className="pdf-xp-total" ></div>
        </div>
    </div>;
    return <React.Fragment>
        <div id="printable-storage-sheet" className="pdf-container-clone">
            {expTable()}
        </div>
    </React.Fragment>;
};
