import React, { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { Character, Creature, CrewState, Soldier, StatsEnum } from "../../types";
import { getBaseCaptain, getBaseFirstMate, getCurrentStatStrings, getDrone, getPower, getStatsWithGear, isCaptain, isCharacter } from "../../Utils";

const hasDronePower = (state: CrewState) => !!state.Captain.powers.find((pwr) => pwr.name === "Drone") || !!state.FirstMate.powers.find((pwr) => pwr.name === "Drone");
const renderHeader = (character: Character) =>
    <div className="pdf-crew-manifest-boxes" style={{ padding: "0.5rem", fontSize: "1.5rem", display: "flex", justifyContent: "space-between" }}>
        <div>{`${isCaptain(character.type) ? "Cpt." : "Ltn."} ${character.name} (${character.background})`}</div>
        {character.missNextGame ? <div style={{ fontSize: "0.9rem", color: "orangered" }}>Barely Alive - Misses next mission</div> : undefined}
        <div style={{ textAlign: "center" }}>{`Level ${character.level}`}</div>
    </div>;

const renderCrewmanHeader = (crewman: Soldier) =>
    <div className="pdf-crew-manifest-boxes" style={{ padding: "0.2rem", fontSize: "1.0rem" }}>
        {`${crewman.name} (${crewman.type})${crewman.isRobot ? " [Robot]" : ""}`}
    </div>;

const renderDroneHeader = (crewman: Creature) => <div className="pdf-crew-manifest-boxes" style={{ padding: "0.2rem", fontSize: "1.0rem" }}>
    {`${crewman.name}`}
</div>;

const renderPowers = (character: Character) => <div style={{ display: "grid", gridTemplateColumns: "80% 20%", clear: "both" }}>
    <table className="pdf-normal-size" >
        <colgroup>
            <col style={{ width: "50%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
        </colgroup>
        <tbody>
            <tr>
                <td className="pdf-crew-manifest-boxes" style={{ padding: "0.5rem" }}>Power</td>
                <td className="pdf-crew-manifest-boxes" style={{ padding: "0.5rem" }}>Activation</td>
                <td className="pdf-crew-manifest-boxes" style={{ padding: "0.5rem" }}>Strain</td>
            </tr>
            {character.powers.map((power) => <tr >
                <td className="pdf-crew-manifest-boxes" style={{ padding: "0rem 0.5rem", fontWeight: "normal" }}
                    key={`add_dialog_${character.name}_${character.type}_power_${power.name}`
                    }>{power.name}</td>
                <td className="pdf-crew-manifest-boxes" style={{ padding: "0rem 0.5rem", fontWeight: "normal" }}
                    key={`add_dialog_${character.name}_${character.type}_power_${power.activation}`
                    }>{power.activation}</td>
                <td className="pdf-crew-manifest-boxes" style={{ padding: "0rem 0.5rem", fontWeight: "normal" }}
                    key={`add_dialog_${character.name}_${character.type}_power_${getPower(power.name).strain}`
                    }>{getPower(power.name).strain}</td>
            </tr>)}
        </tbody>
    </table>
    <div style={{ grid: "1/2", border: "2px solid black", padding: "0.5rem", margin: "0.15rem 0.1rem", fontSize: "1.5rem", textAlign: "center" }}>
        <div className="pdf-smaller-size">Current Health</div>
        <div style={{ paddingTop: "0.5rem" }}>{character.currentHealth || character.stats.Health}</div>
    </div>
</div>;

const renderGear = (member: Character | Soldier) => <div style={{ border: "2px solid black", padding: "0.5rem", margin: isCharacter(member) ? "0rem 0.1rem 0.5rem" : "0rem 0.1rem 0.15rem", fontSize: isCharacter(member) ? "1rem" : "0.8rem" }}>
    <div className="pdf-normal-size">Gear</div>
    <div style={{ fontWeight: "normal" }}>{isCharacter(member) ? member.gear?.map((gear) => `${gear.name}`).join(", ") : member.gear.join(", ")}</div>
</div>;
const renderDroneGear = (member: Creature) => <div style={{ border: "2px solid black", padding: "0.5rem", margin: "0rem 0.1rem 0.15rem", fontSize: "0.8rem" }}>
    <div className="pdf-normal-size">Notes</div>
    <div style={{ fontWeight: "normal" }}>{[...member.notes || [], ...member.gear].join(", ")}</div>
</div>;

const renderCharacterStats = (member: Character) => {
    const stats = getStatsWithGear(member.stats, {}, member.gear);
    const currentStats = Object.entries(getCurrentStatStrings(stats, member.currentHealth));
    const cells: JSX.Element[] = [];
    for (const [key, value] of currentStats) {
        if (key !== StatsEnum.Health) {
            cells.push(<div className="pdf-smaller-size" style={{ textAlign: "center", float: "left", padding: "0.5rem 0rem", minWidth: "20%" }}>
                <div
                    style={{ padding: "0.5rem", fontSize: "1.5rem" }}
                    className={
                        isCharacter(member) && stats[key as StatsEnum] !== (isCaptain(member.type) ?
                            getBaseCaptain() : getBaseFirstMate()).stats[key as StatsEnum] ? "pdf-crew-manifest-boxes improved-stat" : "pdf-crew-manifest-boxes"
                    }
                    key={`add_dialog_${member.name}_stat_${key}`
                    }>
                    {value}
                </div>
                <div style={{ fontWeight: "normal" }} key={`add_dialog__stat_header_${key}`}>{key}</div>
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
            cells.push(<div className="pdf-smaller-size" style={{ textAlign: "center", paddingTop: "0.15rem", minWidth: "20%" }}>
                <div
                    className="pdf-crew-manifest-boxes pdf-normal-size"
                    style={{ padding: "0.2rem" }}
                    key={`add_dialog_${member.type}_stat_${key}`
                    }>
                    {value}
                </div>
                <div style={{ fontWeight: "normal" }} key={`add_dialog__stat_header_${key}`}>{key}</div>
            </div>);
        }
    }
    return <React.Fragment>
        <div style={{ display: "grid", gridTemplateColumns: "80% 20%" }}>
            <div style={{ display: "flex" }}>{cells}</div>
            <div className="pdf-normal-size" style={{ border: "2px solid black", padding: "0.2rem", margin: "0.15rem 0.1rem", textAlign: "center", gridArea: "1/2/3/2" }}>
                <div className="pdf-smaller-size" >Current Health</div>
                <div style={{ paddingTop: "0.5rem" }}>{member.currentHealth || member.stats.Health}</div>
            </div>
            {renderGear(member)}
        </div>
    </React.Fragment >;
};

const renderDroneStats = (creature: Creature) => {
    const currentStats = Object.entries(creature.stats);
    const cells: JSX.Element[] = [];
    for (const [key, value] of currentStats) {
        if (key !== StatsEnum.Health) {
            cells.push(<div className="pdf-smaller-size" style={{ textAlign: "center", paddingTop: "0.15rem", minWidth: "20%" }}>
                <div
                    className="pdf-crew-manifest-boxes pdf-normal-size"
                    style={{ padding: "0.2rem" }}
                    key={`add_dialog_${creature.name}_stat_${key}`
                    }>
                    {value}
                </div>
                <div style={{ fontWeight: "normal" }} key={`add_dialog__stat_header_${key}`}>{key}</div>
            </div>);
        }
    }
    return <React.Fragment>
        <div style={{ display: "grid", gridTemplateColumns: "80% 20%" }}>
            <div style={{ display: "flex" }}>{cells}</div>
            <div className="pdf-normal-size" style={{ border: "2px solid black", padding: "0.2rem", margin: "0.15rem 0.1rem", textAlign: "center", gridArea: "1/2/3/2" }}>
                <div className="pdf-smaller-size">Current Health</div>
                <div style={{ paddingTop: "0.5rem" }}>{creature.stats.Health}</div>
            </div>
            {renderDroneGear(creature)}
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

const PdfDrone = (creature: Creature) => <React.Fragment>
    {renderDroneHeader(creature)}
    {renderDroneStats(creature)}
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
        {hasDronePower(state) ? PdfDrone(getDrone()) : undefined}
    </div>;
};
