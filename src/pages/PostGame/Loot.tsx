import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BackButtonComponent } from "../../components/common/BackButton";
import { Carousel } from "../../components/common/Carousel";
import { XPDropDown } from "../../components/dropdowns/XPDropdown";
import { getAdvancedTech, getAdvancedWeapons, getAlienArtefacts } from "../../GearUtils";
import { ADD_CREDITS, ADD_LOOT } from "../../redux/actions";
import { DataCategories, Information, LootCategories, LootItem, LootType, PhysicalCategories, SelectedCategory, TradeGoods } from "../../types";

interface SelectedItems {
    lootId: number;
    selectedItem: LootItem;
}
const credits = [10, 15, 20, 30, 40, 45, 50, 60, 70, 75, 80, 90, 100, 105, 110, 120, 130, 135, 140, 150, 160, 165, 170, 180, 190, 195, 200, 220, 225, 240, 250, 255, 260, 270, 280, 285, 300, 320, 340, 360, 380, 400];

export const LootPage = ({ lootType }: { lootType: LootType }) => {
    const [lootTokensCollected, setLootTokensCollected] = useState<number>(0);
    const [selectedItems, setSelectedItems] = useState<SelectedItems[] | undefined>(undefined);
    const [selectedCategory, setSelectedCategory] = useState<SelectedCategory[] | undefined>(undefined);
    const history = useHistory();
    const dispatch = useDispatch();
    const advTech = getAdvancedTech();
    const alienTech = getAlienArtefacts();
    const advWeapons = getAdvancedWeapons();
    const isCategorySelected = (idx: number, name: PhysicalCategories | DataCategories) => selectedCategory?.find((item) => item.lootId === idx && item.selectedCategory === name);
    const isCategoryIdSelected = (idx: number) => selectedCategory?.find((item) => item.lootId === idx);
    const isItemSelected = (idx: number, name: string) => selectedItems?.find((item) => item.lootId === idx && item.selectedItem.name === name);
    const isIdSelected = (idx: number) => selectedItems?.find((item) => item.lootId === idx);
    const updateSelectedItems = (idx: number, item: LootItem) => {
        if (isItemSelected(idx, item.name)) {
            setSelectedItems(selectedItems?.filter((selIt) => selIt.lootId !== idx || selIt.selectedItem.name !== item.name));
        } else if (isIdSelected(idx)) {
            setSelectedItems([...selectedItems?.filter((selIt) => selIt.lootId !== idx) || [], { lootId: idx, selectedItem: item }]);
        } else {
            setSelectedItems([...selectedItems || [], { lootId: idx, selectedItem: item }]);
        }
    };
    const updateSelectedCategory = (idx: number, name: PhysicalCategories | DataCategories) => {
        if (isCategorySelected(idx, name)) {
            setSelectedCategory(selectedCategory?.filter((item) => item.lootId !== idx || item.selectedCategory !== name));
        } else if (isCategoryIdSelected(idx)) {
            setSelectedCategory([...selectedCategory?.filter((item) => item.lootId !== idx) || [], { lootId: idx, selectedCategory: name }]);
        } else {
            setSelectedCategory([...selectedCategory || [], { lootId: idx, selectedCategory: name }]);
        }
    };
    const getTradeGoods = (idx: number) =>
        Object.values(TradeGoods).map((value) =>
            <div style={{ padding: "1rem" }}
                className={isItemSelected(idx, value) ? "gear-selection selected" : "gear-selection"}
                onClick={() => updateSelectedItems(idx, { name: value, type: LootCategories.TradeGoods })}
                key={value}>
                {value}
            </div>
        );
    const getInformation = (idx: number) =>
        Object.values(Information).map((value) =>
            <div style={{ padding: "1rem" }}
                className={isItemSelected(idx, value) ? "gear-selection selected" : "gear-selection"}
                onClick={() => updateSelectedItems(idx, { name: value, type: LootCategories.Information })}
                key={value}>
                {value}
            </div>
        );
    const CategorySelection = ({ idx }: { idx: number }) => {
        if (lootType === LootType.Data) {
            return <div style={{ display: "flex", flexWrap: "wrap" }}>{Object.values(DataCategories).map((value) => <div className={isCategorySelected(idx, value) ? "loot-selection selected" : "loot-selection"}
                onClick={() => updateSelectedCategory(idx, value)}
            >
                {value}
            </div>)}</div>;
        }
        if (lootType === LootType.Physical) {
            return <div style={{ display: "flex", flexWrap: "wrap" }}>{Object.values(PhysicalCategories).map((value) => <div className={isCategorySelected(idx, value) ? "loot-selection selected" : "loot-selection"}
                onClick={() => updateSelectedCategory(idx, value)}
            >
                {value}
            </div>)}</div>;
        }
        return <React.Fragment></React.Fragment>;
    };
    const LootSelection = ({ idx }: { idx: number }) => {
        const category = selectedCategory?.find((cat) => cat.lootId === idx)?.selectedCategory;
        switch (category) {
            case PhysicalCategories.TradeGoods:
                return <div style={{ display: "flex", flexWrap: "wrap" }}>{getTradeGoods(idx)}</div>;
            case PhysicalCategories.AdvancedTechnology:
                return <Carousel
                    splitSize={10}
                    inputDivs={advTech.map((tech) => <div
                        className={isItemSelected(idx, tech.name) ? "gear-selection selected" : "gear-selection"}
                        onClick={() => updateSelectedItems(idx, { name: tech.name, type: LootCategories.AdvancedTechnology })}
                    >
                        {tech.name}
                    </div>)}
                />;
            case PhysicalCategories.AdvancedWeapons:
                return <Carousel
                    splitSize={10}
                    inputDivs={advWeapons.map((weapon) => <div
                        className={isItemSelected(idx, weapon.name) ? "gear-selection selected" : "gear-selection"}
                        onClick={() => updateSelectedItems(idx, { name: weapon.name, type: LootCategories.AdvancedWeapons })}
                    >
                        {weapon.name}
                    </div>)}
                />;
            case PhysicalCategories.AlienTech:
                return <Carousel
                    splitSize={10}
                    inputDivs={alienTech.map((artefact) => <div
                        className={isItemSelected(idx, artefact.name) ? "gear-selection selected" : "gear-selection"}
                        onClick={() => updateSelectedItems(idx, { name: artefact.name, type: LootCategories.AlienTech })}
                    >
                        {artefact.name}
                    </div>)}
                />;
            case DataCategories.Credits:
                return <React.Fragment>{credits.map((choice) => <div
                    className={isItemSelected(idx, choice.toString()) ? "credits-selection selected" : "credits-selection"}
                    onClick={() => updateSelectedItems(idx, { name: choice.toString(), type: LootCategories.Credits })}
                >
                    {`${choice} \xA5`}
                </div>)}
                </React.Fragment>;
            case DataCategories.Information:
                return <div style={{ display: "flex", flexWrap: "wrap" }}>{getInformation(idx)}</div>;
            case DataCategories.AdvancedTechnology:
                return <Carousel
                    splitSize={12}
                    inputDivs={advTech.map((tech) => <div
                        className={isItemSelected(idx, tech.name) ? "gear-selection selected" : "gear-selection"}
                        onClick={() => updateSelectedItems(idx, { name: tech.name, type: LootCategories.AdvancedTechnology })}
                    >
                        {tech.name}
                    </div>)}
                />;
            case DataCategories.AdvancedWeapons:
                return <Carousel
                    splitSize={12}
                    inputDivs={advWeapons.map((weapon) => <div
                        className={isItemSelected(idx, weapon.name) ? "gear-selection selected" : "gear-selection"}
                        onClick={() => updateSelectedItems(idx, { name: weapon.name, type: LootCategories.AdvancedWeapons })}>{weapon.name}</div>)}
                />;
            case DataCategories.Secret:
                return <div
                    className={isItemSelected(idx, DataCategories.Secret) ? "gear-selection selected" : "gear-selection"}
                    onClick={() => updateSelectedItems(idx, { name: "Secret", type: LootCategories.Secret })}>{DataCategories.Secret}</div>;
            default:
                return <React.Fragment></React.Fragment>;
        }
    };
    const RenderSection = ({ idx }: { idx: number }) => <React.Fragment>
        <div style={{ textAlign: "left" }} className="modal-header">Token # {idx} Category</div>
        <CategorySelection idx={idx} />
        {selectedCategory ? <div style={{ textAlign: "left" }} className="modal-header">Select item # {idx}</div> : undefined}
        <LootSelection idx={idx} /></React.Fragment>;
    return <React.Fragment>
        <div className="chapter-header">{lootType === LootType.Data ? "Select Data Loot" : "Select Physical Loot"}</div>
        <div className="xp-btn">
            <div>{lootType === LootType.Data ? "Data Loot collected" : "Physical Loot collected"}</div>
            <XPDropDown list={["0", "1", "2", "3", "4"]} dropdownOptions={{ id: "lootUnlocked", placeholder: "0" }} callbackFn={(nr) => setLootTokensCollected(parseInt(nr, 10))} />
        </div>
        {
            lootTokensCollected ?
                lootTokensCollected > 1 ?
                    <Carousel inputDivs={Array.from({ length: lootTokensCollected }).map((_val, idx) => <RenderSection idx={idx + 1} />)} splitSize={1} /> :
                    <RenderSection idx={1} /> :
                undefined}
        <button
            onClick={() => {
                selectedItems?.forEach((item) => {
                    if (item.selectedItem.type === LootCategories.Credits) {
                        dispatch({
                            type: ADD_CREDITS,
                            payload: {
                                credits: parseInt(item.selectedItem.name, 10),
                                sign: true,
                                record: `Looted ${item.selectedItem.name} credits`,
                            },
                        });
                    } else {
                        dispatch({
                            type: ADD_LOOT,
                            payload: item.selectedItem,
                        });
                    }
                });
                lootType === LootType.Physical ? history.push("/DataLootDeclaration", LootType.Data) : history.push("/CrewOverview");
            }}
            className={"dialog-btn confirm-btn"}
        >Confirm</button>
        <BackButtonComponent />
    </React.Fragment>;
};
