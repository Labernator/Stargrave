import * as Characters from "../data/Characters.json";
import { Character, StatsEnum } from "../types/Characters";
import { CharacterMetadata } from "../types/Metadata";
import { getStatStrings, getStatsWithGear, isCaptain } from "../Utils";

const baseCaptain = Characters.Captain as CharacterMetadata;
const baseFirstMate = Characters.FirstMate as CharacterMetadata;

export const CharacterStatusBarTable = ({ character, gearSlotsUsed }: { character: Character; gearSlotsUsed: number }) =>
    <table className="character-statusbar-table">
        <colgroup>
            <col style={{ width: "14%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "14%" }} />
        </colgroup>
        <thead>
            <tr className="small-text">
                {Object.keys(StatsEnum).map((stat) => <td key={`add_dialog__stat_header_${stat}`}>{stat}</td>)}
                <td key={"add_dialog_stat_header_gear"}>Gear</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                {getStatStrings(getStatsWithGear(character.stats, {}, character.gear)).map((stat) =>
                    <td
                        className={getStatsWithGear(character.stats, {}, character.gear)[Object.keys(stat)[0] as StatsEnum] !== (isCaptain(character.type) ? baseCaptain : baseFirstMate).stats[Object.keys(stat)[0] as StatsEnum] ? "improved-stat" : ""}
                        key={`add_dialog_${character.name}_stat_${Object.keys(stat)[0]}`}>
                        {stat[Object.keys(stat)[0]]}
                    </td>
                )}
                <td>{`${gearSlotsUsed}/${character.gearSlots}`}</td>
            </tr>
        </tbody>
    </table>;
