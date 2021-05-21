import { useState } from "react";
import { PdfIcon } from "../../images";

export const PdfComponent = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const openHistory = () => {
        setOpenDialog(true);
    };

    return <div className="statusbar-tiles" onClick={openHistory} title="Click to open dialog to save/load a crew">
        <img
            src={PdfIcon}
            style={{ paddingLeft: "0.2rem" }}
            className="toolbar-icon"
            id={"SaveIcon"}
            alt={"SaveIcon"}>
        </img>
    </div>;
};
