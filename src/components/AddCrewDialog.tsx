import React, { useState } from "react";
import ReactDOM from "react-dom";
import { connect, useDispatch } from "react-redux";
import * as SoldierList from "../data/Soldiers.json";
import { ADD_SOLDIERS } from "../redux/actions";
import { Soldier, StatsEnum } from "../types/Characters";
import { SoldierGroups, SoldierMetadata } from "../types/Metadata";
import { CrewState } from "../types/State";
import { getStatStrings } from "../Utils";
import { CrewSizeComponent } from "./statusbar/CrewSizeComponent";
import { ExitComponent } from "./statusbar/ExitComponent";
import { TreasuryComponent } from "./statusbar/TreasuryComponent";

const listOfSoldiers = SoldierList.Soldiers as SoldierMetadata[];

export const AddCrewDialog = ({ soldiersState, credits, callback }: { soldiersState: Soldier[]; credits: number; callback(value: React.SetStateAction<boolean>): void }) => {
    const [soldiers, setSoldiers] = useState<Soldier[]>([]);
    const dispatch = useDispatch();
    const soldierCount = () => soldiersState.reduce((acc, soldier) => soldier.amount + acc, 0) + soldiers.reduce((acc, soldier) => soldier.amount + acc, 0);
    const specialistCount = () => [...soldiersState, ...soldiers].filter((soldier) => soldier.group === SoldierGroups.Specialist).reduce((acc, specialist) => specialist.amount + acc, 0);
    const hiringCost = () => soldiers.reduce((acc, soldier) => acc + (soldier.amount * soldier.cost), 0);
    const canSubmit = () => soldierCount() <= 8 && specialistCount() <= 4 && hiringCost() <= credits;
    const soldierSelection = (isSpecialist: boolean) => {
        const list = listOfSoldiers.filter((soldier) => soldier.group === (isSpecialist ? SoldierGroups.Specialist : SoldierGroups.Standard));
        const half = Math.ceil(list.length / 2);
        return <div className="add-soldier-list-container">
            <div className="add-soldier-list-header">{`${isSpecialist ? "Specialist" : "Standard"} Soldiers ${isSpecialist ? "(max. 4 per crew)" : ""}`}</div>
            {list.map((soldier, idx) =>
                <div
                    key={`soldier-selection-${soldier.type}`}
                    style={{ gridArea: idx >= half ? `${(idx - half) + 2} / 2` : "", clear: idx === 0 ? "both" : "none", margin: "0.2rem 0.4rem 0.2rem 0rem" }}
                    className={soldierCount() >= 8 || (isSpecialist && specialistCount() >= 4) || soldier.cost > credits - hiringCost() ? "background-power-selection disabled" : "background-power-selection"}
                    onClick={() => {
                        if (soldierCount() > 8 || (isSpecialist && specialistCount() >= 4) || soldier.cost > credits - hiringCost()) {
                            return;
                        }
                        const solderIdx = soldiers.findIndex((sol) => sol.type === soldier.type);
                        if (solderIdx !== -1) {
                            setSoldiers([...soldiers.slice(0, solderIdx), { ...soldiers[solderIdx], amount: soldiers[solderIdx].amount + 1 }, ...soldiers.slice(solderIdx + 1)]);
                        } else {
                            setSoldiers([...soldiers, { ...soldier, gearSlots: 1, id: soldiers.length + 1, amount: 1 }]);
                        }
                    }}>
                    <div className="add_dialog_soldier_selection">{`${soldier.type} ( ${soldier.cost} \xA5 )`}</div>
                </div>
            )}
        </div>
            ;
    };
    const renderSoldierTableEntries = (soldiersToRender: Soldier[], currentCrew?: boolean) => soldiersToRender.map((soldier) => <tr style={{ background: currentCrew ? "#d3d3d3" : "transparent" }}>
        <td key={`add_dialog_type_${soldier.type}`}>{soldier.type}</td>
        <td key={`add_dialog_amount_${soldier.amount}`}>
            {!currentCrew ? <div style={{ float: "left", fontWeight: "bold", fontSize: "1.2rem" }} onClick={() => {
                const soldierIdx = soldiers.findIndex((sol) => sol.type === soldier.type);
                if (soldierIdx !== -1) {
                    setSoldiers([...soldiers.slice(0, soldierIdx), { ...soldiers[soldierIdx], amount: soldiers[soldierIdx].amount + 1 }, ...soldiers.slice(soldierIdx + 1)]);
                }
            }}>+</div> : null}
            <div style={!currentCrew ? { float: "left", paddingLeft: "1.5rem", paddingTop: "0.2rem" } : {}}>{soldier.amount}x</div>
            {!currentCrew ? <div style={{ float: "right", fontWeight: "bold", fontSize: "1.2rem" }} onClick={() => {
                const soldierIdx = soldiers.findIndex((sol) => sol.type === soldier.type);
                if (soldierIdx !== -1) {
                    const amt = soldiers[soldierIdx].amount;
                    if (amt === 1) {
                        setSoldiers(soldiers.filter((sold) => sold.id !== soldier.id));
                    } else {
                        setSoldiers([...soldiers.slice(0, soldierIdx), { ...soldiers[soldierIdx], amount: soldiers[soldierIdx].amount - 1 }, ...soldiers.slice(soldierIdx + 1)]);
                    }
                }
            }}>-</div> : null}
        </td>
        <td key={`add_dialog_cost_${soldier.cost}`}>{currentCrew ? " - " : `${soldier.cost} \xA5`}</td>

        {getStatStrings(soldier.stats).map((stat) => <td key={`add_dialog_${soldier.type}_stat_${Object.keys(stat)[0]}`}>{stat[Object.keys(stat)[0]]}</td>)}
        <td>{soldier.gear.length > 0 ? `${soldier.gear.join(", ")}` : "-"}</td>

        {/* {currentCrew ? null : <td onClick={() => setSoldiers(soldiers.filter((sold) => sold.id !== soldier.id))}>
            <img className="add_dialog_icons" src={DeleteItemIcon} alt="deleteIcon" />
        </td>} */}
    </tr>);

    return (
        ReactDOM.createPortal(
            <div className="block-background">
                <div className="modal">
                    <div className="compact-statusbar" >
                        <div className="statusbar-tiles" style={{ minWidth: "14rem" }}>
                            <div className="toolbar-two-column-header-text">Hire new crew members</div>
                            <div className="small-text">Max 8 crew members can be hired. Of that only 4 may be Specialists</div>
                        </div>
                        <CrewSizeComponent compactView={true} />
                        <TreasuryComponent compactView={true} />
                        <ExitComponent compactView={true} clickFn={(e) => {
                            callback(false);
                            e.preventDefault();
                            e.stopPropagation();
                        }} />
                    </div>

                    {soldierSelection(false)}
                    {soldierSelection(true)}
                    <table className="character-table">
                        <thead>
                            <tr>
                                <td key={"add_dialog_stat_header_type"}>Type</td>
                                <td key={"add_dialog_stat_header_name"}>Amount</td>
                                <td key={"add_dialog_stat_header_cost"}>Cost</td>

                                {Object.keys(StatsEnum).map((stat) => <td key={`add_dialog__stat_header_${stat}`}>{stat}</td>)}
                                <td key={"add_dialog_stat_header_gear"}>Gear</td>

                            </tr>
                        </thead>
                        <tbody>
                            {renderSoldierTableEntries(soldiersState, true)}
                            {renderSoldierTableEntries(soldiers)}
                            <tr style={{ fontSize: "1.1rem" }}>
                                <td className="totals-td" >Total</td>
                                <td className="totals-td">{soldierCount()} / 8</td>
                                <td className="totals-td" style={{ fontWeight: "bold" }}>{`${hiringCost()} \xA5`}</td>

                                <td className="totals-td" />
                                <td className="totals-td" />
                                <td className="totals-td" />
                                <td className="totals-td" />
                                <td className="totals-td" />
                                <td className="totals-td" />
                                <td className="totals-td" ></td>
                            </tr>
                        </tbody>
                    </table>
                    {specialistCount() > 4 ?
                        <div>You are not allowed to have more than 4 'Specialist' Soldiers in your crew</div> :
                        null}
                    {soldierCount() > 8 ? <div>You are not allowed to have more than 8 Soldiers in total in your crew</div> : null}
                    {hiringCost() > credits ? <div>{"You don't have enough credits ( \xA5 ) to hire all of these crew men"} </div> : null}
                    <button
                        onClick={(e) => {
                            if (canSubmit()) {
                                callback(false);
                                dispatch({ type: ADD_SOLDIERS, payload: soldiers });
                            }
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className={canSubmit() ? "power-btn" : "power-btn disabled"}>
                        Confirm Staffing</button>
                </div>
            </div>,
            document.getElementById("crewRoster") as HTMLElement
        )
    );
};

const mapStateToProps = (state: CrewState) => ({ soldiersState: state.Soldiers, credits: state.Credits });

export const AddCrewDialogComponent = connect(mapStateToProps)(AddCrewDialog);
