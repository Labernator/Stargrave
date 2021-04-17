import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_CAPTAIN, SET_FIRST_MATE } from "../../redux/actions";
import { BackgroundModifications } from "../../types/Background";
import { Character, Power, StatsEnum } from "../../types/Characters";
import { isCaptain } from "../../Utils";

export const BackgroundPowerOverviewComponent = (
    { background, character, updateBackgroundCallback }:
        { background: BackgroundModifications; character: Character; updateBackgroundCallback(value: React.SetStateAction<BackgroundModifications | undefined>): void }
) => {
    const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
    const dispatch = useDispatch();
    const improvedStats = () => Object.keys(character.stats).reduce(
        (acc, stat) => ({ ...acc, [stat]: character.stats[stat as StatsEnum] + (background.statModifications.mandatory[stat as StatsEnum] || 0) + (background.statModifications.optional[stat as StatsEnum] || 0) }),
        { "Move": 0, "Fight": 0, "Shoot": 0, "Armour": 0, "Will": 0, "Health": 0 }
    );
    return <div className="power-overview-container">
        <div className="modal-header">Selected Powers Overview</div>
        {isCaptain(character.type) ? <div className="power-overview-hint">Select 2 of the following powers to lower their activation value by 1 each</div> : null}
        {background.powers.map((power, idx) =>
            <div className={selectedPowers.find((pwr) => pwr.name === power.name) ? "power-card selected" : "power-card"}
                onClick={() => {
                    if (!isCaptain(character.type)) {
                        return;
                    }
                    if (selectedPowers.find((pwr) => pwr.name === power.name)) {
                        setSelectedPowers(selectedPowers.filter((pwr) => pwr.name !== power.name));
                        updateBackgroundCallback({
                            ...background,
                            powers: [
                                ...background.powers.slice(0, idx),
                                { ...background.powers[idx], activationValue: background.powers[idx].activationValue + 1 },
                                ...background.powers.slice(idx + 1, background.powers.length),
                            ],
                        });
                    } else {
                        if (selectedPowers.length >= 2) {
                            return;
                        }
                        setSelectedPowers([...selectedPowers, power]);
                        updateBackgroundCallback({
                            ...background,
                            powers: [
                                ...background.powers.slice(0, idx),
                                { ...background.powers[idx], activationValue: background.powers[idx].activationValue - 1 },
                                ...background.powers.slice(idx + 1, background.powers.length),
                            ],
                        });
                    }
                }}>
                <div className="power-preview-name">{power.name}</div>
                <div className="power-preview-infos">{`Activation: ${power.activationValue}`} / {`Strain: ${power.strain}`} / {Array.isArray(power.category) ? `Categories: ${power.category.join(", ")}` : `Category: ${power.category}`}</div>
                <div className={power.effect.length <= 200 ? "power-preview-large-text" : power.effect.length <= 400 ? "power-preview-medium-text" : "power-preview-small-text"}>{power.effect}</div>
            </div>)}
        <button

            onClick={() => {
                dispatch({
                    type: isCaptain(character.type) ? SET_CAPTAIN : SET_FIRST_MATE,
                    payload: {
                        ...character,
                        stats: improvedStats(),
                        background: {
                            name: background.name,
                            powers: background.powers,
                        },
                    },
                });
            }}
            className={isCaptain(character.type) ? "power-btn" : "power-btn disabled"}
        >Continue</button>
    </div>;
};
