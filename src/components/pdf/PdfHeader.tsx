import { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { CrewState } from "../../types";

export const PdfHeaderComponent = () => {

    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;

    return <div style={{ float: "left", fontSize: "1rem" }} key="pdf-header" id="pdf-header" className="pdf-header">
        <div style={{ float: "left", width: "100%", paddingBottom: "1rem", borderBottom: "1px solid black" }}>
            <div style={{ float: "left", width: "50%" }}><div className="pdf-header-title">Ship Name</div><div>{state.ShipName}</div></div>
            <div style={{ float: "left", width: "25%" }}><div className="pdf-header-title">Credits</div><div>{state.Credits}</div></div>
            <div style={{ float: "left", width: "25%" }}><div className="pdf-header-title">Experience</div><div>{state.Experience}</div></div >
        </div>
        <div style={{ clear: "both", float: "left", width: "50%" }} className="pdf-header-title">Ship Upgrades</div>
        <div style={{ float: "left", minHeight: "4rem" }} className="pdf-header-title">Ship's Hold</div>
    </div>;
};
