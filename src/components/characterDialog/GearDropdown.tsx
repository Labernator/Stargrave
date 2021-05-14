import React, { useState } from "react";
import { Gear } from "../../types/Characters";
import { useComponentVisible } from "../../UseComponentVisible";
import { GearLabel } from "../GearLabels";

export interface DropdownOptions {
    placeholder: Gear;
    id: string;
}

export const GearDropDown = ({ list, dropdownOptions, callbackFn }: { list: Gear[]; dropdownOptions: DropdownOptions; callbackFn(item: string): void }) => {
    const [selectedItem, setSelectedItem] = useState<Gear>(dropdownOptions.placeholder);
    const getCssProps = () => {
        const position = document.getElementById(`dropdown-container-${dropdownOptions.id}`)?.getBoundingClientRect();
        return { top: (position?.top || 0) + 42, left: (position?.left || 0), width: (position?.width || 0) - 4 };
    };
    const renderGearList = () => list.filter((item: Gear) => (item.name !== selectedItem.name)).map((listItem) =>
        <div key={`dropdown-list-item-${dropdownOptions.id}-${listItem.name}`}
            className="gear-selection dropdown-input dropdown-input-list"
            onMouseDown={() => {
                setSelectedItem(listItem);
                callbackFn(listItem.name);
                setIsComponentVisible(false);
            }}
        >
            <GearLabel gear={listItem} gearList={list} />
        </div>
    );
    const { ref, isComponentVisible, setIsComponentVisible, openMenu } = useComponentVisible(false);
    return <React.Fragment>
        <div
            className="gear-selection selected dropdown-input"
            onClick={openMenu}
            id={`dropdown-container-${dropdownOptions.id}`}>
            <GearLabel gear={dropdownOptions.placeholder} gearList={list} />
        </div>
        <div ref={ref}>
            {isComponentVisible ?
                <div style={getCssProps()} className="dropdown-portal">
                    {list.length > 0 ? renderGearList() : <div key={`dropdown-list-item-${dropdownOptions.id}-empty-list`} className="dropdown-empty-list">No match found for search string. Please refine your search.</div>}
                </div> : null}
        </div>
    </React.Fragment>;

};
