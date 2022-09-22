import React, { useEffect, useState } from "react";
import { Soldier, SoldierMetadata } from "../types";
import { StringInputComponent } from "./common/StringInputComponent";
import { SoldierComponent } from "./SoldierComponent";
import { SoldierEditor } from "./SoldierEditor";
const names = ["Alex", "Anakin", "Apollo", "Ash", "Ben", "Buck", "Connor", "Duncan", "Echo", "Finn", "Fox", "Groot", "Han", "Harold", "Henry", "Holden", "Jack", "Jonas", "Julian", "Kaidan", "Kane", "Lando", "Lon", "Luke", "Malcolm", "Max", "Mickey", "Miles", "Montgomery", "Poe", "Peter", "Quinn", "Richard", "Riker", "Rocket", "Saren", "Wesley", "Yoda", "Ziggy", "Aeryn", "Alura", "Athena", "Beverly", "Clara", "Dana", "Dasha", "Delenn", "Diana", "Donna", "Elise", "Ezri", "Gamora", "Holly", "Inara", "Janice", "Jenny", "Jessica", "Kathryn", "Kira", "Leia", "Liara", "Lorraine", "Maggie", "Martha", "Maya", "Missy", "Monica", "Moya", "Padme", "Rey", "Ripley", "River", "Rose", "Serina", "Tasha", "Theora", "Vala", "Zephyra", "Zyla", "Zhora"];
export const SoldierDialog = ({ previewSoldier, otherSoldiers, callbackHandler }: { previewSoldier: SoldierMetadata; otherSoldiers: Soldier[]; callbackHandler(soldier: Soldier): void }) => {
    const getRandomName = () => names[Math.floor((Math.random() * names.length))];
    useEffect(() => setSoldierName(getRandomName()), [otherSoldiers]);
    const [soldierName, setSoldierName] = useState<string>(getRandomName());
    const [gear, setGear] = useState<string[]>(previewSoldier.gear);
    return <div className="flex-container" style={{ clear: "both" }}>
        <div className="modal-header">What is the name of your new crew member?</div>
        <StringInputComponent currentState={soldierName} tooltip={soldierName} cssClass={"input-field"} callback={setSoldierName} />
        <SoldierEditor previewSoldier={{ ...previewSoldier, name: soldierName, gearSlots: 1, gear }} callback={setGear} />
        <div className="page-btn" onClick={() => callbackHandler({ ...previewSoldier, gearSlots: 1, name: soldierName, gear })}>{`Hire ${soldierName} for ${previewSoldier.cost}  \xA5`}</div>
        {otherSoldiers.map((sol) => <SoldierComponent soldier={{ ...sol, gearSlots: 1, gear: sol.gear }} />)}
    </div>;
};
