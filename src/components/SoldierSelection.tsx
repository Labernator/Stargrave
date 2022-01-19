import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as SoldierList from "../data/Soldiers.json";
import { AddIcon, getSoldierImage, MinusIcon } from "../images";
import { ADD_SOLDIERS } from "../redux/actions";
import { CrewState, Soldier, SoldierGroups, SoldierMetadata } from "../types";
import { Carousel } from "./characterDialog/Carousel";
import { SoldierComponent } from "./SoldierComponent";
import { CrewSizeComponent } from "./statusbar/CrewSizeComponent";
import { TreasuryComponent } from "./statusbar/TreasuryComponent";

const listOfSoldiers = SoldierList.Soldiers as SoldierMetadata[];

const SoldierSelection = ({ credits }: { credits: number }) => {
    const [soldiers, setSoldiers] = useState<Soldier[]>([]);
    const [previewSoldier, setPreviewSoldier] = useState<SoldierMetadata>();
    const [lastPreviewSoldier, setLastPreviewSoldier] = useState<SoldierMetadata | undefined>(undefined);
    useEffect(() => {
        if (previewSoldier) {
            setLastPreviewSoldier(previewSoldier);
        }
    }, [previewSoldier]);
    const dispatch = useDispatch();
    const history = useHistory();
    const getCurrentSoldierAmount = (soldierType: string) => soldiers.find((soldier) => soldier.type === soldierType)?.amount || 0;
    const soldierCount = () => soldiers.reduce((acc, soldier) => soldier.amount + acc, 0);
    const specialistCount = () => soldiers.filter((soldier) => soldier.group === SoldierGroups.Specialist).reduce((acc, specialist) => specialist.amount + acc, 0);
    const hiringCost = () => soldiers.reduce((acc, soldier) => acc + (soldier.amount * soldier.cost), 0);
    const canSubmit = () => soldierCount() <= 8 && specialistCount() <= 4 && hiringCost() <= credits;

    const renderSoldierTile = (soldier: SoldierMetadata) => <div
        key={`add-character-${soldier.type}`}
        className={getCurrentSoldierAmount(soldier.type) > 0 ? "add-character-background selected" : "add-character-background"}
        onClick={() => setPreviewSoldier(soldier)}>
        <img style={{ paddingTop: "0.35rem" }} className="add-character-background-icons" src={getSoldierImage(soldier.type)} alt={`add-character-${soldier.type}-icon`} />
        <div className="soldier-cost">{`${soldier.cost} \xA5`}</div>
        <div style={{ paddingTop: "0.35rem" }} className="large-text">{`${soldier.type}`}</div>
        {soldier.group === SoldierGroups.Specialist ? <div className="medium-text">Specialist</div> : null}
        {getCurrentSoldierAmount(soldier.type) > 0 ? <div className="soldier-type">{getCurrentSoldierAmount(soldier.type)}x</div> : null}
    </div>;

    return <React.Fragment>
        <div key="statusbar" id="statusbar" className="statusbar">
            <div className="statusbar-tiles" style={{ height: "3rem" }}>
                <div className="toolbar-two-column-header-text">Hire your crew</div>
                <div className="small-text">{"You need to hire 8 Soldiers. \n Only 4 may be Specialists"}</div>
            </div>
            <CrewSizeComponent externalStyles={{ width: "calc(35% - 1.1rem)" }} virtualCrewSize={soldierCount() + 2} />
            <TreasuryComponent virtualCredits={credits - hiringCost()} />
        </div>
        {previewSoldier ?
            <React.Fragment>
                <div className="modal-header">Soldier details</div>
                <SoldierComponent soldier={{ ...previewSoldier, amount: 0, gearSlots: 1 }} />
                <div className="modal-header">Use the Plus/Minus buttons below to hire some of these soldiers if they suit your needs</div>
                <div className="soldier-selection-amount">
                    <div
                        className="btn"
                        onClick={() => {
                            const soldierIdx = soldiers.findIndex((sol) => sol.type === previewSoldier.type);
                            if (soldierIdx !== -1) {
                                if (soldiers[soldierIdx].amount === 1) {
                                    setSoldiers(soldiers.filter((sol) => sol.type !== previewSoldier.type));
                                } else {
                                    setSoldiers([...soldiers.slice(0, soldierIdx), { ...soldiers[soldierIdx], amount: soldiers[soldierIdx].amount - 1 }, ...soldiers.slice(soldierIdx + 1)]);
                                }
                            }
                        }}><img alt="minusicon" style={{ width: "3rem" }} src={MinusIcon} /></div>
                    <div className="very-large-text">{getCurrentSoldierAmount(previewSoldier.type)}</div>
                    <div
                        className="btn"
                        onClick={() => {
                            const soldierIdx = soldiers.findIndex((sol) => sol.type === previewSoldier.type);
                            if (soldierIdx !== -1) {
                                setSoldiers([...soldiers.slice(0, soldierIdx), { ...soldiers[soldierIdx], amount: soldiers[soldierIdx].amount + 1 }, ...soldiers.slice(soldierIdx + 1)]);
                            } else {
                                setSoldiers([...soldiers, { ...previewSoldier, amount: 1, gearSlots: 1 }]);
                            }
                        }}><img alt="plusicon" style={{ width: "3rem" }} src={AddIcon} /></div>
                </div>
            </React.Fragment> :
            <Carousel splitSize={10} resetPage={lastPreviewSoldier ? Math.ceil(listOfSoldiers.findIndex((soldier) => soldier.type === lastPreviewSoldier?.type) / 10) : 1} inputDivs={listOfSoldiers.map(renderSoldierTile)} />}
        {specialistCount() > 4 ?
            <div>You are not allowed to have more than 4 'Specialist' Soldiers in your crew</div> :
            null}
        {soldierCount() > 8 ? <div>You are not allowed to have more than 8 Soldiers in total in your crew</div> : null}
        {hiringCost() > credits ? <div>{"You don't have enough credits ( \xA5 ) to hire all of these crew men"} </div> : null}
        {previewSoldier ? <button
            onClick={(event) => {
                setPreviewSoldier(undefined);
                event.preventDefault();
                event.stopPropagation();
            }}
            className={"dialog-btn back-btn foreground"}
        >Back</button> :
            <button
                onClick={(e) => {
                    if (canSubmit()) {
                        dispatch({ type: ADD_SOLDIERS, payload: soldiers });
                        history.push("/CrewOverview");
                    }
                    e.preventDefault();
                    e.stopPropagation();
                }}
                className={canSubmit() ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}>
                Confirm Staffing</button>}
    </React.Fragment>;
};

const mapStateToProps = (state: CrewState) => ({ credits: state.Credits });

export const SoldierSelectionComponent = connect(mapStateToProps)(SoldierSelection);
