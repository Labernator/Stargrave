import React, { useContext, useEffect, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { NameComponent } from "../components/NameComponent";
import { ImportCrewIcon, SaveIcon } from "../images";
import { SET_CREW } from "../redux/actions";
import { CrewState } from "../types/State";

export const FileOperationsPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const [fileName, setFileName] = useState<string>();

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        document.getElementById("NameInput")?.focus();
    });
    const saveToFileNew = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const anchor = document.createElement("a");
        document.body.appendChild(anchor);
        const json = JSON.stringify(state);
        const blob = new Blob([json], { type: "octet/stream" });
        const url = window.URL.createObjectURL(blob);
        anchor.href = url;
        anchor.download = `${fileName}.sg`;
        anchor.id = "ClickableDownloadAnchor";
        anchor.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(document.getElementById("ClickableDownloadAnchor") as Node);
        history.push("/CrewOverview");
        e.preventDefault();
        e.stopPropagation();
    };
    return <React.Fragment>
        <div className="vertical-splitter">
            <div className="chapter-header">Tap to load another warband from file</div>
            <label htmlFor="file-uploader" className="file-uploader">
                <input
                    id="file-uploader"
                    type="file"
                    accept=".sg"
                    style={{ display: "none" }}
                    onChange={() => {
                        const reader = new FileReader();
                        reader.onload = (ev: ProgressEvent<FileReader>) => {
                            dispatch({ type: SET_CREW, payload: JSON.parse(ev.target?.result as string) });
                            history.push("/CrewOverview");
                        };
                        reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
                    }}
                />

                <img alt="ImportWarband" className="file-uploader-icon" src={ImportCrewIcon} />
            </label>
        </div>
        <div className="vertical-splitter">
            <div style={{ marginTop: "10rem", borderTop: "0.15rem solid" }} className="chapter-header">Tap to save your warband to file</div>
            <div className="modal-header">Change the file name if you wish</div>
            <NameComponent inputCallback={setFileName} currentStateValue={`${fileName || `${state.Title} ${state.Captain?.name}  (lvl ${state.Captain?.level || 15})` || "Unnamed_Crew (lvl 15)"}`} tooltip={"The file name"} />
            <div style={{ display: "grid" }}>
                <img className="file-uploader-icon" src={SaveIcon} onClick={saveToFileNew} />
            </div>
        </div>
        <button
            onClick={(event) => {
                history.push("/CrewOverview");
                event.preventDefault();
                event.stopPropagation();
            }}
            className={"dialog-btn back-btn"}
        >Back</button>
    </React.Fragment>;
};
