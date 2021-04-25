import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Crew from "../data/Samples/Firefly.sg";
import { CreateCrewIcon, ImportCrewIcon, UseSampleIcon } from "../images";
import { SET_CREW } from "../redux/actions";
import { CrewState } from "../types/State";

export const LandingPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div className="landing-page ">
            <div style={{ gridArea: "1/1/1/4", width: "100%", textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>Stargrave Crew Configuration - choose how to continue</div>
            <label htmlFor="file-uploader" className="landing-page-columns" style={{ gridArea: "2/1" }}>
                <input
                    id="file-uploader"
                    type="file"
                    accept=".sg"
                    style={{ display: "none" }}
                    onChange={() => {
                        const reader = new FileReader();
                        reader.onload = (ev: ProgressEvent<FileReader>) => {
                            dispatch({ type: SET_CREW, payload: JSON.parse(ev.target?.result as string) });
                            history.push("/NewCrew");
                        };
                        reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
                    }}
                />
                <div style={{ gridArea: "1/1" }} className="landing-page-column-header">Load an existing crew from file</div>
                <img style={{ gridArea: "2/1" }} alt="ImportWarband" className="landing-page-column-icon" src={ImportCrewIcon} />
            </label>
            <div className="landing-page-columns" style={{ gridArea: "2/2" }} onClick={() => history.push("/NewCrew")}>
                <div className="landing-page-column-header">Create a new crew</div>
                <img alt="CreateWarband" className="landing-page-column-icon" src={CreateCrewIcon} />
            </div>
            <div
                className="landing-page-columns"
                style={{ gridArea: "2/3" }}
                onClick={() => {
                    dispatch({ type: SET_CREW, payload: (Crew as any).default as CrewState });
                    history.push("/NewCrew");
                }}>
                <div className="landing-page-column-header">Use a sample crew to start</div>
                <img alt="SampleWarband" className="landing-page-column-icon" src={UseSampleIcon} />
            </div>
        </div >
    );
};
