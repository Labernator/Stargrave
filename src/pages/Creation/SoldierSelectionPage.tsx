import React, { useContext, useEffect, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Carousel } from "../../components/common/Carousel";
import { CustomBackButtonComponent } from "../../components/common/CustomBackButton";
import { SoldierDialog } from "../../components/SoldierDialog";
import { CrewSizeComponent } from "../../components/statusbar/CrewSizeComponent";
import { TreasuryComponent } from "../../components/statusbar/TreasuryComponent";
import * as SoldierList from "../../data/Soldiers.json";
import { getSoldierImage } from "../../images";
import { ADD_SOLDIERS } from "../../redux/actions";
import { CrewState, Soldier, SoldierGroups, SoldierMetadata } from "../../types";

const listOfSoldiers = SoldierList.Soldiers as SoldierMetadata[];

export const SoldierSelectionPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
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
    const getCurrentSoldierAmount = (soldierType: string) => soldiers.filter((soldier) => soldier.type === soldierType)?.length || 0;
    const specialistCount = () => soldiers.filter((soldier) => soldier.group === SoldierGroups.Specialist).length;
    const hiringCost = () => soldiers.reduce((acc, soldier) => acc + soldier.cost, 0);
    const canSubmit = () => soldiers.length <= 8 && specialistCount() <= 4 && hiringCost() <= state.Credits;

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
            <div style={{ display: "flex", width: "-webkit-fill-available", justifyContent: "space-between" }}>
                <CrewSizeComponent virtualCrewSize={soldiers.length + state.Soldiers.length + 2} />
                <TreasuryComponent virtualCredits={state.Credits - hiringCost()} />
            </div>
        </div>
        <div className="chapter-header">Hire your crew</div>
        {previewSoldier ? <SoldierDialog previewSoldier={previewSoldier} otherSoldiers={soldiers.filter((sol) => sol.type === previewSoldier.type)} callbackHandler={(soldier) => setSoldiers([...soldiers, soldier])} /> :
            <Carousel splitSize={10} resetPage={lastPreviewSoldier ? Math.ceil(listOfSoldiers.findIndex((soldier) => soldier.type === lastPreviewSoldier?.type) / 10) : 1} inputDivs={listOfSoldiers.map(renderSoldierTile)} />}
        {specialistCount() > 4 ?
            <div>You are not allowed to have more than 4 'Specialist' Soldiers in your crew</div> :
            null}
        {soldiers.length > 8 ? <div>You are not allowed to have more than 8 Soldiers in total in your crew</div> : null}
        {hiringCost() > state.Credits ? <div>{"You don't have enough credits ( \xA5 ) to hire all of these crew men"} </div> : null}
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
                className={canSubmit() ? "page-btn selected" : "dialog-btn confirm-btn disabled"}>
                Confirm Staffing</button>
        }
        <CustomBackButtonComponent dispatchFunction={() => undefined} customHistory={() => history.push("/CrewOverview")} />
    </React.Fragment>;
};
