import React, { useState } from "react";

export const DialogButtonsComponent = (
    { tooltipText, dispatchCallback, dialogVisibilityCallback, canSubmit }:
        { tooltipText: string; dispatchCallback(): void; dialogVisibilityCallback(value: React.SetStateAction<boolean>): void; canSubmit(): boolean }
) => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const renderTooltip = () => <div className="button-tooltip" >{tooltipText}</div >;
    return <div id="dialog-button-section" className="dialog-button-section">
        {showTooltip ? renderTooltip() : null
        }

        <button
            onClick={(e) => {
                dialogVisibilityCallback(false);
                e.preventDefault();
                e.stopPropagation();
            }}
            className="dialog-button dialog-button-cancel"
            title="leave dialog">
            Cancel</button>
        <button
            id="submit-button"
            onClick={(e) => {
                if (!canSubmit()) {
                    setShowTooltip(true);
                    return;
                }
                dialogVisibilityCallback(false);
                dispatchCallback();
                e.preventDefault();
                e.stopPropagation();
            }}
            className={canSubmit() ? "dialog-button dialog-button-enabled" : "dialog-button dialog-button-disabled"}
            onMouseMove={() => {
                if (!canSubmit()) {
                    setShowTooltip(true);
                }
            }}
            onMouseLeave={() => {
                if (!canSubmit()) {
                    setShowTooltip(false);
                }
            }}
            title={canSubmit() ? "Press to submit" : tooltipText}>
            Submit</button>
    </div>;
};
