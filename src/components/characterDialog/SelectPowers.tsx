import React, { useState } from "react";
import * as Backgrounds from "../../data/Backgrounds.json";
import { BackgroundEnum, BackgroundModifications, BackgroundOptions, Power } from "../../types";
import { getPowerInfos } from "../../Utils";

const backgroundInformation = Backgrounds.backgrounds as BackgroundOptions[];
const getBackgroundInfos = (background: BackgroundEnum) => backgroundInformation.find((bg) => bg.name === background) as BackgroundOptions;

export const SelectPowers = (
    { background, isCaptain, updatePowers }:
        { background: BackgroundModifications; isCaptain: boolean; updatePowers(value: Power[]): void }
) => {
    const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
    const [previewPower, setPreviewPower] = useState<Power>();

    const isPowerSelected = (power: Power) => !!selectedPowers.find((pwr) => pwr.name === power.name);
    const minPowersSelected = () => selectedPowers.length >= (isCaptain ? 3 : 2);
    const maxPowersSelected = () => selectedPowers.length >= (isCaptain ? 4 : 3);

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
                    {`Choose ${isCaptain ? "3 - 4" : "2 - 3"} core Powers`}
                    <div className="modal-sub-header">{"Click the info icon in the top right corner of a power to view its details"}</div>
                </div>
                {background ? getPowerInfos(getBackgroundInfos(background.name).corePowers).map((power) => <div style={{ display: "inline-block", width: "100%" }}>
                    <div
                        onClick={() => {
                            if (isPowerSelected(power)) {
                                const idx = selectedPowers.findIndex((pwr) => pwr.name === power.name);
                                if (idx !== -1) {
                                    setSelectedPowers([...selectedPowers.slice(0, idx), ...selectedPowers.slice(idx + 1, selectedPowers.length)]);
                                }
                            } else {
                                if (maxPowersSelected()) {
                                    return;
                                }
                                setSelectedPowers([...selectedPowers, { ...power, activation: power.activation + (isCaptain ? 0 : 2) }]);
                            }
                        }}
                        className={isPowerSelected(power) ? "power-selection selected" : maxPowersSelected() ? "power-selection disabled" : "power-selection"}
                        key={`add_dialog_x_stat_${power.name}`}>

                        <div className={isPowerSelected(power) ? "info-corner inverted" : "info-corner "} />
                        <div className="info-corner-text">i</div>
                        <div>{power.name}</div>
                        <div style={{ fontSize: "0.8rem" }}>{power.activation + (isCaptain ? 0 : 2)} / {power.strain} / {Array.isArray(power.category) ? `${power.category.join(", ")}` : power.category}</div>
                    </div>
                    <div className="info-click-area"
                        onClick={(event) => {
                            setPreviewPower(isCaptain ? power : { ...power, activation: power.activation + 2 });
                            event.preventDefault();
                            event.stopPropagation();
                        }} />
                </div>
                ) : null}
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
            onClick={() => minPowersSelected() ? updatePowers(selectedPowers.sort((a, b) => (a.name.localeCompare(b.name)))) : undefined}
            className={minPowersSelected() ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
        >Confirm</button>
    </React.Fragment>;
};
