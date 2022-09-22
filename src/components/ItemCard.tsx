import React from "react";

export const ItemCard = ({ name, icon, type, slots, notes, armourModifier }: { name: string; icon: string; type: string; slots: number; notes: string; armourModifier?: number }) => <React.Fragment>
    <img className="add-character-background-icons" src={icon} alt={"something so we don't get a warning"} />
    <div className="large-text">{name}</div>
    <div className="medium-text">{type} / {slots > 1 ? `${slots} Gear Slots` : `${slots} Gear Slot`}</div>
    {armourModifier ? <div className="large-text" >{`${armourModifier} Armour Modifier`}</div> : undefined}
    <div className="large-text" style={{ padding: "2rem", borderBottom: "2px solid" }}>{notes}</div>
</React.Fragment>;

export const SimpleItemCard = ({ name, icon }: { name: string; icon: string }) => <React.Fragment>
    <img className="add-character-background-icons" src={icon} alt={"something so we don't get a warning"} />
    <div style={{ paddingBottom: "2rem", borderBottom: "2px solid" }} className="large-text">{name}</div>
</React.Fragment>;
