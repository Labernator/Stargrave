import { Soldier, StatsEnum } from "../types/Characters";
import { getStatStrings } from "../Utils";
import { GearLabels } from "./GearLabels";

export const CrewMemberComponent = ({ soldier }: { soldier: Soldier }) =>
    <div key={`${soldier.type}_tile`} className="character-tile" style={{ width: "calc(48vw - 1rem)" }}>
        <div className="statusbar-tiles">
            <table style={{ textAlign: "center" }}>
                <colgroup>
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "8%" }} />
                </colgroup>
                <thead>
                    <tr className="small-text">
                        <td>Soldier</td>
                        {Object.keys(StatsEnum).map((stat) => <td key={`add_dialog__stat_header_${stat}`}>{stat}</td>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{soldier.amount}x {soldier.type}</td>
                        {getStatStrings(soldier.stats).map((stat) =>
                            <td
                                key={`add_dialog_${soldier.type}_stat_${Object.keys(stat)[0]}`}>
                                {stat[Object.keys(stat)[0]]}
                            </td>
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
        <div style={{ float: "left", width: "100%" }}>
            <div className="modal-header" style={{ padding: "0.2rem" }}>Gear</div>
            <GearLabels gearList={soldier.gear} />
        </div>
    </div>;
