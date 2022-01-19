import React from "react";
import { Character, Soldier } from "../types";
import { isCharacter } from "../Utils";
import { CharacterComponent } from "./CharacterComponent";
import { PdfHeaderComponent } from "./PdfHeader";
import { SoldierComponent } from "./SoldierComponent";

export const PdfRenderer = ({ crewMembers }: { crewMembers: Array<Soldier | Character> }) =>
    <React.Fragment>
        <PdfHeaderComponent />
        <CharacterComponent isCaptain={true} isPdf={true} />
        <CharacterComponent isCaptain={false} isPdf={true} />
        {crewMembers.map((soldier) => isCharacter(soldier) ? null : <SoldierComponent key={`crew_member_${soldier.type}`} soldier={soldier} isPdf={true} />)},
    </React.Fragment>;
