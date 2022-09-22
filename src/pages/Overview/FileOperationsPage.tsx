import React, { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { useHistory } from "react-router-dom";
import { PageBackBtnComponent } from "../../components/common/BackButton";
import { ImportCrewIcon, PdfIcon, SaveIcon } from "../../images";
import { CrewState } from "../../types";

export const FileOperationsPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const history = useHistory();

    const saveToFileNew = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const anchor = document.createElement("a");
        document.body.appendChild(anchor);
        const json = JSON.stringify(state);
        const blob = new Blob([json], { type: "octet/stream" });
        const url = window.URL.createObjectURL(blob);
        anchor.href = url;
        anchor.download = `${state.ShipName} - ${state.Captain.name} (lvl ${state.Captain.level}/${state.FirstMate.level}).sg`;
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
    return <div className="flex-container" >
        <div className="landing-page-tile">
            <div className="transaction-tile-header">Load another warband </div>
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

        <div className="landing-page-tile">
            <div className="transaction-tile-header">Save your warband</div>
            <img alt="save to file" className="file-ops-icon" src={SaveIcon} onClick={saveToFileNew} />
        </div>
        <div className="landing-page-tile">
            <div className="transaction-tile-header">Export your warband to pdf</div>
            <img alt="file upload" className="file-ops-icon" src={PdfIcon} onClick={(event) => {
                history.push("/PdfExport");
                event.preventDefault();
                event.stopPropagation();
            }} />
        </div>
        <PageBackBtnComponent />
    </div >;
};
