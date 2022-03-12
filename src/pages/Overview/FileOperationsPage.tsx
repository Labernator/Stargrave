import React, { useContext, useState } from "react";
import { ReactReduxContext } from "react-redux";
import { useHistory } from "react-router-dom";
import { BackButtonComponent } from "../../components/common/BackButton";
import { ImportCrewIcon, PdfIcon, SaveIcon } from "../../images";
import { CrewState } from "../../types";

export const FileOperationsPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const [fileName, setFileName] = useState<string>(`${state.ShipName} ${state.Captain.name}  (lvl ${state.Captain.level || 15})`);

    const history = useHistory();

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

        if (state.ShipName && state.Captain.name && state.Captain.level) {
            const myStorage = localStorage;
            myStorage.setItem(`${state.ShipName}_${state.Captain.name}_${state.Captain.level}_${state.FirstMate.level}_${state.Credits}`, json);
        }
        history.push("/CrewOverview");
        e.preventDefault();
        e.stopPropagation();
    };
    return <React.Fragment>
        <div className="vertical-splitter">
            <div className="chapter-header">Tap to load another warband from file or local storage</div>
            <div style={{ display: "grid" }}>
                <img
                    alt="file upload"
                    className="file-ops-icon"
                    src={ImportCrewIcon}
                    onClick={(event) => {
                        history.push("/FileSystem");
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                />
            </div>
        </div>

        <div className="vertical-splitter">
            <div style={{ borderTop: "0.15rem solid" }} className="chapter-header">Tap to save your warband to file</div>
            <div style={{ display: "grid" }}>
                <img alt="save to file" className="file-ops-icon" src={SaveIcon} onClick={saveToFileNew} />
            </div>
        </div>
        <div className="vertical-splitter">
            {/* <div className="pdf-container"><PdfRenderer crewMembers={[state.Captain, state.FirstMate, ...state.Soldiers]} /></div> */}
            <div style={{ borderTop: "0.15rem solid" }} className="chapter-header">Export your warband to pdf</div>
            <div style={{ display: "grid", paddingTop: "2rem", paddingBottom: "2rem" }}>
                <img alt="file upload" className="file-ops-icon" src={PdfIcon} onClick={(event) => {
                    history.push("/PdfExport");
                    event.preventDefault();
                    event.stopPropagation();
                }} />
            </div>
        </div>
        <BackButtonComponent />
    </React.Fragment>;
};
