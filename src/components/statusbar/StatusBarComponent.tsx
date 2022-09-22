import { AdvanceComponent } from "./AdvanceComponent";
import { CrewSizeComponent } from "./CrewSizeComponent";
import { FileComponent } from "./FileComponent";
import { ShipnameComponent } from "./Shipname";
import { TreasuryComponent } from "./TreasuryComponent";

export const StatusbarComponent = () =>
    <div key="statusbar" id="statusbar" className="statusbar">
        <ShipnameComponent />
        <div style={{ display: "flex", width: "-webkit-fill-available", justifyContent: "space-around" }}>
            <FileComponent />
            <TreasuryComponent />
            <CrewSizeComponent />
            <AdvanceComponent />
        </div>
    </div>;
