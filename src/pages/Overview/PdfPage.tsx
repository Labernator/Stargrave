import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React, { useContext, useState } from "react";
import { ReactReduxContext } from "react-redux";
import { BackButtonComponent } from "../../components/common/BackButton";
import { PrintablePowerCards } from "../../components/pdf/PdfPowerCards";
import { PdfRenderer } from "../../components/pdf/PdfRenderer";
import { StorageSheet } from "../../components/pdf/PdfStorageSheet";
import { PdfIcon } from "../../images";
import { CrewState } from "../../types";

export const PdfExportPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const [printPowerCards, setPrintPowerCards] = useState<boolean | undefined>(undefined);
    const exportPdf = async () => {
        const jsPdf = new jsPDF("landscape", "mm", "a4", true);
        let canvas: HTMLCanvasElement;
        const container = Array.from(document.querySelectorAll(".pdf-container"));
        for (let i = 0; i < container.length; i++) {
            if (i > 0) {
                jsPdf.addPage();
            }
            canvas = await html2canvas(container[i] as unknown as HTMLElement, { scale: 4, letterRendering: true });
            jsPdf.addImage(canvas.toDataURL("image/png"), "JPEG", 0, 0, jsPdf.internal.pageSize.getWidth(), jsPdf.internal.pageSize.getHeight());
        }
        jsPdf.addPage();
        canvas = await html2canvas(document.querySelector("#printable-storage-sheet") as HTMLElement, { scale: 4, letterRendering: true });
        jsPdf.addImage(canvas.toDataURL("image/png"), "JPEG", 0, 0, jsPdf.internal.pageSize.getWidth(), jsPdf.internal.pageSize.getHeight());
        if (printPowerCards) {
            jsPdf.addPage();
            canvas = await html2canvas(document.querySelector("#printable-power-cards") as HTMLElement, { scale: 2, letterRendering: true });
            jsPdf.addImage(canvas.toDataURL("image/png"), "JPEG", 0, 0, jsPdf.internal.pageSize.getWidth(), jsPdf.internal.pageSize.getHeight());
        }
        jsPdf.save(`${state.ShipName} (${state.Captain.level}/${state.FirstMate.level}/${state.Credits}).pdf`);
    };
    return <React.Fragment>
        <div style={{ borderTop: "0.15rem solid" }} className="chapter-header">Export your warband to pdf</div>
        <div style={{ display: "grid", paddingTop: "2rem", paddingBottom: "2rem" }}>
            <img alt="file upload" className="file-ops-icon" src={PdfIcon} onClick={exportPdf} />
        </div>
        <div className={"pdf-threeway-switch"}>
            <div onClick={() => setPrintPowerCards(true)} className={printPowerCards ? "selected pdf-sub-switch" : "pdf-sub-switch"}>All power cards</div>
            <div onClick={() => setPrintPowerCards(false)} style={{ borderLeft: "1px solid" }} className={printPowerCards === false ? "selected pdf-sub-switch" : "pdf-sub-switch"}>Improved powers</div>
            <div onClick={() => setPrintPowerCards(undefined)} style={{ borderLeft: "1px solid" }} className={printPowerCards === undefined ? "selected  pdf-sub-switch" : "pdf-sub-switch"}>No, thank you</div>
        </div>
        <PdfRenderer />
        <StorageSheet />
        {printPowerCards !== undefined ? <PrintablePowerCards printAll={printPowerCards} /> : undefined}
        <BackButtonComponent />
    </React.Fragment>;
};
