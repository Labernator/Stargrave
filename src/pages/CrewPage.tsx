import React from "react";
import { connect } from "react-redux";
import { AddCharacterComponent } from "../components/AddCharacterComponent";
import { AddCrewMemberComponent } from "../components/AddCrewMemberComponent";
import { CharacterComponent } from "../components/CharacterComponent";
import { CrewMemberComponent } from "../components/CrewMemberComponent";
import { StatusbarComponent } from "../components/statusbar/StatusBarComponent";
import { Character, Soldier } from "../types/Characters";
import { CrewState } from "../types/State";
import { numberOfSoldiers } from "../Utils";

export const CrewOverview = ({ captain, firstMate, soldiers }: { captain: Character | undefined; firstMate: Character | undefined; soldiers: Soldier[] | undefined }) => <React.Fragment>
    <StatusbarComponent key="statusbarComponent" />
    <div key="crewRoster" id="crewRoster" style={{ paddingTop: "0.5rem" }}>
        <div key="characterContainer" style={{ float: "left" }}>
            {captain ? <CharacterComponent key="captainComponent" isCaptain={true} /> : <AddCharacterComponent isCaptain={true} />}
            {firstMate ? <CharacterComponent key="firstMateComponent" isCaptain={false} /> : <AddCharacterComponent isCaptain={false} />}
        </div>
        {soldiers && soldiers.length > 0 ? soldiers.map((soldier) => <CrewMemberComponent key={`crew_member_${soldier.name}`} soldier={soldier} />) : undefined}
        {numberOfSoldiers() < 8 ? <AddCrewMemberComponent /> : undefined}
    </div>
</React.Fragment>;

const mapStateToProps = (state: CrewState) => ({
    captain: state.Captain,
    firstMate: state.FirstMate,
    soldiers: state.Soldiers,
});

export const CrewPage = connect(mapStateToProps)(CrewOverview);
