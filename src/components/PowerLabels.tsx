import React from "react";
import { ModifiedPower } from "../types/Characters";
import { getPower } from "../Utils";
export const PowerLabels = ({ powers, isCaptain }: { powers: ModifiedPower[] | undefined; isCaptain: boolean }) =>
    <React.Fragment>
        {powers?.map((power) => {
            const powerDetails = getPower(power.name);
            powerDetails.activation = power.activation;
            return <div className="background-power-selection selected" style={{ maxWidth: "45%", margin: "0.1rem" }}>
                <div style={{ fontWeight: "bold" }}>{powerDetails.name}</div>
                <div style={{ fontSize: "0.65rem" }}>{powerDetails.activation + (isCaptain ? 0 : 2)} / {powerDetails.strain} / {Array.isArray(powerDetails.category) ? `${powerDetails.category.join(", ")}` : powerDetails.category}</div>
            </div>;
        })}
    </React.Fragment>;
