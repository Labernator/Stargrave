import React, { useContext, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { PageBackBtnComponent } from "../../components/common/BackButton";
import { CargoTile, TileButton } from "../../components/DetailsTile";
import { UpgradeItem } from "../../components/ListItem";
import { getUpgradeImage } from "../../images";
import { SHIP_UPGRADE } from "../../redux/actions";
import { CrewState, ShipUpgrade } from "../../types";
import { getShipUpgrades } from "../../Utils";
export const ShipUpgradesPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const dispatch = useDispatch();
    const [confirmation, setConfirmation] = useState<ShipUpgrade | undefined>(undefined);

    const UpgradeDialog = () => <React.Fragment>
        {confirmation ? <div className="modal">
            <div className="modal-header">Do you really want to buy this upgrade?</div>
            <CargoTile
                icon={getUpgradeImage(confirmation)}
                name={confirmation.name}
                details={confirmation.notes}
                bottomButton={
                    <TileButton
                        isDisabled={confirmation.cost > state.Credits}
                        clickHandler={() => {
                            dispatch({ type: SHIP_UPGRADE, payload: { name: confirmation.name, cost: confirmation.cost } });
                            setConfirmation(undefined);
                        }}
                        text={`Upgrade your ship for ${confirmation.cost} \xA5`}
                    />
                }
            />
            <div style={{ padding: "1rem 2rem", marginLeft: "1rem", textAlign: "center" }} className="page-btn" onClick={() => setConfirmation(undefined)}>Back</div>
        </div> : undefined}
    </React.Fragment>;
    const Upgrades = () => <div className="flex-container">
        <div className="chapter-header">Purchase upgrades</div>
        {getShipUpgrades().map((upgrade) =>
            <UpgradeItem
                clickHandler={() => !state.ShipUpgrades.find((shipUpgrades) => shipUpgrades === upgrade.name) ? setConfirmation(upgrade) : undefined}
                isDisabled={false}
                isSelected={!!state.ShipUpgrades.find((shipUpgrades) => shipUpgrades === upgrade.name)}
                item={upgrade} />)}
        <PageBackBtnComponent />
    </div>;
    return <React.Fragment>
        {<UpgradeDialog />}
        <Upgrades />
    </React.Fragment>;
};
