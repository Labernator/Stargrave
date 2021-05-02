import * as Characters from "../data/Characters.json";
import { Character, Stats, StatsEnum } from "../types/Characters";
import { CharacterMetadata } from "../types/Metadata";
import { getStatStrings, isCaptain } from "../Utils";

const baseCaptain = Characters.Captain as CharacterMetadata;
const baseFirstMate = Characters.FirstMate as CharacterMetadata;

export const StatusBarTable = (
    { character, statModifications, gearSlotsUsed }:
        { character: Character; statModifications: Partial<Stats>; gearSlotsUsed: number }
) => {
    const improvedStats = () => Object.keys(character.stats).reduce(
        (acc, stat) => ({ ...acc, [stat]: character.stats[stat as StatsEnum] + (statModifications[stat as StatsEnum] || 0) }),
        { "Move": 0, "Fight": 0, "Shoot": 0, "Armour": 0, "Will": 0, "Health": 0 }
    );
    return <div className="statusbar-tiles"><table style={{ textAlign: "center" }}>
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
        </colgroup>
        <thead>
            <tr className="small-text">
                {Object.keys(StatsEnum).map((stat) => <td key={`add_dialog__stat_header_${stat}`}>{stat}</td>)}
                <td key={"add_dialog_stat_header_level"}>Level</td>
                <td key={"add_dialog_stat_header_gear"}>Background</td>
                <td key={"add_dialog_stat_header_gear"}>Gear</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                {getStatStrings(improvedStats()).map((stat) =>
                    <td
                        className={improvedStats()[Object.keys(stat)[0] as StatsEnum] !== (isCaptain(character.type) ? baseCaptain : baseFirstMate).stats[Object.keys(stat)[0] as StatsEnum] ? "improved-stat" : ""}
                        key={`add_dialog_${character.name}_stat_${Object.keys(stat)[0]}`}>
                        {stat[Object.keys(stat)[0]]}
                    </td>
                )}
                <td>{character.level}</td>
                <td>{character.background ? character.background.name : "?"}</td>
                <td>{`${gearSlotsUsed} / ${character.gearSlots}`}</td>
            </tr>
        </tbody>
    </table>
    </div>;
};
