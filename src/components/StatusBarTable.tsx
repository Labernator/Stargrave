import { Character, CharactersEnum, Stats, StatsEnum } from "../types";
import { getStatsWithGear, isCaptain } from "../Utils";
import { StatsRenderer } from "./StatsRenderer";

const getColGroup = (showName?: boolean) =>
    showName ? <colgroup>
        <col style={{ width: "15%" }} />
        <col style={{ width: "12%" }} />
        <col style={{ width: "8%" }} />
        <col style={{ width: "8%" }} />
        <col style={{ width: "8%" }} />
        <col style={{ width: "8%" }} />
        <col style={{ width: "8%" }} />
        <col style={{ width: "8%" }} />
        <col style={{ width: "8%" }} />
        <col style={{ width: "8%" }} />
        <col style={{ width: "8%" }} />
    </colgroup> :
        <colgroup>
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
        </colgroup>;
export const StatusBarTable = (
    { character, statModifications, gearSlotsUsed, showNameAndType }:
        { character: Character; statModifications: Partial<Stats>; gearSlotsUsed: number; showNameAndType?: boolean }
) => <div className="statusbar-tiles">
        <table style={{ textAlign: "center" }}>
            {getColGroup(showNameAndType)}
            <thead>
                <tr className="small-text">
                    {showNameAndType ? <td>Name</td> : null}
                    {showNameAndType ? <td>Type</td> : null}
                    {Object.keys(StatsEnum).map((stat) => <td key={`add_dialog__stat_header_${stat}`}>{stat}</td>)}
                    <td key={"add_dialog_stat_header_level"}>Level</td>
                    <td key={"add_dialog_stat_header_background"} id="background">Background</td>
                    <td key={"add_dialog_stat_header_gear"}>Gear</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {showNameAndType ? <td>{character.name}</td> : null}
                    {showNameAndType ? <td>{`${isCaptain(character.type) ? CharactersEnum.Captain : "First Mate"}`}</td> : null}
                    <StatsRenderer member={character} stats={getStatsWithGear(character.stats, statModifications, character.gear)} />
                    <td>{character.level}</td>
                    <td>{character.background || "?"}</td>
                    <td>{`${gearSlotsUsed}/${character.gearSlots}`}</td>
                </tr>
            </tbody>
        </table>
    </div>;
