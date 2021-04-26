import { useState } from "react";
import { store } from "../..";
import { SaveIcon } from "../../images";
import { SaveLoadDialog } from "./SaveLoadDialog";

export const FileComponent = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const openHistory = () => {
        setOpenDialog(true);
    };

    return <div className="statusbar-tiles" onClick={openHistory} title="Click to open dialog to save/load a crew">
        {openDialog ? <SaveLoadDialog state={store.getState()} closeCallback={() => setOpenDialog(false)} /> : null}
        <div className="toolbar-two-column-header-text small-text" >Save / Load</div>
        <img
            src={SaveIcon}
            style={{ paddingLeft: "0.85rem", gridArea: "2 / 1 / 2 / 2" }}
            className="toolbar-icon"
            id={"TreasuryIcon"}
            alt={"TreasuryIcon"}>
        </img>
    </div>;
};
