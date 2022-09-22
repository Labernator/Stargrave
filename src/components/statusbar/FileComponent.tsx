import { useHistory } from "react-router-dom";
import { SaveIcon } from "../../images";

export const FileComponent = () => {
    const history = useHistory();
    return <div className="statusbar-component" onClick={() => history.push("/FileOperations")} title="Click to open dialog to save/load a crew">
        <img
            src={SaveIcon}
            className="toolbar-compact-icon"
            id={"SaveIcon"}
            alt={"SaveIcon"}>
        </img>
    </div>;
};
