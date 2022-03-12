import { useHistory } from "react-router-dom";
import { SaveIcon } from "../../images";

export const FileComponent = () => {
    const history = useHistory();
    return <div className="statusbar-tiles" onClick={() => history.push("/FileOperations")} title="Click to open dialog to save/load a crew">
        <img
            src={SaveIcon}
            style={{ paddingLeft: "0.2rem", placeSelf: "center" }}
            className="toolbar-icon"
            id={"SaveIcon"}
            alt={"SaveIcon"}>
        </img>
    </div>;
};
