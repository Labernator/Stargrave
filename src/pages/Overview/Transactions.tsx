import React, { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { useHistory } from "react-router-dom";
import { PageBackBtnComponent } from "../../components/common/BackButton";
import { CargoBayIcon, ShipUpgradesIcon, ShoppingIcon, TransactionLogIcon } from "../../images";
import { CrewState } from "../../types";

export const TransactionsPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;

    const history = useHistory();
    return <div className="flex-container" >
        <div className="transaction-tile">
            <div className="transaction-tile-header">Shopping</div>
            <img
                alt="file upload"
                style={{ width: "25%" }}
                src={ShoppingIcon}
                onClick={(event) => {
                    history.push("/Shopping");
                    event.preventDefault();
                    event.stopPropagation();
                }}
            />
        </div>
        <div className="transaction-tile">
            <div className="transaction-tile-header">Cargo Bay</div>
            <img
                alt="file upload"
                style={{ width: "25%" }}
                src={CargoBayIcon}
                onClick={(event) => {
                    history.push("/ShipsCargo");
                    event.preventDefault();
                    event.stopPropagation();
                }}
            />
        </div>

        <div className="transaction-tile">
            <div className="transaction-tile-header">Ship Upgrades</div>
            <img alt="file upload" style={{ width: "25%" }} src={ShipUpgradesIcon} onClick={(event) => {
                history.push("/ShipUpgrades");
                event.preventDefault();
                event.stopPropagation();
            }} />
        </div>
        <div className="transaction-tile">
            <div className="transaction-tile-header">Transaction History</div>
            <img alt="file upload" style={{ width: "25%" }} src={TransactionLogIcon} onClick={(event) => {
                history.push("/TransactionHistory");
                event.preventDefault();
                event.stopPropagation();
            }} />
        </div>
        <PageBackBtnComponent />
    </div >;
};
