import React, { useState } from "react";
import ReactDOM from "react-dom";
import { connect, useDispatch } from "react-redux";
import * as SoldierList from "../data/Soldiers.json";
import { AddIcon, DeleteItemIcon } from "../images/index";
import { ADD_SOLDIERS } from "../redux/actions";
import { Soldier, StatsEnum } from "../types/Characters";
import { SoldierGroups, SoldierMetadata } from "../types/Metadata";
import { CrewState } from "../types/State";
import { getStatStrings } from "../Utils";
import { InputComponent } from "./InputControl";

const listOfSoldiers = SoldierList.Soldiers as SoldierMetadata[];

export const AddCrewDialog = ({ soldiersState, credits, callback }: { soldiersState: Soldier[]; credits: number; callback(value: React.SetStateAction<boolean>): void }) => {
    const position = document.getElementById("root")?.getBoundingClientRect();
    const cssProperties = { top: (position?.top || 0) + 5, left: (position?.left || 0) + 5, width: (position?.width || 0) - 10, height: (position?.height || 0) - 10 };
    const [soldiers, setSoldiers] = useState<Soldier[]>([]);
    const updateName = (name: string, id: number) => {
        const idx = soldiers.findIndex((soldier) => soldier.id === id);
        if (idx !== -1) {
            setSoldiers([...soldiers.slice(0, idx), { ...soldiers[idx], name }, ...soldiers.slice(idx + 1)]);
        }
    };
    const dispatch = useDispatch();
    const canSubmit = () => soldiersState.length + soldiers.length <= 8 && [...soldiersState, ...soldiers].filter((soldier) => soldier.group === SoldierGroups.Specialist).length <= 4;
    const soldierSelection = (isSpecialist: boolean) => {
        const list = listOfSoldiers.filter((soldier) => soldier.group === (isSpecialist ? SoldierGroups.Specialist : SoldierGroups.Standard));
        const half = Math.ceil(list.length / 2);
        return <div className="add-soldier-list-container">
            <div className="add-soldier-list-header">{`${isSpecialist ? "Specialist" : "Standard"} Soldiers`}</div>
            {list.map((soldier, idx) =>
                <div
                    style={idx >= half ? { gridArea: `${(idx - half) + 2} / 2` } : {}}
                    className="add-soldier-list-item"
                    onClick={() => setSoldiers([...soldiers, { ...soldier, name: "", gearSlots: 1, id: soldiers.length + 1 }])}>
                    <img className="add_dialog_icons" src={AddIcon} />
                    <div className="add_dialog_soldier_selection">{`${soldier.type} ( ${soldier.cost} \xA5 )`}</div>
                </div>
            )}
        </div>
            ;
    };
    return (
        ReactDOM.createPortal(
            <div className="block-background">
                <div style={cssProperties} className="modal">
                    <div className="modal-header">Hire new crew members</div>
                    {soldierSelection(false)}
                    {soldierSelection(true)}
                    <table className="character-table">
                        <thead>
                            <tr>
                                <td key={"add_dialog_stat_header_name"}>Name</td>
                                <td key={"add_dialog_stat_header_type"}>Type</td>
                                {Object.keys(StatsEnum).map((stat) => <td key={`add_dialog__stat_header_${stat}`}>{stat}</td>)}
                                <td key={"add_dialog_stat_header_gear"}>Gear</td>
                                <td key={"add_dialog_stat_header_cost"}>Cost</td>
                            </tr>
                        </thead>
                        <tbody>
                            {soldiers.map((soldier) => <tr>
                                <td key={`add_dialog_name_${soldier.name}`}>
                                    <InputComponent callback={(name: string) => updateName(name, soldier.id)} currentState={soldier.name} tooltip="Enter name" cssClass="input-field" />
                                </td>
                                <td key={`add_dialog_type_${soldier.type}`}>{soldier.type}</td>
                                {getStatStrings(soldier.stats).map((stat) => <td key={`add_dialog_${soldier.name}_stat_${Object.keys(stat)[0]}`}>{stat[Object.keys(stat)[0]]}</td>)}
                                {soldier.gear.length > 0 ? soldier.gear.map((gear) => <div key={`add_dialog_gear_${soldier.name}_${gear}`} className="gear-div">{gear}</div>) : <td>-</td>}
                                <td key={`add_dialog_cost_${soldier.cost}`}>{`${soldier.cost} \xA5`}</td>
                                <td onClick={() => setSoldiers(soldiers.filter((sold) => sold.id !== soldier.id))}>
                                    <img className="add_dialog_icons" src={DeleteItemIcon} />
                                </td>
                            </tr>)}
                            <tr style={{ fontSize: "1.1rem" }}>
                                <td className="totals-td">Total</td>
                                <td className="totals-td" />
                                <td className="totals-td" />
                                <td className="totals-td" />
                                <td className="totals-td" />
                                <td className="totals-td" />
                                <td className="totals-td" />
                                <td className="totals-td" />
                                <td className="totals-td" />
                                <td className="totals-td" style={{ fontWeight: "bold" }}>{`${soldiers.reduce((acc, soldier) => acc + soldier.cost, 0)} \xA5`}</td></tr>
                        </tbody>
                    </table>
                    {[...soldiersState, ...soldiers].filter((soldier) => soldier.group === SoldierGroups.Specialist).length > 4 ? <div>You are not allowed to have more than 4 'Specialist' Soldiers in your crew</div> : null}
                    {soldiersState.length + soldiers.length > 8 ? <div>You are not allowed to have more than 8 Soldiers in total in your crew</div> : null}
                    {soldiers.reduce((acc, soldier) => acc + soldier.cost, 0) > credits ? <div>{"You don't have enough credits ( \xA5 ) to hire all of these crew men"} </div> : null}
                    <button
                        onClick={(e) => {
                            callback(false);
                            dispatch({ type: ADD_SOLDIERS, payload: soldiers });
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className={canSubmit() ? "button-enabled" : "button-disabled"}>
                        Hired!</button>
                    <button
                        onClick={(e) => {
                            callback(false);
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="button-cancel">
                        Cancel</button>
                </div>
            </div>,
            document.getElementById("crewRoster") as HTMLElement
        )
    );
};

const mapStateToProps = (state: CrewState) => ({ soldiersState: state.Soldiers, credits: state.Credits });

export const AddCrewDialogComponent = connect(mapStateToProps)(AddCrewDialog);
