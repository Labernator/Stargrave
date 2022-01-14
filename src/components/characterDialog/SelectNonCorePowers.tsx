import React, { useEffect, useState } from "react";
import { BackgroundModifications } from "../../types/Background";
import { Power } from "../../types/Characters";
import { getNonCorePowers, isCorePower } from "../../Utils";
import { Carousel } from "./Carousel";

export const SelectNonCorePowers = (
    { background, corePowers, isCaptain, updatePowers }:
        { background: BackgroundModifications; corePowers: Power[]; isCaptain: boolean; updatePowers(value: Power[]): void }
) => {
    const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
    const [previewPower, setPreviewPower] = useState<Power | undefined>(undefined);
    const [filteredPowerList, setFilteredPowerList] = useState<Power[]>(getNonCorePowers(background.name, isCaptain));
    const [lastPreviewPower, setLastPreviewPower] = useState<Power | undefined>(undefined);
    useEffect(() => {
        if (previewPower) {
            setLastPreviewPower(previewPower);
        }
    }, [previewPower]);
    const isPowerSelected = (power: Power) => !!selectedPowers.find((pwr) => pwr.name === power.name);
    const maxCorePowersSelected = () => {
        let powersRemaining2 = isCaptain ? 4 : 3;
        if (selectedPowers.filter((power) => !isCorePower(power.name, background.name)).length === 2) {
            powersRemaining2 = isCaptain ? 3 : 2;
        }
        return selectedPowers.filter((power) => isCorePower(power.name, background.name)).length >= powersRemaining2;
    };
    const powersRemaining = (isCaptain ? 5 : 4) - corePowers.length;

    return <React.Fragment>
        {previewPower ?
            <React.Fragment>
                <div className="modal-header">
                    {`View Details for Power "${previewPower.name}"`}
                    <div className="modal-sub-header">{"Click the back to return to the selection menu."}</div>
                </div>
                <div className="power-preview-section">
                    <div className="power-preview-name">{`${previewPower.name}`}</div>
                    <div className="power-preview-infos">
                        {`Activation: ${previewPower.activation}`} / {`Strain: ${previewPower.strain}`} / {Array.isArray(previewPower.category) ? `Categories: ${previewPower.category.join(", ")}` : `Category: ${previewPower.category}`}
                    </div>
                    <div className={previewPower.effect.length <= 200 ? "large-text" : previewPower.effect.length <= 400 ? "power-preview-medium-text" : "power-preview-small-text"}>{previewPower.effect}</div>
                </div>
            </React.Fragment> :
            <React.Fragment>
                <div className="modal-header">
                    {`Choose ${powersRemaining} additional ${powersRemaining === 1 ? "Power" : "Powers"}`}
                    <div className="modal-sub-header">{"Swipe or use the page buttons to see more entries"}</div>
                </div>
                {/* <div className="single-selection-gear">
                    <PowerFilter
                        list={Object.values(PowerCategory)}
                        dropdownOptions={{ placeholder: "Filter by Category", id: "power-category-filter" }}
                        callbackFn={(item) => setFilteredPowerList(getNonCorePowers(background.name, isCaptain).filter((power) => Array.isArray(power.category) ? power.category.find((cat) => cat === item) : power.category === item))} />
                </div>
                <div className="single-selection-gear">
                    <PowerFilter
                        list={getNonCorePowers(background.name, isCaptain).map((power) => `${power.activation}`).filter((val, idx, arr) => idx === arr.indexOf(val)).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))}
                        dropdownOptions={{ placeholder: "Filter by Activation", id: "power-activation-filter" }}
                        callbackFn={(item) => setFilteredPowerList(getNonCorePowers(background.name, isCaptain).filter((power) => power.activation === parseInt(item, 10)))} />
                </div> */}
                <Carousel
                    splitSize={8}
                    resetPage={lastPreviewPower ? Math.ceil(filteredPowerList.findIndex((pwr) => pwr.name === lastPreviewPower?.name) / 8) : 1}
                    inputDivs={background ? filteredPowerList.map((power) =>
                        <div
                            onClick={() => {
                                if (isPowerSelected(power)) {
                                    const idx = selectedPowers.findIndex((pwr) => pwr.name === power.name);
                                    if (idx !== -1) {
                                        setSelectedPowers([...selectedPowers.slice(0, idx), ...selectedPowers.slice(idx + 1, selectedPowers.length)]);
                                    }
                                } else {
                                    if (maxCorePowersSelected()) {
                                        return;
                                    }
                                    setSelectedPowers([...selectedPowers, { ...power, activation: power.activation }]);
                                }
                            }}
                            className={isPowerSelected(power) ? "power-selection selected" : maxCorePowersSelected() ? "power-selection disabled" : "power-selection"}
                            key={`add_dialog_x_stat_${power.name}`}>

                            <div className={isPowerSelected(power) ? "info-corner inverted" : "info-corner"} />
                            <div className="info-corner-text">i</div>
                            <div>{power.name}</div>
                            <div style={{ fontSize: "0.8rem" }}>{power.activation} / {power.strain} / {Array.isArray(power.category) ? `${power.category.join(", ")}` : power.category}</div>
                            <div className="info-click-area-non-core"
                                onClick={(event) => {
                                    setPreviewPower(isCaptain ? power : { ...power, activation: power.activation + 2 });
                                    event.preventDefault();
                                    event.stopPropagation();
                                }} />
                        </div>

                    ) : null}

                />

            </React.Fragment>}
        {previewPower ? <button
            onClick={(event) => {
                setPreviewPower(undefined);
                event.preventDefault();
                event.stopPropagation();
            }}
            className={"dialog-btn close-btn foreground"}
        >Close</button> : null}
        <button
            onClick={() => selectedPowers.length === powersRemaining ? updatePowers([...selectedPowers, ...corePowers].sort((a, b) => (a.name.localeCompare(b.name)))) : undefined}
            className={selectedPowers.length === powersRemaining ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
        >Confirm</button>
    </React.Fragment>;
};
