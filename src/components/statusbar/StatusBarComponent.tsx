import React from "react";
import { connect } from "react-redux";
import { CrewState } from "../../types/State";
import { CrewNameComponent } from "./CrewNameComponent";
import { CrewSizeComponent } from "./CrewSizeComponent";
import { FileComponent } from "./FileComponent";
import { TreasuryComponent } from "./TreasuryComponent";

export const Statusbar = () =>
    <div key="statusbar" id="statusbar" className="builder-statusbar">
        <CrewNameComponent />
        <FileComponent />
        <TreasuryComponent />
        <CrewSizeComponent />
    </div>;

const mapStateToProps = (state: CrewState) => state;

export const StatusbarComponent = connect(mapStateToProps)(Statusbar);
