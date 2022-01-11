import { useHistory } from "react-router-dom";
import { PdfIcon } from "../../images";

export const PdfComponent = () => {
    const history = useHistory();
    return <div className="statusbar-tiles" onClick={() => history.push("/PdfExport")} title="Click to open export pdf dialog">
        <img
            src={PdfIcon}
            style={{ paddingLeft: "0.2rem" }}
            className="toolbar-icon"
            id={"SaveIcon"}
            alt={"SaveIcon"}>
        </img>
    </div>;
};
