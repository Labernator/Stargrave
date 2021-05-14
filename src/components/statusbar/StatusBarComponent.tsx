import { connect } from "react-redux";
import { CrewState } from "../../types/State";
import { CrewNameComponent } from "./CrewNameComponent";
import { CrewSizeComponent } from "./CrewSizeComponent";
import { TreasuryComponent } from "./TreasuryComponent";

export const Statusbar = () =>
    <div key="statusbar" id="statusbar" className="statusbar">
        <CrewNameComponent />
        {/* <FileComponent compactView={true} /> */}
        <TreasuryComponent compactView={true} />
        <CrewSizeComponent compactView={true} />
        {/* <ExitComponent compactView={true} /> */}
    </div>;

const mapStateToProps = (state: CrewState) => state;

export const StatusbarComponent = connect(mapStateToProps)(Statusbar);
