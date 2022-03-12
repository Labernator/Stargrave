import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BackButtonComponent } from "../../components/common/BackButton";
import { XPDropDown } from "../../components/dropdowns/XPDropdown";
import { ADD_LOOT } from "../../redux/actions";
import { PhysicalLoot } from "./PhysicalLoot";
export const LootPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [physicalLootTokensCollected, setPhysicalLootTokensCollected] = useState<number>(0);
    const [dataLootTokensCollected, setDataLootTokensCollected] = useState<number>(0);
    return <React.Fragment>
        <div className="chapter-header">How much loot did you secure?</div>
        <div className="xp-btn">
            <div>Physical-Loot collected</div>
            <XPDropDown list={["0", "1", "2", "3", "4"]} dropdownOptions={{ id: "lootUnlocked", placeholder: "0" }} callbackFn={(nr) => setPhysicalLootTokensCollected(parseInt(nr, 10))} />
        </div>
        <div className="modal-sub-header">Physical Loot</div>
        {Array.from({ length: physicalLootTokensCollected }).map((_el, idx) => <div className="loot-btn">
            <div>Physical-Loot #{idx + 1}<br /></div>
            <PhysicalLoot />
            {/* <XPDropDown list={["Credits", "Advanced Weapon", "Advanced Tech", "Alien Artefact"]} dropdownOptions={{ id: `physicalLootUnlocked${idx}`, placeholder: "Credits" }} callbackFn={(nr) => undefined} /> */}
        </div>)}
        <div className="xp-btn">
            <div>Data-Loot collected <br /></div>
            <XPDropDown list={["0", "1", "2", "3", "4"]} dropdownOptions={{ id: "lootUnlocked", placeholder: "0" }} callbackFn={(nr) => setDataLootTokensCollected(parseInt(nr, 10))} />
        </div>
        <div className="modal-sub-header">Data Loot</div>
        {Array.from({ length: dataLootTokensCollected }).map((_el, idx) => <div className="loot-btn">
            <div>Data-Loot #{idx + 1}<br /></div>
            <XPDropDown list={["Credits", "Information", "Advanced Weapon", "Advanced Tech", "Secret"]} dropdownOptions={{ id: `dataLootUnlocked${idx}`, placeholder: "Credits" }} callbackFn={(nr) => undefined} />
        </div>)}

        <button
            onClick={() => {
                dispatch({
                    type: ADD_LOOT,
                    payload: [],
                });
                history.push("/CrewOverview");
            }}
            className={"dialog-btn confirm-btn"}
        >Confirm</button>
        <BackButtonComponent />
    </React.Fragment>;
};
