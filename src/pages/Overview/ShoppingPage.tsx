import React, { useContext, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { PageBackBtnComponent } from "../../components/common/BackButton";
import { Carousel } from "../../components/common/Carousel";
import { ItemCard } from "../../components/ItemCard";
import { GearListItem } from "../../components/ListItem";
import { getAdvancedTech, getAdvancedWeapons, getAlienArtefacts } from "../../GearUtils";
import { AdvancedTech1Icon, AdvancedTech2Icon, AdvancedWeaponsIcon, AlienArtefactsIcon } from "../../images";
import { BUY_LOOT } from "../../redux/actions";
import { AdvancedTech, AdvancedWeapons, AlienArtefact, CrewState, LootCategories, ShoppingCategories } from "../../types";

interface ShoppingItem {
    name: string;
    type: ShoppingCategories;
}

export const ShoppingPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const dispatch = useDispatch();
    const [shoppingSection, setShoppingSection] = useState<ShoppingCategories | undefined>(undefined);
    const [showAllItems, setShowAllItems] = useState<boolean>(false);
    const [details, setDetails] = useState<ShoppingItem | undefined>(undefined);
    const getItemsList = (cat: ShoppingCategories) => {
        switch (cat) {
            case ShoppingCategories.AdvancedTech1:
                return getAdvancedTech().filter((tech) => tech.list === 1);
            case ShoppingCategories.AdvancedTech2:
                return getAdvancedTech().filter((tech) => tech.list === 2);
            case ShoppingCategories.AlienArtefacts:
                return getAlienArtefacts();
            case ShoppingCategories.AdvancedWeapons:
                return getAdvancedWeapons();
        }
    };
    const hasSufficientFunds = (cat: ShoppingCategories) => getItemsList(cat).some((item: AlienArtefact | AdvancedTech | AdvancedWeapons) => item.cost < state.Credits);
    const SelectionTiles = () => <React.Fragment>
        <div className={hasSufficientFunds(ShoppingCategories.AdvancedWeapons) ? "transaction-tile" : "transaction-tile disabled"}
            onClick={() => setShoppingSection(ShoppingCategories.AdvancedWeapons)}
        >
            <div className="transaction-tile-header">{ShoppingCategories.AdvancedWeapons}</div>
            <img style={{ width: "25%" }} src={AdvancedWeaponsIcon} alt={"starship"} />
        </div>
        <div className={hasSufficientFunds(ShoppingCategories.AlienArtefacts) ? "transaction-tile" : "transaction-tile disabled"} onClick={() => setShoppingSection(ShoppingCategories.AlienArtefacts)}>
            <div className="transaction-tile-header">{ShoppingCategories.AlienArtefacts}</div>
            <img style={{ width: "25%" }} src={AlienArtefactsIcon} alt={"starship"} />
        </div>
        <div className={hasSufficientFunds(ShoppingCategories.AdvancedTech1) ? "transaction-tile" : "transaction-tile disabled"} onClick={() => setShoppingSection(ShoppingCategories.AdvancedTech1)}>
            <div className="transaction-tile-header">{ShoppingCategories.AdvancedTech1}</div>
            <img style={{ width: "25%" }} src={AdvancedTech1Icon} alt={"starship"} />
        </div>
        <div className={hasSufficientFunds(ShoppingCategories.AdvancedTech2) ? "transaction-tile" : "transaction-tile disabled"} onClick={() => setShoppingSection(ShoppingCategories.AdvancedTech2)}>
            <div className="transaction-tile-header">{ShoppingCategories.AdvancedTech2}</div>
            <img style={{ width: "25%" }} src={AdvancedTech2Icon} alt={"starship"} />
        </div>
    </React.Fragment>;
    const DialogTile = () => {
        if (details) {
            const type = details?.type;
            switch (type) {
                case ShoppingCategories.AdvancedTech1:
                    const technology = getAdvancedTech().find((tech) => tech.name === details.name);
                    if (technology) {
                        return <div>
                            <div className="cargo-tile">
                                <ItemCard name={details.name} type={technology.type} icon={AdvancedTech1Icon} slots={technology.gearSlots} notes={technology.notes} armourModifier={technology.armourModifier} />
                                <div className="cargo-item-details-btn selected"
                                    onClick={() => {
                                        dispatch({ type: BUY_LOOT, payload: { loot: { name: details.name, type: LootCategories.AdvancedTechnology }, credits: technology.cost } });
                                        setDetails(undefined);
                                    }}>
                                    {`Buy for ${technology.cost} \xA5`}</div>
                                <div className="cargo-item-details-btn" onClick={() => setDetails(undefined)}>Back</div>
                            </div>
                        </div>;
                    }
                    return <React.Fragment></React.Fragment>;
                case ShoppingCategories.AdvancedTech2:
                    const technology2 = getAdvancedTech().find((tech) => tech.name === details.name);
                    if (technology2) {
                        return <div>
                            <div className="cargo-tile">
                                <ItemCard name={details.name} type={technology2.type} icon={AdvancedTech2Icon} slots={technology2.gearSlots} notes={technology2.notes} armourModifier={technology2.armourModifier} />
                                <div className="cargo-item-details-btn selected"
                                    onClick={() => {
                                        dispatch({ type: BUY_LOOT, payload: { loot: { name: details.name, type: LootCategories.AdvancedTechnology }, credits: technology2.cost } });
                                        setDetails(undefined);
                                    }}>
                                    {`Buy for ${technology2.cost} \xA5`}</div>
                                <div className="cargo-item-details-btn" onClick={() => setDetails(undefined)}>Back</div>
                            </div>
                        </div>;
                    }
                    return <React.Fragment></React.Fragment>;
                case ShoppingCategories.AdvancedWeapons:
                    const advWeapon = getAdvancedWeapons().find((weapon) => weapon.name === details.name);
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
                                <ItemCard name={details.name} type={advWeapon.type} icon={AdvancedWeaponsIcon} slots={advWeapon.gearSlots} notes={advWeapon.notes || ""} />
                                {str ? <div className="large-text" >{str.join(" / ")}</div> : undefined}
                                <div style={{ paddingBottom: "2rem", borderBottom: "2px solid" }}></div>
                                <div className="cargo-item-details-btn selected"
                                    onClick={() => {
                                        dispatch({ type: BUY_LOOT, payload: { loot: { name: details.name, type: LootCategories.AdvancedWeapons }, credits: advWeapon.cost } });
                                        setDetails(undefined);
                                    }}>
                                    {`Buy for ${advWeapon.cost} \xA5`}</div>
                                <div className="cargo-item-details-btn" onClick={() => setDetails(undefined)}>Back</div>
                            </div>
                        </div>;
                    }
                    return <React.Fragment></React.Fragment>;
                case ShoppingCategories.AlienArtefacts:
                    const artefact = getAlienArtefacts().find((art) => art.name === details.name);
                    if (artefact) {
                        return <div>
                            <div className="cargo-tile">
                                <ItemCard name={details.name} type={artefact.type} icon={AlienArtefactsIcon} slots={artefact.gearSlots} notes={artefact.notes || ""} />
                                <div style={{ fontWeight: "bold", float: "right", margin: "0.2rem", padding: "1rem" }} className="cargo-item-btn selected"
                                    onClick={() => {
                                        dispatch({ type: BUY_LOOT, payload: { loot: { name: details.name, type: LootCategories.AlienTech }, credits: artefact.cost } });
                                        setDetails(undefined);
                                    }}>
                                    {`Buy for ${artefact.cost} \xA5`}</div>
                                <div className="cargo-item-details-btn" onClick={() => setDetails(undefined)}>Back</div>
                            </div>
                        </div>;
                    }
                    return <React.Fragment></React.Fragment>;
            }
        }
        return <React.Fragment></React.Fragment>;
    };
    const ItemList = () => {
        let list: Array<AdvancedWeapons | AdvancedTech | AlienArtefact> = [];
        switch (shoppingSection) {
            case ShoppingCategories.AdvancedWeapons:
                list = showAllItems ? getAdvancedWeapons() : getAdvancedWeapons().filter((item: AdvancedWeapons) => item.cost < state.Credits);
                break;
            case ShoppingCategories.AdvancedTech1:
                const list1 = getAdvancedTech().filter((tech) => tech.list === 1);
                list = showAllItems ? list1 : list1.filter((item: AdvancedTech) => item.cost < state.Credits);
                break;
            case ShoppingCategories.AdvancedTech2:
                const list2 = getAdvancedTech().filter((tech) => tech.list === 2);
                list = showAllItems ? list2 : list2.filter((item: AdvancedTech) => item.cost < state.Credits);
                break;
            case ShoppingCategories.AlienArtefacts:
                list = showAllItems ? getAlienArtefacts() : getAlienArtefacts().filter((item: AlienArtefact) => item.cost < state.Credits);
                break;
            case undefined:
                return <React.Fragment />;

        }
        const itemList = list.sort((a, b) => (a.cost > b.cost) ? 1 : a.cost < b.cost ? -1 : 0).map((listItem) => <GearListItem
            item={listItem}
            isDisabled={listItem.cost > state.Credits}
            clickHandler={() => setDetails({ name: listItem.name, type: shoppingSection })}
        />);
        if (itemList.length > 11) {
            return <React.Fragment >
                <div className="chapter-header">What do you want to purchase?</div>
                <Carousel
                    splitSize={11}
                    inputDivs={itemList}
                />
                <div className="page-btn" onClick={() => setShoppingSection(undefined)}>Back</div>
            </React.Fragment >;
        }
        return <React.Fragment >
            <div className="chapter-header">What do you want to purchase?</div>
            {itemList}
            <div className="page-btn" onClick={() => setShoppingSection(undefined)}>Back</div>
        </React.Fragment >;
    };
    return <div className="flex-container" >
        {/* <TreasuryComponent externalStyles={{ marginLeft: "9rem" }} /> */}
        {!shoppingSection ? <React.Fragment><SelectionTiles /><PageBackBtnComponent /></React.Fragment> : details ? <DialogTile /> : <ItemList />}

    </div >;
};
