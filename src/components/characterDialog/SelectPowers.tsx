import React, { useState } from "react";
import * as Backgrounds from "../../data/Backgrounds.json";
import { BackgroundEnum, BackgroundModifications, BackgroundOptions } from "../../types/Background";
import { Power } from "../../types/Characters";
import { getNonCorePowers, getPowerInfos, isCorePower } from "../../Utils";

const backgroundInformation = Backgrounds.backgrounds as BackgroundOptions[];
const getBackgroundInfos = (background: BackgroundEnum) => backgroundInformation.find((bg) => bg.name === background) as BackgroundOptions;

export const SelectPowers = (
    { background, isCaptain, updatePowers }:
        { background: BackgroundModifications; isCaptain: boolean; updatePowers(value: Power[]): void }
) => {
    const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
    const [previewPower, setPreviewPower] = useState<Power>({ name: "", activationValue: 0, strain: 0, category: "Touch", effect: "Click any Power to preview here" });
    const isPowerSelected = (power: Power) => !!selectedPowers.find((pwr) => pwr.name === power.name);
    const infos = getBackgroundInfos(background.name);

    const maxCorePowersSelected = () => {
        let powersRemaining = isCaptain ? 4 : 3;
        if (selectedPowers.filter((power) => !isCorePower(power.name, background.name)).length === 2) {
            powersRemaining = isCaptain ? 3 : 2;
        }
        return selectedPowers.filter((power) => isCorePower(power.name, background.name)).length >= powersRemaining;
    };

    const maxNonCorePowersSelected = () => selectedPowers.filter((power) => !isCorePower(power.name, background.name)).length >= (maxCorePowersSelected() ? 1 : 2);
    const maxPowersSelected = () => selectedPowers.length >= (isCaptain ? 5 : 4);

    return <React.Fragment>
        <div className="power-preview-section">
            <div className="power-preview-name">{previewPower.name}</div>
            <div className="power-preview-infos">{`Activation: ${previewPower.activationValue}`} / {`Strain: ${previewPower.strain}`} / {Array.isArray(previewPower.category) ? `Categories: ${previewPower.category.join(", ")}` : `Category: ${previewPower.category}`}</div>
            <div className={previewPower.effect.length <= 200 ? "power-preview-large-text" : previewPower.effect.length <= 400 ? "power-preview-medium-text" : "power-preview-small-text"}>{previewPower.effect}</div>
        </div>
        <div className="core-power-section">
            <div className="modal-header">{`Choose ${isCaptain ? "3 - 4" : "2 - 3"} core Powers`}</div>
            <div className="section-div" >
                {background ? getPowerInfos(infos.corePowers).map((power) => <div
                    style={{ float: "none" }}
                    onMouseOver={() => setPreviewPower(power)}
                    onClick={() => {
                        setPreviewPower(isCaptain ? power : { ...power, activationValue: power.activationValue + 2 });
                        if (isPowerSelected(power)) {
                            const idx = selectedPowers.findIndex((pwr) => pwr.name === power.name);
                            if (idx !== -1) {
                                setSelectedPowers([...selectedPowers.slice(0, idx), ...selectedPowers.slice(idx + 1, selectedPowers.length)]);
                            }
                        } else {
                            if (maxCorePowersSelected()) {
                                return;
                            }
                            setSelectedPowers([...selectedPowers, { ...power, activationValue: power.activationValue + (isCaptain ? 0 : 2) }]);
                        }
                    }}
                    className={isPowerSelected(power) ? "background-power-selection selected" : maxCorePowersSelected() ? "background-power-selection disabled" : "background-power-selection"}
                    key={`add_dialog_x_stat_${power.name}`}>
                    <div>{power.name}</div>
                    <div style={{ fontSize: "0.65rem" }}>{power.activationValue + (isCaptain ? 0 : 2)} / {power.strain} / {Array.isArray(power.category) ? `${power.category.join(", ")}` : power.category}</div>
                </div>
                ) : null}
            </div>
        </div>
        <div className="non-core-power-section">
            <div className="modal-header">Choose 1 - 2 non-core Powers</div>
            <div className="section-div" >
                {background ? getNonCorePowers(background.name).map((power) => <div
                    onMouseOver={() => setPreviewPower(power)}
                    onClick={() => {
                        setPreviewPower({ ...power, activationValue: power.activationValue + (isCaptain ? 2 : 4) });
                        if (isPowerSelected(power)) {
                            const idx = selectedPowers.findIndex((pwr) => pwr.name === power.name);
                            if (idx !== -1) {
                                setSelectedPowers([...selectedPowers.slice(0, idx), ...selectedPowers.slice(idx + 1, selectedPowers.length)]);
                            }
                        } else {
                            if (maxNonCorePowersSelected()) {
                                return;
                            }
                            setSelectedPowers([...selectedPowers, { ...power, activationValue: power.activationValue + (isCaptain ? 2 : 4) }]);
                        }
                    }}
                    className={isPowerSelected(power) ? "background-power-selection selected" : maxNonCorePowersSelected() ? "background-power-selection disabled" : "background-power-selection"}
                    key={`add_dialog_x_stat_${power.name}`}>
                    <div>{power.name}</div>
                    <div style={{ fontSize: "0.65rem" }}>{power.activationValue + (isCaptain ? 2 : 4)} / {power.strain} / {Array.isArray(power.category) ? `${power.category.join(", ")}` : power.category}</div>
                </div>
                ) : null}
            </div>
        </div>
        <button
            onClick={() => maxPowersSelected() ? updatePowers(selectedPowers.sort((a, b) => (a.name.localeCompare(b.name)))) : undefined}
            className={maxPowersSelected() ? "power-btn" : "power-btn disabled"}
        >{`${isCaptain ? "Confirm Powers selection" : "Confirm Powers selection and finish creation"}`}</button>
    </React.Fragment>;
};
