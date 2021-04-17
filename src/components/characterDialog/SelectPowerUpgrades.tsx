import { useState } from "react";
import { Power } from "../../types/Characters";

export const SelectPowerUpgrades = (
    { powers, upgradePowers }:
        { powers: Power[]; upgradePowers(value: Power[]): void }
) => {
    const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
    const updatedArray = () => powers.filter((pwr) => !selectedPowers.find((x) => x.name === pwr.name)).concat(selectedPowers).sort((a, b) => (a.name.localeCompare(b.name)));

    return <div className="power-overview-container">
        <div className="modal-header">Selected Powers Overview</div>
        <div className="power-overview-hint">Select 2 of the following powers to lower their activation value by 1 each</div>
        {powers.map((power) =>
            <div className={selectedPowers.find((pwr) => pwr.name === power.name) ? "power-card selected" : "power-card"}
                onClick={() => {
                    if (selectedPowers.find((pwr) => pwr.name === power.name)) {
                        setSelectedPowers(selectedPowers.filter((pwr) => pwr.name !== power.name));
                    } else {
                        if (selectedPowers.length >= 2) {
                            return;
                        }
                        setSelectedPowers([...selectedPowers, { ...power, activationValue: power.activationValue - 1 }]);
                    }
                }}>
                <div className="power-preview-name">{power.name}</div>
                <div className="power-preview-infos">{`Activation: ${power.activationValue}`} / {`Strain: ${power.strain}`} / {Array.isArray(power.category) ? `Categories: ${power.category.join(", ")}` : `Category: ${power.category}`}</div>
                <div className={power.effect.length <= 200 ? "power-preview-large-text" : power.effect.length <= 400 ? "power-preview-medium-text" : "power-preview-small-text"}>{power.effect}</div>
            </div>)}
        <button
            onClick={() => selectedPowers.length === 2 ? upgradePowers(updatedArray()) : undefined}
            className={selectedPowers.length === 2 ? "power-btn" : "power-btn disabled"}
        >Confirm selection and finish creation</button>
    </div>;
};
