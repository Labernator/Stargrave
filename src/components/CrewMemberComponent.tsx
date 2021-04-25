import React from "react";
import { Soldier, StatsEnum } from "../types/Characters";
import { getStatStrings } from "../Utils";

export const CrewMemberComponent = ({ soldier }: { soldier: Soldier }) => {
    const renderStats = () => <tr>
        {/* <td>{soldier.name}</td> */}
        {getStatStrings(soldier.stats).map((stat) => <td key={`${soldier.name}_stat_${Object.keys(stat)[0]}`}>{stat[Object.keys(stat)[0]]}</td>)}
        <td>{soldier.gear.length > 0 ? soldier.gear.join(", ") : "-"}</td>
    </tr>;

    return <div key={`${soldier.name}_tile`} className="character-tile">
        <div className="character-title">
            <div className="character-title-left">{soldier.name}</div>
            <div className="character-title-right">{soldier.type} ({soldier.cost})</div>
        </div>
        <table className="character-table">
            <thead>
                <tr>
                    {/* <td key={`${soldier.name}_stat_header_name`}>Name</td> */}
                    {Object.keys(StatsEnum).map((stat) => <td key={`${soldier.name}_stat_header_${stat}`}>{stat}</td>)}
                    <td>Gear</td>
                </tr>
            </thead>
            <tbody>
                {renderStats()}

            </tbody>
        </table>
    </div>;
};
