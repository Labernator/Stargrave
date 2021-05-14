import React, { useState } from "react";
import { useComponentVisible } from "../../UseComponentVisible";

export interface DropdownOptions {
    placeholder: string;
    id: string;
}

export const PowerFilter = ({ list, dropdownOptions, callbackFn }: { list: string[]; dropdownOptions: DropdownOptions; callbackFn(item: string): void }) => {
    const [selectedItem, setSelectedItem] = useState<string>(dropdownOptions.placeholder);
    const getCssProps = () => {
        const position = document.getElementById(`dropdown-container-${dropdownOptions.id}`)?.getBoundingClientRect();
        return { top: (position?.top || 0) + 32, left: (position?.left || 0), width: (position?.width || 0) - 4 };
    };
    const renderGearList = () => list.filter((item: string) => (item !== selectedItem)).map((listItem) =>
        <div key={`dropdown-list-item-${dropdownOptions.id}-${listItem}`}
            className="gear-selection dropdown-input dropdown-input-list"
            onMouseDown={() => {
                setSelectedItem(listItem);
                callbackFn(listItem);
                setIsComponentVisible(false);
            }}
        >
            {listItem}
        </div>
    );
    const { ref, isComponentVisible, setIsComponentVisible, openMenu } = useComponentVisible(false);
    return <React.Fragment>
        <div
            style={{ marginBottom: "0.3rem" }}
            className="gear-selection selected dropdown-input"
            onClick={openMenu}
            id={`dropdown-container-${dropdownOptions.id}`}>
            {selectedItem}
        </div>
        <div ref={ref}>
            {isComponentVisible ?
                <div style={getCssProps()} className="dropdown-portal">
                    {list.length > 0 ? renderGearList() : <div key={`dropdown-list-item-${dropdownOptions.id}-empty-list`} className="dropdown-empty-list">No match found for search string. Please refine your search.</div>}
                </div> : null}
        </div>
    </React.Fragment>;

};
