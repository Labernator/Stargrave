import { Character, Soldier, StatsEnum } from "../types";
import { getStatsWithGear, isCharacter } from "../Utils";
import { StatsRenderer } from "./StatsRenderer";

export const CharacterStatusBarTable = ({ character, gearSlotsUsed, isTileTable }: { character: Character | Soldier; gearSlotsUsed: number; isTileTable?: boolean }) =>
    <table className={isTileTable ? "character-tile-table" : "character-statusbar-table"}>
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
            <tr className={isTileTable ? "small-text centered-text" : "small-text"}>
                {Object.keys(StatsEnum).map((stat) => <td key={`add_dialog__stat_header_${stat}`}>{stat}</td>)}
                <td key={"add_dialog_stat_header_gear"}>Gear</td>
            </tr>
        </thead>
        <tbody>
            <tr className={isTileTable ? "centered-text" : ""} >
                <StatsRenderer member={character} stats={isCharacter(character) ? getStatsWithGear(character.stats, {}, character.gear) : character.stats} />
                <td style={gearSlotsUsed > character.gearSlots ? { color: "orangered" } : {}}>{`${gearSlotsUsed}/${character.gearSlots}`}</td>
            </tr>
        </tbody>
    </table>;
