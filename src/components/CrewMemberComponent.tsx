import { Soldier, StatsEnum } from "../types/Characters";
import { getStatStrings } from "../Utils";

export const CrewMemberComponent = ({ soldier }: { soldier: Soldier }) => {
    const renderStats = () => <tr>
        {getStatStrings(soldier.stats).map((stat) => <td key={`${soldier.type}_stat_${Object.keys(stat)[0]}`}>{stat[Object.keys(stat)[0]]}</td>)}
        <td>{soldier.gear.length > 0 ? soldier.gear.join(", ") : "-"}</td>
    </tr>;

    return <div key={`${soldier.type}_tile`} className="character-tile">
        <div className="character-title">
            <div className="character-title-left">{soldier.amount}x {soldier.type}</div>
            <div className="character-title-right">{`${soldier.type} (${soldier.cost * soldier.amount})`}</div>
        </div>
        <table className="character-table">
            <thead>
                <tr>
                    {Object.keys(StatsEnum).map((stat) => <td key={`${soldier.type}_stat_header_${stat}`}>{stat}</td>)}
                    <td>Gear</td>
                </tr>
            </thead>
            <tbody>
                {renderStats()}

            </tbody>
        </table>
    </div>;
};
