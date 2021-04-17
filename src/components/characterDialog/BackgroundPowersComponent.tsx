import React, { useState } from "react";
import * as Backgrounds from "../../data/Backgrounds.json";
import { BackgroundEnum, BackgroundModifications, BackgroundOptions } from "../../types/Background";
import { Power } from "../../types/Characters";
import { getNonCorePowers, getPowerInfos, maxCorePowersSelected, maxNonCorePowersSelected } from "../../Utils";

const backgroundInformation = Backgrounds.backgrounds as BackgroundOptions[];
const getBackgroundInfos = (background: BackgroundEnum) => backgroundInformation.find((bg) => bg.name === background) as BackgroundOptions;

export const BackgroundPowersComponent = (
    { background, isCaptain, updateBackgroundCallback, hideComponent }:
        { background: BackgroundModifications; isCaptain: boolean; updateBackgroundCallback(value: React.SetStateAction<BackgroundModifications | undefined>): void; hideComponent(value: boolean): void }
) => {
    const [previewPower, setPreviewPower] = useState<Power>({ name: "", activationValue: 0, strain: 0, category: "Touch", effect: "Click any Power to preview here" });
    const isPowerSelected = (power: Power) => !!background?.powers?.find((pwr) => pwr.name === power.name);
    const infos = getBackgroundInfos(background.name);
    const maxPowersSelected = () => false;
    return <React.Fragment>
        <div className="power-preview-section">
            <div className="power-preview-name">{previewPower.name}</div>
            <div className="power-preview-infos">{`Activation: ${previewPower.activationValue}`} / {`Strain: ${previewPower.strain}`} / {Array.isArray(previewPower.category) ? `Categories: ${previewPower.category.join(", ")}` : `Category: ${previewPower.category}`}</div>
            <div className={previewPower.effect.length <= 200 ? "power-preview-large-text" : previewPower.effect.length <= 400 ? "power-preview-medium-text" : "power-preview-small-text"}>{previewPower.effect}</div>
        </div>
        <div className="core-power-section">
            <div className="dialog-sub-header">{`Choose ${isCaptain ? "3 - 4" : "2 - 3"} core Powers`}</div>
            <div className="section-div" >
                {background ? getPowerInfos(infos.corePowers).map((power) => <div
                    style={{ float: "none" }}
                    onMouseOver={() => setPreviewPower(power)}
                    onClick={() => {
                        setPreviewPower(isCaptain ? power : { ...power, activationValue: power.activationValue + 2 });
                        if (isPowerSelected(power)) {
                            const idx = background.powers.findIndex((pwr) => pwr.name === power.name);
                            if (idx !== -1) {
                                updateBackgroundCallback({
                                    ...background,
                                    powers: [...background.powers.slice(0, idx), ...background.powers.slice(idx + 1, background.powers.length)],
                                });
                            }
                        } else {
                            if (maxCorePowersSelected(background, isCaptain)) {
                                return;
                            }
                            updateBackgroundCallback({ ...background, powers: [...background.powers, { ...power, activationValue: power.activationValue + (isCaptain ? 0 : 2) }] });
                        }
                    }}
                    className={isPowerSelected(power) ? "background-power-selection selected" : maxCorePowersSelected(background, isCaptain) ? "background-power-selection disabled" : "background-power-selection"}
                    key={`add_dialog_x_stat_${power.name}`}>
                    <div>{power.name}</div>
                    <div style={{ fontSize: "0.65rem" }}>{power.activationValue + (isCaptain ? 0 : 2)} / {power.strain} / {Array.isArray(power.category) ? `${power.category.join(", ")}` : power.category}</div>
                </div>
                ) : null}
            </div>
        </div>
        <div className="non-core-power-section">
            <div className="dialog-sub-header">Choose 1 - 2 non-core Powers</div>
            <div className="section-div" >
                {background ? getNonCorePowers(background.name).map((power) => <div
                    onClick={() => {
                        setPreviewPower({ ...power, activationValue: power.activationValue + (isCaptain ? 2 : 4) });
                        if (isPowerSelected(power)) {
                            const idx = background.powers.findIndex((pwr) => pwr.name === power.name);
                            if (idx !== -1) {
                                updateBackgroundCallback({
                                    ...background,
                                    powers: [...background.powers.slice(0, idx), ...background.powers.slice(idx + 1, background.powers.length)],
                                });
                            }
                        } else {
                            if (maxNonCorePowersSelected(background, isCaptain)) {
                                return;
                            }
                            updateBackgroundCallback({ ...background, powers: [...background.powers, { ...power, activationValue: power.activationValue + (isCaptain ? 2 : 4) }] });
                        }
                    }}
                    className={isPowerSelected(power) ? "background-power-selection selected" : maxNonCorePowersSelected(background, isCaptain) ? "background-power-selection disabled" : "background-power-selection"}
                    key={`add_dialog_x_stat_${power.name}`}>
                    <div>{power.name}</div>
                    <div style={{ fontSize: "0.65rem" }}>{power.activationValue + (isCaptain ? 2 : 4)} / {power.strain} / {Array.isArray(power.category) ? `${power.category.join(", ")}` : power.category}</div>
                </div>
                ) : null}
            </div>
        </div>
        <button
            onClick={() => maxPowersSelected() ? hideComponent(true) : undefined}
            className={maxPowersSelected() ? "power-btn" : "power-btn disabled"}
        >Continue</button>
    </React.Fragment>;
};
