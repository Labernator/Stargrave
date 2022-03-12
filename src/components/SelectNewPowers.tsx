import React, { useState } from "react";
import { BackgroundEnum, ModifiedPower, Power } from "../types";
import { getUnselectedPowers, isCorePower } from "../Utils";
import { Carousel } from "./common/Carousel";

export const SelectNewPowers = (
    { currentPowers, background, updatePowers }:
        { currentPowers: ModifiedPower[]; background: BackgroundEnum; updatePowers(value: ModifiedPower | undefined): void }
) => {
    const [selectedPower, setSelectedPower] = useState<ModifiedPower>();
    const isPowerSelected = (power: Power) => selectedPower && selectedPower.name === power.name;
    return <React.Fragment>
        <div className="modal-header">
            {"Choose 1 additional Power"}
            <div className="modal-sub-header">{"Swipe or use the page buttons to see more entries"}</div>
        </div>
        <Carousel
            splitSize={8}
            inputDivs={getUnselectedPowers(currentPowers).map((power) =>
                <div
                    onClick={() => {
                        if (selectedPower) {
                            setSelectedPower(undefined);
                            updatePowers(undefined);
                        } else {
                            setSelectedPower(power);
                            updatePowers({ name: power.name, activation: isCorePower(power.name, background) ? power.activation : power.activation + 2 });
                        }
                    }}
                    className={isPowerSelected(power) ? "power-selection emphasized selected" : selectedPower ? "power-selection disabled" : "power-selection"}
                    key={`add_dialog_x_stat_${power.name}`}>

                    <div>{power.name}</div>
                    <div style={{
                        fontSize: "0.8rem",
                        fontWeight: "normal",
                    }}>
                        {isCorePower(power.name, background) ? power.activation : power.activation + 2} / {power.strain} / {Array.isArray(power.category) ? `${power.category.join(", ")}` : power.category}
                    </div>
                </div>
            )}
        />
    </React.Fragment>;
};
