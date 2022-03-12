import React, { useContext, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BackButtonComponent } from "../../components/common/BackButton";
import { XPDropDown } from "../../components/dropdowns/XPDropdown";
import { MODIFY_SOLDIER, REMOVE_SOLDIERS, SET_CAPTAIN, SET_FIRST_MATE } from "../../redux/actions";
import { Character, CharactersEnum, CrewState, Soldier } from "../../types";
interface CrewUpdates {
    member: Soldier | Character;
    change: CrewInjuries | CharacterInjuries;
}
enum CrewInjuries {
    DEAD = "Dead (1-4)",
    WOUNDED = "Badly Wounded (5-8)",
    RECOVERY = "Full Recovery (9-20)",
}
enum CharacterInjuries {
    BARELY_ALIVE = "Barely Alive (1-2)",
    WOUNDED = "Badly Wounded (3-6)",
    CLOSE_CALL = "Close Call (7-8)",
    RECOVERY = "Full Recovery (9-20)",
}
export const PostGameSequencePage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const history = useHistory();
    const dispatch = useDispatch();
    const [crewUpdates, setCrewUpdates] = useState<CrewUpdates[]>([]);
    const updateCrewMan = (crewman: Soldier, value: string) => {
        const filteredList = crewUpdates.filter((member) => {
            if (member.member.hasOwnProperty("amount")) {
                const crewmember = (member.member as Soldier);
                return !(crewmember.id === crewman.id && crewmember.type === crewman.type);
            }
            return true;
        });
        setCrewUpdates([...filteredList, { member: crewman, change: value as CrewInjuries }]);
    };
    const updateCharacter = (char: Character, value: string) => {
        const filteredList = crewUpdates.filter((ch) => {
            if (ch.member.hasOwnProperty("name")) {
                const crewmember = (ch.member as Character);
                return !(crewmember.name === char.name);
            }
            return true;
        });
        setCrewUpdates([...filteredList, { member: char, change: value as CharacterInjuries }]);
    };
    const aftermath = () => {
        const deadSoldiers: Soldier[] = [];
        crewUpdates.forEach((update) => {
            const crewman = state.Soldiers.find((sol) => sol.id === (update.member as Soldier).id && sol.type === update.member.type);
            switch (update.change) {
                case CrewInjuries.DEAD:
                    if (crewman) {
                        deadSoldiers.push(crewman);
                    }
                    break;
                case CharacterInjuries.BARELY_ALIVE:
                    dispatch({
                        type: update.member.type === CharactersEnum.Captain ? SET_CAPTAIN : SET_FIRST_MATE,
                        payload: update.member.type === CharactersEnum.Captain ? { ...state.Captain, missNextGame: true } : { ...state.FirstMate, missNextGame: true },
                    });
                    break;
                case CharacterInjuries.WOUNDED:
                    dispatch({
                        type: update.member.type === CharactersEnum.Captain ? SET_CAPTAIN : SET_FIRST_MATE,
                        payload: update.member.type === CharactersEnum.Captain ?
                            { ...state.Captain, currentHealth: Math.floor(state.Captain.stats.Health / 2) } :
                            { ...state.FirstMate, currentHealth: Math.floor(state.FirstMate.stats.Health / 2) },
                    });
                    break;
                case CrewInjuries.WOUNDED:
                    if (crewman) {
                        dispatch({
                            type: MODIFY_SOLDIER,
                            payload: { ...crewman, currentHealth: Math.floor(state.FirstMate.stats.Health / 2) },
                        });
                    }
                    break;
                case CharacterInjuries.CLOSE_CALL:
                case CrewInjuries.RECOVERY:
            }
        });
        dispatch({
            type: REMOVE_SOLDIERS,
            payload: deadSoldiers,
        });
    };
    const renderInjuryAndDeathCrew = (crewman: Soldier) => <React.Fragment>
        <div className="injuries-btn">
            <div>{crewman.type} #{crewman.id}</div>
            <XPDropDown list={Object.values(CrewInjuries)} dropdownOptions={{ id: `${crewman.type}#${crewman.id}`, placeholder: CrewInjuries.RECOVERY }} callbackFn={(val) => updateCrewMan(crewman, val)} />
        </div>
    </React.Fragment>;
    const renderInjuryAndDeathCharacter = (char: Character) => <React.Fragment>
        <div className="injuries-btn">
            <div>{char.name} ({char.level})</div>
            <XPDropDown list={Object.values(CharacterInjuries)} dropdownOptions={{ id: `${char.name}`, placeholder: CharacterInjuries.RECOVERY }} callbackFn={(val) => updateCharacter(char, val)} />
        </div>
    </React.Fragment>;
    return <React.Fragment>
        <div className="chapter-header">Congratulation on completing the last mission</div>
        <div className="modal-header">
            Now you need to distribute the spoils of war and tend to your crew.
            </div>
        <div className="modal-header">But first things first. How is your crew?</div>
        {renderInjuryAndDeathCharacter(state.Captain)}
        {renderInjuryAndDeathCharacter(state.FirstMate)}
        {state.Soldiers.map(renderInjuryAndDeathCrew)}
        <button
            onClick={() => {
                aftermath();
                history.push("/Experience");
            }}
            className={"dialog-btn confirm-btn"}
        >Confirm</button>
        <BackButtonComponent />
    </React.Fragment>;
};
