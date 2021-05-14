import { useState } from "react";
import { Power } from "../../types/Characters";

export const SelectPowerUpgrades = ({ powers, upgradePowers }: { powers: Power[]; upgradePowers(value: Power[]): void }) => {
    const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
    const [previewPower, setPreviewPower] = useState<Power>({ name: "", activation: 0, strain: 0, category: "Touch", effect: "Click any Power to preview here" });
    const updatedArray = () => powers.filter((pwr) => !selectedPowers.find((x) => x.name === pwr.name)).concat(selectedPowers).sort((a, b) => (a.name.localeCompare(b.name)));
    const isPowerSelected = (power: Power) => !!selectedPowers.find((pwr) => pwr.name === power.name);
    return <div className="power-overview-container">
        <div style={{ width: "100%" }}>
            <div className="power-preview-section">
                <div className="power-preview-name">{`${previewPower.name}`}</div>
                <div className="power-preview-infos">
                    {`Activation: ${previewPower.activation}`} / {`Strain: ${previewPower.strain}`} / {Array.isArray(previewPower.category) ? `Categories: ${previewPower.category.join(", ")}` : `Category: ${previewPower.category}`}
                </div>
                <div className={previewPower.effect.length <= 200 ? "power-preview-large-text" : previewPower.effect.length <= 400 ? "power-preview-medium-text" : "power-preview-small-text"}>{previewPower.effect}</div>
            </div>
        </div>
        <div className="modal-header">Select 2 of the following powers to lower their activation value by 1 each</div>
        {powers.map((power) =>
            <div className={isPowerSelected(power) ? "background-power-selection full-width selected" : "background-power-selection full-width"}
                onMouseOver={() => setPreviewPower(power)}
                onClick={() => {
                    setPreviewPower(power);
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
                <div>{power.name}</div>
                <div style={{ fontSize: "0.8rem" }}>
                    {isPowerSelected(power) ? selectedPowers.find((pwr) => pwr.name === power.name)?.activation : power.activation} / {power.strain} / {Array.isArray(power.category) ? `${power.category.join(", ")}` : power.category}
                </div>
            </div>)}
        <button
            onClick={() => selectedPowers.length === 2 ? upgradePowers(updatedArray()) : undefined}
            className={selectedPowers.length === 2 ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
        >Confirm</button>
    </div>;
};
