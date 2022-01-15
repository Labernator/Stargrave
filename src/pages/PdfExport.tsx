import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React, { useContext, useEffect, useState } from "react";
import { ReactReduxContext } from "react-redux";
import { useHistory } from "react-router-dom";
import { NameComponent } from "../components/NameComponent";
import { PdfRenderer } from "../components/PdfRenderer";
import { PdfIcon } from "../images";
import { Character } from "../types/Characters";
import { CrewState } from "../types/State";

export const PdfExportPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const [fileName, setFileName] = useState<string>(`CrewList ${state.ShipName} ${state.Captain?.name}  (lvl ${state.Captain?.level || 15})`);

    const history = useHistory();

    useEffect(() => {
        document.getElementById("NameInput")?.focus();
    });
    const exportPdf = async () => {
        const jsPdf = new jsPDF("p", "mm", "a4", true);
        let canvas: HTMLCanvasElement;
        const container = Array.from(document.querySelectorAll(".pdf-container"));
        for (let i = 0; i < container.length; i++) {
            if (i > 0) {
                jsPdf.addPage();
            }
            canvas = await html2canvas(container[i] as unknown as HTMLElement, { scale: 4, letterRendering: true });
            jsPdf.addImage(canvas.toDataURL("image/png"), "JPEG", 0, 0, jsPdf.internal.pageSize.getWidth(), jsPdf.internal.pageSize.getHeight());

        }
        jsPdf.save(`${fileName}.pdf`);
    };
    return <React.Fragment>
        <div className="pdf-container"><PdfRenderer crewMembers={[state.Captain as Character, state.FirstMate as Character, ...state.Soldiers]} /></div>
        <div className="chapter-header">Export your warband to pdf</div>
        <div style={{ display: "grid", paddingTop: "2rem", paddingBottom: "2rem" }}>
            <img className="file-uploader-icon" src={PdfIcon} onClick={exportPdf} />
        </div>
        <div className="modal-header">Change the file name if you wish</div>
        <NameComponent inputCallback={setFileName} currentStateValue={`${fileName}`} tooltip={"The file name"} />

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
