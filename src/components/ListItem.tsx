import React from "react";
import { AdvancedTech, AdvancedWeapons, AlienArtefact, Loot, ShipUpgrade } from "../types";

const BaseListItem = ({ text, detailsText, cssClasses, clickHandler }: { text: string; detailsText: string; cssClasses: string; clickHandler(): void }) => <div
    onClick={clickHandler}
    className={cssClasses}
    key={`listItem_${text}`}>
    <div key="list-item-name">{text}</div>
    <div key="list-item-details" style={{ fontSize: "0.8rem" }}>{detailsText}</div>
</div>;

export const GearListItem = ({ item, isDisabled, clickHandler }: { item: AdvancedTech | AlienArtefact | AdvancedWeapons; isDisabled: boolean; clickHandler(): void }) =>
    <BaseListItem
        text={item.name}
        detailsText={`Cost: ${item.cost} / Gear Slots: ${item.gearSlots}`}
        cssClasses={isDisabled ? "list-item disabled" : "list-item"}
        clickHandler={clickHandler}
    />;

export const CargoItem = ({ item, isDisabled, clickHandler }: { item: AdvancedTech | AlienArtefact | AdvancedWeapons | Loot | undefined; isDisabled: boolean; clickHandler(): void }) =>
    item ? <BaseListItem
        text={item.name}
        detailsText={`Worth: ${item.sell} / Type: ${item.type}`}
        cssClasses={isDisabled ? "list-item disabled" : "list-item"}
        clickHandler={clickHandler}
    /> : <React.Fragment />;

export const UpgradeItem = ({ item, isDisabled, isSelected, clickHandler }: { item: ShipUpgrade; isDisabled: boolean; isSelected: boolean; clickHandler(): void }) =>
    item ? <BaseListItem
        text={item.name}
        detailsText={`Cost: ${item.cost}`}
        cssClasses={isSelected ? "list-item selected" : isDisabled ? "list-item disabled" : "list-item"}
        clickHandler={clickHandler}
    /> : <React.Fragment />;
