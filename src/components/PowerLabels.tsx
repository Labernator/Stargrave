import React from "react";
import { Power } from "../types/Characters";
export const PowerLabels = ({ powers, isCaptain }: { powers: Power[] | undefined; isCaptain: boolean }) => <React.Fragment>{powers?.map((power) =>

    <div className="background-power-selection selected" style={{ maxWidth: "45%", margin: "0.1rem" }}>
        <div style={{ fontWeight: "bold" }}>{power.name}</div>
        <div style={{ fontSize: "0.65rem" }}>{power.activationValue + (isCaptain ? 0 : 2)} / {power.strain} / {Array.isArray(power.category) ? `${power.category.join(", ")}` : power.category}</div>
    </div>)}</React.Fragment> || null;
