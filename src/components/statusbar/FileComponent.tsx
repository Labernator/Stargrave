import { useState } from "react";
import { store } from "../..";
import { SaveIcon } from "../../images";
import { SaveLoadDialog } from "./SaveLoadDialog";

export const FileComponent = ({ compactView }: { compactView?: boolean }) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const openHistory = () => {
        setOpenDialog(true);
    };

    return <div className="statusbar-tiles" onClick={openHistory} title="Click to open dialog to save/load a crew">
        {openDialog ? <SaveLoadDialog state={store.getState()} closeCallback={() => setOpenDialog(false)} /> : null}
        {compactView ? null : <div className="toolbar-two-column-header-text small-text" >Save / Load</div>}
        <img
            src={SaveIcon}
            style={{ paddingLeft: compactView ? "0.2rem" : "0.85rem", gridArea: compactView ? "1 / 1" : "2 / 1 / 2 / 2", placeSelf: compactView ? "center" : "end" }}
            className="toolbar-icon"
            id={"SaveIcon"}
            alt={"SaveIcon"}>
        </img>
    </div>;
};
