import React from "react";

export const CargoTile = ({ name, icon, details, bottomButton, topButton }: { name: string; icon: string; details?: string; bottomButton: JSX.Element; topButton?: JSX.Element }) =>
    <div className="cargo-tile">
        {topButton ? topButton : undefined}
        <img className="add-character-background-icons" src={icon} alt={"something so we don't get a warning"} />
        <div className="large-text">{name}</div>
        {details ? <div className="large-text">{details}</div> : undefined}
        <div style={{ paddingTop: "1rem", borderBottom: "2px solid" }} />
        {bottomButton}
    </div>;

export const TileButton = ({ text, isDisabled, clickHandler }: { text: string; isDisabled?: boolean; clickHandler(): void }) =>
    <div className={isDisabled ? "cargo-item-details-btn disabled" : "cargo-item-details-btn selected"} onClick={clickHandler}>{text}</div>;
