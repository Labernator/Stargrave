import React, { useState } from "react";
import * as Backgrounds from "../../data/Backgrounds.json";
import { BackgroundEnum, BackgroundModifications, BackgroundOptions } from "../../types/Background";
import { Power } from "../../types/Characters";
import { PowerCategory } from "../../types/Power";
import { getNonCorePowers, isCorePower } from "../../Utils";
import { Carousel } from "./Carousel";
import { PowerFilter } from "./PowerFilter";

const backgroundInformation = Backgrounds.backgrounds as BackgroundOptions[];
const getBackgroundInfos = (background: BackgroundEnum) => backgroundInformation.find((bg) => bg.name === background) as BackgroundOptions;

export const SelectNonCorePowers = (
    { background, corePowers, isCaptain, updatePowers }:
        { background: BackgroundModifications; corePowers: Power[]; isCaptain: boolean; updatePowers(value: Power[]): void }
) => {
    const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
    const [previewPower, setPreviewPower] = useState<Power>({ name: "", activation: 0, strain: 0, category: "Touch", effect: "Click any Power to preview here" });
    const [filteredPowerList, setFilteredPowerList] = useState<Power[]>(getNonCorePowers(background.name, isCaptain));
    const isPowerSelected = (power: Power) => !!selectedPowers.find((pwr) => pwr.name === power.name);
    const infos = getBackgroundInfos(background.name);
    const maxCorePowersSelected = () => {
        let powersRemaining2 = isCaptain ? 4 : 3;
        if (selectedPowers.filter((power) => !isCorePower(power.name, background.name)).length === 2) {
            powersRemaining2 = isCaptain ? 3 : 2;
        }
        return selectedPowers.filter((power) => isCorePower(power.name, background.name)).length >= powersRemaining2;
    };
    const powersRemaining = (isCaptain ? 5 : 4) - corePowers.length;

    return <React.Fragment>
        <div className="modal-header">
            {`Choose ${powersRemaining} additional ${powersRemaining === 1 ? "Power" : "Powers"}`}
            <div className="modal-sub-header">{"Use the filters to find what you are looking for. Swipe or use the page buttons to see more entries"}</div>
        </div>
        <div className="single-selection-gear">
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
        </div>
        <Carousel inputDivs={background ? filteredPowerList.map((power) =>
            <div
                onMouseOver={() => setPreviewPower(power)}
                onClick={() => {
                    setPreviewPower(power);
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
                className={isPowerSelected(power) ? "power-selection noncore-power selected" : maxCorePowersSelected() ? "power-selection noncore-power disabled" : "power-selection noncore-power"}
                key={`add_dialog_x_stat_${power.name}`}>

                <div className={isPowerSelected(power) ? "noncore-info info-corner inverted" : "noncore-info info-corner "} />
                <div className="noncore-info info-corner-text">i</div>
                <div>{power.name}</div>
                <div style={{ fontSize: "0.8rem" }}>{power.activation} / {power.strain} / {Array.isArray(power.category) ? `${power.category.join(", ")}` : power.category}</div>
            </div>
            // <div className="info-click-area"
            //     onClick={(event) => {
            //         setPreviewPower(isCaptain ? power : { ...power, activation: power.activation + 2 });
            //         event.preventDefault();
            //         event.stopPropagation();
            //     }} />
        ) : null}
        />
        <button
            onClick={() => selectedPowers.length === powersRemaining ? updatePowers([...selectedPowers, ...corePowers].sort((a, b) => (a.name.localeCompare(b.name)))) : undefined}
            className={selectedPowers.length === powersRemaining ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
        >Confirm</button>
    </React.Fragment>;
};
