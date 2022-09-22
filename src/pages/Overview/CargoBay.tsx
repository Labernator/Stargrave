import React, { useContext, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { PageBackBtnComponent } from "../../components/common/BackButton";
import { CargoTile, TileButton } from "../../components/DetailsTile";
import { CargoDropDown } from "../../components/dropdowns/CargoDropdown";
import { ItemCard } from "../../components/ItemCard";
import { CargoItem } from "../../components/ListItem";
import { getAdvancedTech, getAdvancedWeapons, getAlienArtefacts } from "../../GearUtils";
import { AdvancedTech1Icon, AdvancedWeaponsIcon, AlienArtefactsIcon, InformationIcon, SecretIcon, TradeGoodsIcon } from "../../images";
import { CONVERT_INFORMATION, REMOVE_LOOT_FROM_CARGO_BAY, SELL_LOOT } from "../../redux/actions";
import { AdvancedTech, AdvancedWeapons, AlienArtefact, CrewState, Loot, LootCategories, LootItem } from "../../types";
import { getInformationValue, getTradeGoodsValue, isCharacter } from "../../Utils";

export const ShipsCargoPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const [confirmation, setConfirmation] = useState<LootItem | undefined>(undefined);
    const dispatch = useDispatch();
    const history = useHistory();
    const checkEquality = (weaponsList: string[], equivalent: string) => {
        if (equivalent === "Carbine") {
            return weaponsList.some((g) => g === equivalent || g === "Shotgun");
        }
        if (equivalent === "Shotgun") {
            return weaponsList.some((g) => g === equivalent || g === "Carbine");
        }
        return weaponsList.some(((g) => g === equivalent));
    };
    const getCrewList = (equivalent?: string) => {
        if (equivalent) {
            const soldierList = state.Soldiers.filter((sol) => checkEquality(sol.gear, equivalent)).map((sol) => `${sol.name}${sol.type}`);
            return [state.Captain.name, state.FirstMate.name, ...soldierList];
        }
        return [state.Captain.name, state.FirstMate.name];
    };

    const getItem = (item: LootItem): AdvancedTech | AdvancedWeapons | AlienArtefact | Loot | undefined => {
        switch (item.type) {
            case LootCategories.TradeGoods: return { name: item.name, type: "Trade Goods", sell: getTradeGoodsValue(item.name) };
            case LootCategories.Secret: return { name: item.name, type: "Secret", sell: 200 };
            case LootCategories.Information: return { name: item.name, type: "Information", sell: getInformationValue(item.name) };
            case LootCategories.AdvancedTechnology: return getAdvancedTech().find((tech) => tech.name === item.name);
            case LootCategories.AdvancedWeapons: return getAdvancedWeapons().find((weapon) => weapon.name === item.name);
            case LootCategories.AlienTech: return getAlienArtefacts().find((artefact) => artefact.name === item.name);
        }
    };

    const DialogTile = ({ item }: { item: LootItem }) => {
        switch (item.type) {
            case LootCategories.TradeGoods:
                return <CargoTile
                    icon={TradeGoodsIcon}
                    name={item.name}
                    details={state.ShipUpgrades.find((upgrade) => upgrade === "External Cargo Pods") ? "* gain +20% value when selling due to 'External Cargo Pods' Upgrade" : ""}
                    bottomButton={
                        <TileButton
                            clickHandler={() => {
                                dispatch({ type: SELL_LOOT, payload: { loot: item, credits: getTradeGoodsValue(item.name) } });
                                setConfirmation(undefined);
                            }}
                            text={`Sell for ${getTradeGoodsValue(item.name)} \xA5`}
                        />
                    }
                />;
            case LootCategories.Secret:
                return <CargoTile
                    icon={SecretIcon}
                    name={item.name}
                    details={"can be used to unlock loot that is otherwise not available to buy"}
                    bottomButton={
                        <TileButton
                            clickHandler={() => {
                                dispatch({ type: SELL_LOOT, payload: { loot: item, credits: 200 } });
                                setConfirmation(undefined);
                            }}
                            text={"Sell for 200 \xA5"}
                        />
                    }
                    topButton={
                        <TileButton
                            clickHandler={() => {
                                dispatch({ type: REMOVE_LOOT_FROM_CARGO_BAY, payload: { loot: item } });
                                setConfirmation(undefined);
                            }}
                            text={"Use to unlock item"}
                        />
                    } />;
            case LootCategories.Information:
                return <CargoTile
                    icon={InformationIcon}
                    name={item.name}
                    details={"can be converted into experience instead of selling"}
                    bottomButton={
                        <TileButton
                            clickHandler={() => {
                                dispatch({ type: SELL_LOOT, payload: { loot: item, credits: getInformationValue(item.name) } });
                                setConfirmation(undefined);
                            }}
                            text={`Sell for ${getInformationValue(item.name)} \xA5`}
                        />
                    }
                    topButton={
                        <TileButton
                            clickHandler={() => {
                                dispatch({ type: CONVERT_INFORMATION, payload: { loot: item } });
                                setConfirmation(undefined);
                            }}
                            text={"Use to gain 20xp"}
                        />
                    } />;
            case LootCategories.AdvancedTechnology:
                const technology = getAdvancedTech().find((tech) => tech.name === item.name);
                if (technology) {
                    return <div>
                        <div className="cargo-tile">
                            {technology.shipGear ?
                                <div className="cargo-item-details-btn selected"
                                    onClick={() => {
                                        dispatch({ type: REMOVE_LOOT_FROM_CARGO_BAY, payload: { loot: item } });
                                        setConfirmation(undefined);
                                    }}>Item used up / destroyed</div> : <CargoDropDown list={getCrewList()} dropdownOptions={{ id: "crewlist", placeholder: "Select crew member to attach" }} callbackFn={(member) => {
                                        const foundMember = member === state.Captain.name ? state.Captain : state.FirstMate;
                                        if (foundMember) {
                                            dispatch({ type: REMOVE_LOOT_FROM_CARGO_BAY, payload: { loot: item } });
                                            history.push("/Equipment", { crewMember: foundMember, equipment: technology });
                                        }
                                    }} />}
                            <ItemCard name={item.name} type={technology.type} icon={AdvancedTech1Icon} slots={technology.gearSlots} notes={technology.notes} armourModifier={technology.armourModifier} />
                            <div className="cargo-item-details-btn selected"
                                onClick={() => {
                                    dispatch({ type: SELL_LOOT, payload: { loot: item, credits: technology.sell } });
                                    setConfirmation(undefined);
                                }}>
                                {`Sell for ${technology.sell} \xA5`}</div>

                        </div>
                    </div>;
                }
                return <React.Fragment></React.Fragment>;
            case LootCategories.AdvancedWeapons:
                const advWeapon = getAdvancedWeapons().find((weapon) => weapon.name === item.name);
                if (advWeapon) {
                    const str: string[] = [];
                    if (advWeapon.maxRange) {
                        str.push(typeof (advWeapon.maxRange) === "number" ? `Range ${advWeapon.maxRange}"` : `${advWeapon.maxRange}`);
                    }
                    if (advWeapon.damageModifier) {
                        str.push(`+${advWeapon.damageModifier} Damage Modifier`);
                    }
                    return <div>
                        <div className="cargo-tile">
                            <CargoDropDown list={getCrewList(advWeapon.equivalent)} dropdownOptions={{ id: "crewlist", placeholder: "Select crew member to attach" }} callbackFn={(member) => {
                                const foundMember = member === state.Captain.name ? state.Captain : member === state.FirstMate.name ? state.FirstMate : state.Soldiers.find((sol) => `${sol.name}${sol.type}` === member);
                                if (foundMember) {
                                    dispatch({ type: REMOVE_LOOT_FROM_CARGO_BAY, payload: { loot: item } });
                                    history.push(isCharacter(foundMember) ? "/Equipment" : "/SoldierEquipment", { crewMember: foundMember, equipment: advWeapon });
                                }
                            }} />
                            <ItemCard name={item.name} type={advWeapon.type} icon={AdvancedWeaponsIcon} slots={advWeapon.gearSlots} notes={advWeapon.notes || ""} />
                            {str ? <div className="large-text" >{str.join(" / ")}</div> : undefined}
                            <div style={{ paddingBottom: "2rem", borderBottom: "2px solid" }}></div>
                            <div className="cargo-item-details-btn selected"
                                onClick={() => {
                                    dispatch({ type: SELL_LOOT, payload: { loot: item, credits: advWeapon.sell } });
                                    setConfirmation(undefined);
                                }}>
                                {`Sell for ${advWeapon.sell} \xA5`}</div>
                        </div>
                    </div>;
                }
                return <React.Fragment></React.Fragment>;
            case LootCategories.AlienTech:
                const artefact = getAlienArtefacts().find((art) => art.name === item.name);
                if (artefact) {
                    return <div>
                        <div className="cargo-tile">
                            <CargoDropDown list={getCrewList()} dropdownOptions={{ id: "crewlist", placeholder: "Select crew member to attach" }} callbackFn={(member) => {
                                const foundMember = member === state.Captain.name ? state.Captain : state.FirstMate;
                                if (foundMember) {
                                    dispatch({ type: REMOVE_LOOT_FROM_CARGO_BAY, payload: { loot: item } });
                                    history.push("/Equipment", { crewMember: foundMember, equipment: artefact });
                                }
                            }} />
                            <ItemCard name={item.name} type={artefact.type} icon={AlienArtefactsIcon} slots={artefact.gearSlots} notes={artefact.notes || ""} />
                            <div style={{ fontWeight: "bold", float: "right", margin: "0.2rem", padding: "1rem" }} className="cargo-item-btn selected"
                                onClick={() => {
                                    dispatch({ type: SELL_LOOT, payload: { loot: item, credits: artefact.sell } });
                                    setConfirmation(undefined);
                                }}>
                                {`Sell for ${artefact.sell} \xA5`}</div>

                        </div>
                    </div>;
                }
                return <React.Fragment></React.Fragment>;
        }
        return <React.Fragment></React.Fragment>;
    };
    const SellConfirmationDialog = () => <React.Fragment>
        {confirmation ? <div className="modal">
            <div className="modal-header">What do you want to do with this?</div>
            <DialogTile item={confirmation} />
            <div style={{ padding: "1rem 2rem", marginLeft: "1rem", marginRight: "1rem" }} className="cargo-item-details-btn" onClick={() => setConfirmation(undefined)}>Back</div>
        </div> : undefined}
    </React.Fragment>;

    return <div className="flex-container" >

        {confirmation ? <SellConfirmationDialog /> : undefined
        }
        <div className="chapter-header">Ships Cargo Bay</div>
        <div style={{ overflowY: "scroll" }}>
            {
                state.Cargo.length > 0 ?
                    state.Cargo.map((item) => <CargoItem item={getItem(item)} isDisabled={false} clickHandler={() => setConfirmation(item)} />) :
                    <div className="modal-header">There is no cargo here at the moment</div>
            }
        </div>
        <PageBackBtnComponent />
    </div >;
};
