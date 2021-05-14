import * as Characters from "../data/Characters.json";
import { Character, Stats, StatsEnum } from "../types/Characters";
import { CharacterMetadata } from "../types/Metadata";
import { getStatStrings, getStatsWithGear, isCaptain } from "../Utils";

const baseCaptain = Characters.Captain as CharacterMetadata;
const baseFirstMate = Characters.FirstMate as CharacterMetadata;
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
                    {showNameAndType ? <td>{`${isCaptain(character.type) ? "Captain" : "First Mate"}`}</td> : null}
                    {getStatStrings(getStatsWithGear(character.stats, statModifications, character.gear)).map((stat) =>
                        <td
                            className={getStatsWithGear(character.stats, statModifications, character.gear)[Object.keys(stat)[0] as StatsEnum] !== (isCaptain(character.type) ? baseCaptain : baseFirstMate).stats[Object.keys(stat)[0] as StatsEnum] ? "improved-stat" : ""}
                            key={`add_dialog_${character.name}_stat_${Object.keys(stat)[0]}`}>
                            {stat[Object.keys(stat)[0]]}
                        </td>
                    )}
                    <td>{character.level}</td>
                    <td>{character.background || "?"}</td>
                    <td>{`${gearSlotsUsed}/${character.gearSlots}`}</td>
                </tr>
            </tbody>
        </table>
    </div>;
