import React, { useState } from "react";
import { Power } from "../../types";

export const SelectPowerUpgrades = ({ powers, upgradePowers }: { powers: Power[]; upgradePowers(value: Power[]): void }) => {
    const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
    const [previewPower, setPreviewPower] = useState<Power | undefined>(undefined);
    const updatedArray = () => powers.filter((pwr) => !selectedPowers.find((x) => x.name === pwr.name)).concat(selectedPowers).sort((a, b) => (a.name.localeCompare(b.name)));
    const isPowerSelected = (power: Power) => !!selectedPowers.find((pwr) => pwr.name === power.name);
    return <React.Fragment >
        {previewPower ?
            <React.Fragment >
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
            </React.Fragment > :
            <React.Fragment>
                <div className="modal-header">Select 2 of the following powers to lower their activation value by 1 each</div>
                {powers.map((power) => <div style={{ display: "inline-block", width: "100%" }}>
                    <div className={isPowerSelected(power) ? "background-power-selection full-width selected" : "background-power-selection full-width"}
                        onClick={() => {
                            if (selectedPowers.find((pwr) => pwr.name === power.name)) {
                                setSelectedPowers(selectedPowers.filter((pwr) => pwr.name !== power.name));
                            } else {
                                if (selectedPowers.length >= 2) {
                                    return;
                                }
                                setSelectedPowers([...selectedPowers, { ...power, activation: power.activation - 1 }]);
                            }
                        }}
                        key={`add_dialog_x_stat_${power.name}`}>
                        <div className={isPowerSelected(power) ? "info-corner inverted" : "info-corner "} />
                        <div className="info-corner-text">i</div>
                        <div>{power.name}</div>
                        <div style={{ fontSize: "0.8rem" }}>{isPowerSelected(power) ? power.activation - 1 : power.activation} / {power.strain} / {Array.isArray(power.category) ? `${power.category.join(", ")}` : power.category}</div>

                    </div>
                    <div className="info-click-area"
                        onClick={(event) => {
                            setPreviewPower(power);
                            event.preventDefault();
                            event.stopPropagation();
                        }} />
                </div>)}

            </React.Fragment >
        }
        {previewPower ? <button
            onClick={(event) => {
                setPreviewPower(undefined);
                event.preventDefault();
                event.stopPropagation();
            }}
            className={"dialog-btn close-btn foreground"}
        >Close</button> : null}
        <button
            onClick={() => selectedPowers.length === 2 ? upgradePowers(updatedArray()) : undefined}
            className={selectedPowers.length === 2 ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
        >Confirm</button>
    </React.Fragment >;
};
