import React, { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { Character, CrewState, Soldier, StatsEnum } from "../../types";
import { getBaseCaptain, getBaseFirstMate, getCurrentStatStrings, getPower, getStatsWithGear, isCaptain, isCharacter } from "../../Utils";

const renderHeader = (character: Character) => <React.Fragment>
    <div style={{ border: "2px solid black", padding: "0.5rem", margin: "0rem 0.1rem", fontSize: "1.5rem", fontWeight: "bold" }}>
        {`${isCaptain(character.type) ? "Cpt." : "Ltn."} ${character.name} (${character.background})`}
        <div style={{ float: "right" }}>
            <div style={{ float: "left" }}>Level</div>
            <div style={{ float: "right", border: "2px solid", padding: "0rem 0.5rem", marginLeft: "0.5rem", fontWeight: "bold" }}>{character.level}</div>
        </div>
        {character.missNextGame ? <div style={{ fontSize: "0.9rem" }}>Barely Alive - Misses next mission</div> : undefined}
    </div>
</React.Fragment>;

const renderCrewmanHeader = (crewman: Soldier) => <React.Fragment>
    <div style={{ border: "2px solid black", padding: "0.2rem", margin: "0rem 0.1rem", fontSize: "1.2rem", fontWeight: "bold" }}>
        {`${crewman.type} (#${crewman.id})`}
    </div>
</React.Fragment>;

const renderPowers = (character: Character) => <div style={{ display: "grid", gridTemplateColumns: "80% 20%", clear: "both" }}>
    <table style={{ fontSize: "1.1rem" }}>
        <colgroup>
            <col style={{ width: "50%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
        </colgroup>
        <tbody>
            <tr>
                <td style={{ border: "2px solid black", padding: "0.5rem", margin: "0rem 0.1rem", fontWeight: "bold" }}>Power</td>
                <td style={{ border: "2px solid black", padding: "0.5rem", margin: "0rem 0.1rem", fontWeight: "bold" }}>Activation</td>
                <td style={{ border: "2px solid black", padding: "0.5rem", margin: "0rem 0.1rem", fontWeight: "bold" }}>Strain</td>
            </tr>
            {character.powers.map((power) => <tr >
                <td style={{ border: "2px solid black", padding: "0rem 0.5rem", margin: "0rem 0.1rem" }}
                    key={`add_dialog_${character.name}_${character.type}_power_${power.name}`
                    }>{power.name}</td>
                <td style={{ border: "2px solid black", padding: "0rem 0.5rem", margin: "0rem 0.1rem" }}
                    key={`add_dialog_${character.name}_${character.type}_power_${power.activation}`
                    }>{power.activation}</td>
                <td style={{ border: "2px solid black", padding: "0rem 0.5rem", margin: "0rem 0.1rem" }}
                    key={`add_dialog_${character.name}_${character.type}_power_${getPower(power.name).strain}`
                    }>{getPower(power.name).strain}</td>
            </tr>)}
        </tbody>
    </table>
    <div style={{ grid: "1/2", border: "2px solid black", padding: "0.5rem", margin: "0.15rem 0.1rem", fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
        <div style={{ fontSize: "1rem" }}>Current Health</div>
        <div style={{ paddingTop: "0.5rem" }}>{character.currentHealth || character.stats.Health}</div>
    </div>
</div>;

const renderGear = (member: Character | Soldier) => <React.Fragment>
    <div style={{ border: "2px solid black", padding: "0.5rem", margin: isCharacter(member) ? "0rem 0.1rem 0.5rem" : "0rem 0.1rem 0.15rem", fontSize: "0.9rem" }}>
        <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Gear</div>
        {isCharacter(member) ? member.gear?.map((gear) => `${gear.name}`).join(", ") : member.gear.join(", ")}
    </div>
</React.Fragment>;

const renderCharacterStats = (member: Character) => {
    const stats = getStatsWithGear(member.stats, {}, member.gear);
    const currentStats = Object.entries(getCurrentStatStrings(stats, member.currentHealth));
    const cells: JSX.Element[] = [];
    for (const [key, value] of currentStats) {
        if (key !== StatsEnum.Health) {
            cells.push(<div style={{ fontSize: "1rem", fontWeight: "bold", float: "left", textAlign: "center", padding: "0.5rem 0rem", minWidth: "20%" }}>
                <div
                    style={{ border: "2px solid black", padding: "0.5rem", margin: "0rem 0.1rem", fontSize: "1.5rem" }}
                    className={
                        isCharacter(member) && stats[key as StatsEnum] !== (isCaptain(member.type) ?
                            getBaseCaptain() : getBaseFirstMate()).stats[key as StatsEnum] ? "improved-stat" : ""
                    }
                    key={`add_dialog_${member.name}_stat_${key}`
                    }>
                    {value}
                </div>
                <div key={`add_dialog__stat_header_${key}`}>{key}</div>
            </div>);
        }
    }
    return <React.Fragment>{cells}</React.Fragment>;
};

const renderCrewStats = (member: Soldier) => {
    const currentStats = Object.entries(getCurrentStatStrings(member.stats, member.currentHealth));
    const cells: JSX.Element[] = [];
    for (const [key, value] of currentStats) {
        if (key !== StatsEnum.Health) {
            cells.push(<div style={{ fontSize: "1rem", fontWeight: "bold", float: "left", textAlign: "center", paddingTop: "0.15rem", minWidth: "20%" }}>
                <div
                    style={{ border: "2px solid black", padding: "0.2rem", margin: "0rem 0.1rem", fontSize: "1.1rem" }}
                    key={`add_dialog_${member.type}_stat_${key}`
                    }>
                    {value}
                </div>
                <div key={`add_dialog__stat_header_${key}`}>{key}</div>
            </div>);
        }
    }
    return <React.Fragment>
        <div style={{ display: "grid", gridTemplateColumns: "80% 20%" }}>
            <div style={{ display: "flex" }}>{cells}</div>
            <div style={{ border: "2px solid black", padding: "0.2rem", margin: "0.15rem 0.1rem", fontSize: "1.1rem", fontWeight: "bold", textAlign: "center", gridArea: "1/2/3/2" }}>
                <div style={{ fontSize: "1rem" }}>Current Health</div>
                <div style={{ paddingTop: "0.5rem" }}>{member.currentHealth || member.stats.Health}</div>
            </div>
            {renderGear(member)}
        </div>
    </React.Fragment >;
};

const PdfCharacter = (character: Character) => <React.Fragment>
    {renderHeader(character)}
    {renderCharacterStats(character)}
    {renderPowers(character)}
    {renderGear(character)}
</React.Fragment>;

const PdfSoldier = (crewman: Soldier) => <React.Fragment>
    {renderCrewmanHeader(crewman)}
    {renderCrewStats(crewman)}
</React.Fragment>;

export const PdfCharacters = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    return <div className={"pdf-divider"}>
        {PdfCharacter(state.Captain)}
        {PdfCharacter(state.FirstMate)}
    </div>;
};
export const PdfSoldiers = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    return <div className={"pdf-divider"}>
        {state.Soldiers.map(PdfSoldier)}
    </div>;
};
