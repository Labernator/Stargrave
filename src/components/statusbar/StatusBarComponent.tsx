import { CrewNameComponent } from "./CrewNameComponent";
import { CrewSizeComponent } from "./CrewSizeComponent";
import { FileComponent } from "./FileComponent";
import { PdfComponent } from "./PdfComponent";
import { TreasuryComponent } from "./TreasuryComponent";

export const StatusbarComponent = () =>
    <div key="statusbar" id="statusbar" className="statusbar">
        <CrewNameComponent />
        <div style={{ float: "left", flex: "1 1 auto", display: "flex" }}><FileComponent />
            <PdfComponent />
            <TreasuryComponent />
            <CrewSizeComponent />
        </div>
    </div>;
