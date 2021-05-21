import { connect } from "react-redux";
import { CrewState } from "../../types/State";
import { CrewNameComponent } from "./CrewNameComponent";
import { CrewSizeComponent } from "./CrewSizeComponent";
import { FileComponent } from "./FileComponent";
import { PdfComponent } from "./PdfComponent";
import { TreasuryComponent } from "./TreasuryComponent";

export const Statusbar = () =>
    <div key="statusbar" id="statusbar" className="statusbar">
        <CrewNameComponent />
        <FileComponent />
        <PdfComponent />
        <TreasuryComponent />
        <CrewSizeComponent />
    </div>;

const mapStateToProps = (state: CrewState) => state;

export const StatusbarComponent = connect(mapStateToProps)(Statusbar);
