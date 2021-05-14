import { useState } from "react";
import ReactDOM from "react-dom";
import { GearLabel } from "../components/GearLabels";
import { Gear } from "../types/Characters";

export interface DropdownOptions {
    placeholder: Gear;
    id: string;
    disabled?: boolean;
    keepSelection?: boolean;
    clearable?: boolean;
}

const DropdownList = ({ list, parentId, showFn, callbackFn }: { list: Gear[]; parentId: string; showFn(hide: boolean): void; callbackFn(item: Gear): void }) => {
    const position = document.getElementById(`dropdown-container-${parentId}`)?.getBoundingClientRect();
    const cssProperties = { top: (position?.top || 0) + 32, left: (position?.left || 0), width: (position?.width || 0) - 4 };
    return (
        ReactDOM.createPortal(
            <div style={cssProperties} className="dropdown-portal">
                {list.length > 0 ? list.map((listItem) =>
                    <div key={`dropdown-list-item-${parentId}-${listItem.name}`}
                        className="gear-selection dropdown-input dropdown-input-list"
                        onMouseDown={() => {
                            // dispatch({ type: ADD_MODEL_TO_ROSTER, payload: listItem });
                            callbackFn(listItem);
                            showFn(false);
                        }}
                    >
                        <GearLabel gear={listItem} gearList={list} />
                    </div>
                ) : <div key={`dropdown-list-item-${parentId}-empty-list`} className="dropdown-empty-list">No match found for search string. Please refine your search.</div>}
            </div>,
            document.getElementById(`dropdown-container-${parentId}`) as HTMLElement
        )
    );
};

export const DropdownMenuComponent = ({ originalList, dropdownOptions, callbackFn }: { originalList: Gear[]; dropdownOptions: DropdownOptions; callbackFn(item: string): void }) => {
    const [showStatsDialog, setShowStatsDialog] = useState<boolean>(false);
    const [isFocused, setFocused] = useState<boolean>(false);
    const [filteredList, setFilteredList] = useState<Gear[]>(originalList);
    const [selectedValue, setSelectedValue] = useState<Gear>(originalList.find((item) => item.name === dropdownOptions.placeholder.name) || dropdownOptions.placeholder);

    const internalCallbackFn = (listItem: Gear) => {
        setSelectedValue(listItem);
        callbackFn(listItem.name);
    };
    const xy = () => {
        setShowStatsDialog(!showStatsDialog);
    };
    return <div id={`dropdown-container-${dropdownOptions.id}`} className="dropdown-container" >
        {showStatsDialog ? <DropdownList list={filteredList} showFn={setShowStatsDialog} parentId={dropdownOptions.id} callbackFn={internalCallbackFn} /> : null}
        <div
            onClick={() => {
                setShowStatsDialog(!showStatsDialog);
                // setSelectedValue(originalList.find((item) => item.name === itemName) as Gear);
            }}
            onMouseOut={() => {
                setShowStatsDialog(!showStatsDialog);
            }}
        >
        </div>
        <div className={dropdownOptions.disabled ? "dropdown-focus-div disabled-input" : "dropdown-focus-div"}>
            <input className="gear-selection selected dropdown-input"
                onFocus={() => {
                    xy();
                }}
                onClick={() => {
                    if (isFocused) {
                        xy();
                    } else {
                        setFocused(true);
                    }
                }}
                onBlur={() => {
                    setShowStatsDialog(false);
                    setFocused(false);
                }}
            // onChange={(event) => { setSelectedValue(event.currentTarget.value); setFilteredList(searcher.search(event.currentTarget.value)); }}
            // placeholder={dropdownOptions.placeholder}
            // value={selectedValue}
            >
                {/* <GearLabel
                    gear={selectedValue}
                    gearList={originalList.filter((listItem) => listItem.name !== selectedValue.name)}

                /> */}
            </input>
        </div>
    </div>;
};
