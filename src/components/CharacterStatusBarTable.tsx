import * as Characters from "../data/Characters.json";
import { Character, CharacterMetadata, Soldier, StatsEnum } from "../types";
import { getStatStrings, getStatsWithGear, isCaptain } from "../Utils";

const baseCaptain = Characters.Captain as CharacterMetadata;
const baseFirstMate = Characters.FirstMate as CharacterMetadata;

export const CharacterStatusBarTable = ({ character, gearSlotsUsed, isTileTable }: { character: Character; gearSlotsUsed: number; isTileTable?: boolean }) =>
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
            <tr className={isTileTable ? "centered-text" : ""}>
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

export const SoldierStatusBarTable = ({ soldier, gearSlotsUsed, isTileTable }: { soldier: Soldier; gearSlotsUsed: number; isTileTable?: boolean }) =>
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
            <tr className={isTileTable ? "centered-text" : ""}>
                {getStatStrings(soldier.stats).map((stat) =>
                    <td
                        key={`add_dialog_${soldier.type}_stat_${Object.keys(stat)[0]}`}>
                        {stat[Object.keys(stat)[0]]}
                    </td>
                )}
                <td>{`${gearSlotsUsed}/1`}</td>
            </tr>
        </tbody>
    </table>;
