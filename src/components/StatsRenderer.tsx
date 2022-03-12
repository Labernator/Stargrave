import React from "react";
import { Character, Soldier, Stats, StatsEnum } from "../types";
import { getBaseCaptain, getBaseFirstMate, getCurrentStatStrings, isCaptain, isCharacter } from "../Utils";

export const StatsRenderer = ({ stats, member }: { stats: Stats; member: Character | Soldier }) => {
    const currentStats = Object.entries(getCurrentStatStrings(stats, member.currentHealth));
    const cells: JSX.Element[] = [];
    for (const [key, value] of currentStats) {
        cells.push(<td
            className={
                isCharacter(member) && stats[key as StatsEnum] !== (isCaptain(member.type) ?
                    getBaseCaptain() : getBaseFirstMate()).stats[key as StatsEnum] ? "improved-stat" : ""
            }
            key={`add_dialog_${isCharacter(member) ? member.name : member.type}_stat_${key}`
            }>
            {value}
        </td>);
    }
    return <React.Fragment>{cells}</React.Fragment>;
};
