import React from "react";
import * as Characters from "../data/Characters.json";
import { Character, Stats, StatsEnum } from "../types/Characters";
import { CharacterMetadata } from "../types/Metadata";
import { getStatStrings, isCaptain } from "../Utils";
import { InputComponent } from "./InputControl";

const baseCaptain = Characters.Captain as CharacterMetadata;
const baseFirstMate = Characters.FirstMate as CharacterMetadata;

export const CharacterTable = (
    { character, statModifications, setNameCallback }:
        { character: Character; statModifications: Partial<Stats>; setNameCallback(value: React.SetStateAction<string>): void }
) => {
    const improvedStats = () => Object.keys(character.stats).reduce(
        (acc, stat) => ({ ...acc, [stat]: character.stats[stat as StatsEnum] + (statModifications[stat as StatsEnum] || 0) }),
        { "Move": 0, "Fight": 0, "Shoot": 0, "Armour": 0, "Will": 0, "Health": 0 }
    );
    const smallWidth = character.background ? "8%" : "10%";
    return <table className="character-table">
        <colgroup>
            <col style={{ width: "30%" }} />
            <col style={{ width: smallWidth }} />
            <col style={{ width: smallWidth }} />
            <col style={{ width: smallWidth }} />
            <col style={{ width: smallWidth }} />
            <col style={{ width: smallWidth }} />
            <col style={{ width: smallWidth }} />
            <col style={{ width: smallWidth }} />
            {character.background ? <col style={{ width: smallWidth }} /> : null}
        </colgroup>
        <thead>
            <tr>
                <td key={"add_dialog_stat_header_name"}>Name</td>
                {Object.keys(StatsEnum).map((stat) => <td key={`add_dialog__stat_header_${stat}`}>{stat}</td>)}
                <td key={"add_dialog_stat_header_level"}>Level</td>
                {character.background ? <td key={"add_dialog_stat_header_gear"}>Background</td> : null}
            </tr>
        </thead>
        <tbody>
            <tr>
                <td key={`add_dialog_name_${character.name}`}>
                    <InputComponent callback={setNameCallback} currentState={character.name} tooltip={`Your ${isCaptain(character.type) ? "captain" : "first mate"} needs a proper name`} cssClass="dialog-input-field" />
                </td>
                {getStatStrings(improvedStats()).map((stat) =>
                    <td
                        className={improvedStats()[Object.keys(stat)[0] as StatsEnum] !== (isCaptain(character.type) ? baseCaptain : baseFirstMate).stats[Object.keys(stat)[0] as StatsEnum] ? "improved-stat" : ""}
                        key={`add_dialog_${character.name}_stat_${Object.keys(stat)[0]}`}>
                        {stat[Object.keys(stat)[0]]}
                    </td>
                )}
                <td>{character.level}</td>
                {character.background ? <td>{character.background}</td> : null}
            </tr>
        </tbody>
    </table>;
};
