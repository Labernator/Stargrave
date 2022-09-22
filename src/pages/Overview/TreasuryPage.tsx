import React, { useContext, useState } from "react";
import { ReactReduxContext } from "react-redux";
import { BackButtonComponent } from "../../components/common/BackButton";
import { CrewState } from "../../types";
import { ShoppingPage } from "./ShoppingPage";
import { TransactionHistoryPage } from "./TransactionHistoryPage";
export const TreasuryPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const [showLog, setShowLog] = useState<boolean>(false);
    return <React.Fragment>
        <div className={"pdf-switch"}>
            <div onClick={() => setShowLog(false)} className={showLog ? "selected pdf-sub-switch" : "pdf-sub-switch"}>Shopping</div>
            <div onClick={() => setShowLog(true)} style={{ borderLeft: "1px solid" }} className={showLog ? "pdf-sub-switch" : "selected pdf-sub-switch"}>Transaction Log</div>
        </div>
        {showLog ? <TransactionHistoryPage /> : <ShoppingPage />}
        <BackButtonComponent />
    </React.Fragment>;
};
