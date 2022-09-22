import React, { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { BackButtonComponent } from "../../components/common/BackButton";
import { TreasuryIcon } from "../../images";
import { CrewState } from "../../types";
export const TransactionHistoryPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    return <div className="flex-container" >
        <div style={{ overflowY: "scroll" }}>
            <div className="chapter-header">Transaction log</div>
            {
                state.CreditRecords.map((record) => <div className="transaction-list">
                    <div>{record.record}</div>
                    <div style={{ textAlign: "center" }}>{record.sign ? "+" : "-"} {`${record.credits} \xA5`}</div>
                </div>)
            }
            <div
                className="transaction-sum"
                title={"Current amount of credits in your treasury"}>
                <div>Current Treasury</div>
                <img
                    style={{ placeSelf: "normal" }}
                    src={TreasuryIcon}
                    className={"toolbar-compact-icon"}
                    id={"TreasuryIcon"}
                    alt={"TreasuryIcon"}>
                </img>
                <div style={{ fontSize: "1.5rem" }}>
                    {`${state.Credits} \xA5`}
                </div>
            </div>
        </div>
        <BackButtonComponent />
    </div >;
};
