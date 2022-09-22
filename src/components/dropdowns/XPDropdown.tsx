import React, { useState } from "react";
import { StringDropdownOptions } from "../../types";
import { useComponentVisible } from "../../UseComponentVisible";

export const XPDropDown = ({ list, dropdownOptions, callbackFn }: { list: string[]; dropdownOptions: StringDropdownOptions; callbackFn(item: string): void }) => {
    const [selectedItem, setSelectedItem] = useState<string>(dropdownOptions.placeholder);
    const getCssProps = () => {
        const position = document.getElementById(`dropdown-container-${dropdownOptions.id}`)?.getBoundingClientRect();
        return { top: (position?.top || 0) + 42, left: (position?.left || 0), width: (position?.width || 0) };
    };
    const renderList = () => list.filter((item: string) => (item !== selectedItem)).map((listItem) =>
        <div key={`dropdown-list-item-${dropdownOptions.id}-${listItem}`}
            className="gear-selection dropdown-input dropdown-input-list"
            onMouseDown={() => {
                setSelectedItem(listItem);
                callbackFn(listItem);
                setIsComponentVisible(false);
            }}
        >
            <div>{listItem}</div>
        </div>
    );
    const { ref, isComponentVisible, setIsComponentVisible, openMenu } = useComponentVisible(false);
    return <React.Fragment>
        <div
            className="gear-selection selected dropdown-input"
            onClick={openMenu}
            id={`dropdown-container-${dropdownOptions.id}`}>
            <div>{selectedItem}</div>
        </div>
        <div ref={ref}>
            {isComponentVisible ?
                <div style={getCssProps()} className="dropdown-portal">
                    {list.length > 0 ? renderList() : <div key={`dropdown-list-item-${dropdownOptions.id}-empty-list`} className="dropdown-empty-list">No match found for search string. Please refine your search.</div>}
                </div> : null}
        </div>
    </React.Fragment>;

};
