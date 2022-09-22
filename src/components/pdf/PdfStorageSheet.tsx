import React, { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { PostGameIcon, TreasuryIcon } from "../../images";
import { CrewState, LootCategories } from "../../types";
import { getUpgradeByName, isCharacter } from "../../Utils";

export const StorageSheet = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const cargo = state.Cargo;
    const weaponsCargo = cargo.filter((c) => c.type === LootCategories.AdvancedWeapons);
    const techCargo = cargo.filter((c) => c.type === LootCategories.AdvancedTechnology || c.type === LootCategories.AlienTech);
    const goodsCargo = cargo.filter((c) => c.type !== LootCategories.AdvancedTechnology && c.type !== LootCategories.AlienTech && c.type !== LootCategories.AdvancedWeapons);

    return <div id="printable-storage-sheet" className="pdf-container-clone">
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <div className="chapter-header">Experience</div>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "flex-start" }}>
                    <img
                        src={PostGameIcon}
                        style={{ paddingLeft: "0.2rem" }}
                        className="toolbar-compact-icon"
                        id={"PostGameIcon"}
                        alt={"Post Game Sequence"}>
                    </img>
                    <div style={{ paddingLeft: "2rem", fontSize: "1.5rem" }}>
                        {`${state.Experience}`}
                    </div>
                </div>
                <div className="chapter-header">Treasury</div>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "flex-start" }}>
                    <img
                        src={TreasuryIcon}
                        className={"toolbar-compact-icon"}
                        id={"TreasuryIcon"}
                        alt={"TreasuryIcon"}>
                    </img>
                    <div style={{ paddingLeft: "2rem", fontSize: "1.5rem" }}>
                        {`${state.Credits} \xA5`}
                    </div>
                </div>

                <div className="chapter-header">Ships Upgrades</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem" }}>
                    <div >
                        {state.ShipUpgrades.length > 0 ? state.ShipUpgrades.map(getUpgradeByName).map((u) => <React.Fragment><div style={{ fontWeight: "bold" }}>{u.name}</div><div>{u.notes}</div></React.Fragment>) : "----"}
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>

                <div className="chapter-header">Ships Cargo</div>
                <div style={{ display: "flex", fontSize: "1.1rem" }}>
                    <div style={{ borderRight: "1px solid" }}>
                        <div style={{ borderBottom: "1px solid", fontWeight: "bold", padding: "0.5rem" }}>Weapons</div>
                        {weaponsCargo.length > 0 ? weaponsCargo.map((c) => <div style={{ padding: "0.5rem" }}>{c.name}</div>) : <div style={{ padding: "0.5rem" }}> - </div>}
                    </div>
                    <div style={{ borderRight: "1px solid" }}>
                        <div style={{ borderBottom: "1px solid", fontWeight: "bold", padding: "0.5rem" }}>Tech</div>
                        {techCargo.length > 0 ? techCargo.map((c) => <div style={{ padding: "0.5rem" }}>{c.name}</div>) : <div style={{ padding: "0.5rem" }}> - </div>}
                    </div>
                    <div>
                        <div style={{ borderBottom: "1px solid", fontWeight: "bold", padding: "0.5rem" }}>Goods</div>
                        {goodsCargo.length > 0 ? goodsCargo.map((c) => <div style={{ padding: "0.5rem" }}>{c.name}</div>) : <div style={{ padding: "0.5rem" }}> - </div>}
                    </div>
                </div>
            </div>
            <div >
                <div className="chapter-header">Crewlist</div>
                {[state.Captain, state.FirstMate, ...state.Soldiers].map((c) => <div style={{ padding: "0.5rem", fontSize: "1.1rem" }}>{c.name} ({c.type}{isCharacter(c) ? ` - Level ${c.level} ${c.background}` : ""})</div>)}
            </div>

        </div >
    </div>;
};
