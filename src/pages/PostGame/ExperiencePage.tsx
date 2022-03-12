import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BackButtonComponent } from "../../components/common/BackButton";
import { XPDropDown } from "../../components/dropdowns/XPDropdown";
import { ADD_XP } from "../../redux/actions";
export const ExperiencePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [crewMemberDied, setCrewMemberDied] = useState<boolean>(false);
    const [lootUnlocked, setLootUnlocked] = useState<number>(0);
    const [powerActivations, setPowerActivations] = useState<number>(0);
    const [rivalsKilled, setRivalsKilled] = useState<number>(0);
    const [npcsKilled, setNPCsKilled] = useState<number>(0);
    const [scenarioSpecific, setScenarioSpecific] = useState<number>(0);
    const getTotalXp = () => Math.min(300, (crewMemberDied ? 30 : 0) + (lootUnlocked * 20) + (powerActivations * 10) + (rivalsKilled * 10) + (npcsKilled * 5) + scenarioSpecific + 30);
    return <React.Fragment>
        <div className="chapter-header">How much Experience did you gain?</div>
        <div className="xp-btn">

            <div>Game Played</div>
            <div style={{ margin: "0rem", opacity: 1 }} className="gear-selection disabled">30 xp</div>
        </div>
        <div className={"xp-btn"}>
            <div>At Least one own crew member killed (30xp)</div>
            <XPDropDown list={["Yes", "No"]} dropdownOptions={{ id: "deadCrewman", placeholder: "No" }} callbackFn={(answer) => answer === "Yes" ? setCrewMemberDied(true) : setCrewMemberDied(false)} />
        </div>
        <div className="xp-btn">
            <div>Loot tokens unlocked <br />(+20 xp)</div>
            <XPDropDown list={["0", "1", "2", "3", "4", "5", "6", "7"]} dropdownOptions={{ id: "lootUnlocked", placeholder: "0" }} callbackFn={(nr) => setLootUnlocked(parseInt(nr, 10))} />
        </div>
        <div className="xp-btn">
            <div>Successful power casts <br />(+10 xp / Max 100 xp)</div>
            <XPDropDown list={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]} dropdownOptions={{ id: "powerActivated", placeholder: "0" }} callbackFn={(nr) => setPowerActivations(parseInt(nr, 10))} />
        </div>
        <div className="xp-btn">
            <div>Rival crew members killed <br />(+10 xp / Max 40 xp)</div>
            <XPDropDown list={["0", "1", "2", "3", "4"]} dropdownOptions={{ id: "rivalsKilled", placeholder: "0" }} callbackFn={(nr) => setRivalsKilled(parseInt(nr, 10))} />
        </div>
        <div className="xp-btn">
            <div>NPCs killed <br />(+5 xp / Max 20 xp)</div>
            <XPDropDown list={["0", "1", "2", "3", "4"]} dropdownOptions={{ id: "NPCsKilled", placeholder: "0" }} callbackFn={(nr) => setNPCsKilled(parseInt(nr, 10))} />
        </div>
        <div></div>
        <div className="xp-btn">
            <div>Scenario specific xp gained</div>
            <XPDropDown list={["0", "5", "10", "15", "20", "25", "30", "35", "40", "45", "50"]} dropdownOptions={{ id: "scenarioXP", placeholder: "0" }} callbackFn={(nr) => setScenarioSpecific(parseInt(nr, 10))} />
        </div>
        <div className="xp-btn selected">

            <div>Total Experience Gained <br />(Max 300 xp)</div>
            <div style={{ margin: "0rem", opacity: 1, fontSize: "1.2rem" }} className="gear-selection disabled">{getTotalXp()} XP</div>
        </div>
        <button
            onClick={() => {
                dispatch({
                    type: ADD_XP,
                    payload: getTotalXp(),
                });
                history.push("/LevelUp");
            }}
            className={"dialog-btn confirm-btn"}
        >Confirm</button>
        <BackButtonComponent />
    </React.Fragment>;
};
