import React, { useContext, useEffect, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CustomBackButtonComponent } from "../../components/common/CustomBackButton";
import { XPDropDown } from "../../components/dropdowns/XPDropdown";
import { REWIND_XP, SPEND_XP } from "../../redux/actions";
import { CrewState, LevelImprovements } from "../../types";
import { getAdvancePerLevel } from "../../Utils";
export const LevelUpPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const dispatch = useDispatch();
    const history = useHistory();
    const [captainLevels, setCaptainLevels] = useState<number>(0);
    const [firstMateLevels, setfirstMateLevels] = useState<number>(0);
    const [deciChoice, setDeciChoice] = useState<boolean>(true);
    const [x, setX] = useState<string[]>([]);
    const [y, setY] = useState<string[]>([]);
    useEffect(() => {
        setX(getCaptainLevels());
        setY(getFirstMateLevels());
    }, [captainLevels, firstMateLevels, deciChoice]);
    const getCaptainLevels = () => {
        const difference = state.Captain && state.FirstMate ? (state.Captain.level + captainLevels) - (state.FirstMate.level + firstMateLevels) : 0;
        const experienceAvailable = Math.min(3, 20 - difference, Math.floor(state.Experience / 100) - firstMateLevels);
        return [...Array(experienceAvailable + 1).keys()].map((nr) => `${nr}`);
    };
    const getFirstMateLevels = () => {
        const difference = state.Captain && state.FirstMate ? (state.Captain.level + captainLevels) - (state.FirstMate.level + firstMateLevels) : 0;
        const experienceAvailable = Math.min(3, difference - 5, Math.floor(state.Experience / 100) - captainLevels);
        return [...Array(experienceAvailable + 1).keys()].map((nr) => `${nr}`);
    };
    const renderImprovements = (isCaptain: boolean) => {
        const lvl = isCaptain ? (state.Captain).level : (state.FirstMate).level;
        if (isCaptain ? captainLevels === 0 : firstMateLevels === 0) {
            return [<div className="improvement-token">No level up for this guy, so no improvements</div>];
        }
        const nodes: JSX.Element[] = [];
        for (let i = 1; i < (isCaptain ? captainLevels + 1 : firstMateLevels + 1); i++) {
            switch (getAdvancePerLevel(lvl + i)) {
                case LevelImprovements.LowerActivation:
                    nodes.push(<div className="improvement-token selected">{LevelImprovements.LowerActivation}</div>);
                    break;
                case LevelImprovements.ImproveStat:
                    nodes.push(<div className="improvement-token selected">{LevelImprovements.ImproveStat}</div>);
                    break;
                case LevelImprovements.NewPower:
                    nodes.push(<div className="improvement-token selected">{LevelImprovements.NewPower}</div>);
                    break;
                case LevelImprovements.NewPowerOrImproveStat:
                    nodes.push(<div style={{ display: "grid", gridTemplateColumns: "40% 20% 40%" }}>
                        <div onClick={() => deciChoice ? undefined : setDeciChoice(true)} className={deciChoice ? "improvement-token selected" : "improvement-token"}>{LevelImprovements.NewPower}</div>
                        <div style={{ textAlign: "center", fontWeight: "bold", paddingTop: "1rem" }}> OR </div >
                        <div onClick={() => deciChoice ? setDeciChoice(false) : undefined} className={!deciChoice ? "improvement-token selected" : "improvement-token"}>{LevelImprovements.ImproveStat}</div>
                    </div>);
                    break;
                default:
            }
        }
        return nodes;
    };
    return <React.Fragment>
        <div className="chapter-header">You have {state.Experience} xp left.
            <div className="modal-sub-header">For 100 xp you may buy a level for any character</div>
            <div className="modal-sub-header">Choose how many levels each character should advance by using the drop down menus</div>
        </div>

        <div className="xp-btn">
            <div>Level up {state.Captain.name} ({state.Captain.level})</div>
            <XPDropDown list={x} dropdownOptions={{ id: "captainLevels", placeholder: "0" }} callbackFn={(nr) => setCaptainLevels(parseInt(nr, 10))} />
        </div>
        <div className="flex-container">
            {renderImprovements(true)}
        </div>
        <div className="xp-btn">
            <div>Level up {state.FirstMate.name} ({state.FirstMate.level})</div>
            <XPDropDown list={y} dropdownOptions={{ id: "firstMateLevels", placeholder: "0" }} callbackFn={(nr) => setfirstMateLevels(parseInt(nr, 10))} />
        </div>
        <div className="flex-container" >
            {renderImprovements(false)}
        </div >
        <button
            onClick={() => {
                dispatch({ type: SPEND_XP, payload: ((captainLevels + firstMateLevels) * 100) });
                history.push(captainLevels > 0 ? "/LevelUpCaptain" :
                    firstMateLevels > 0 ? "/LevelUpFirstMate" :
                        "/PhysicalLootDeclaration", { captainLevels, firstMateLevels, choice: deciChoice ? LevelImprovements.NewPower : LevelImprovements.ImproveStat });
            }}
            className={"dialog-btn confirm-btn"}
        >Confirm</button>
        <CustomBackButtonComponent dispatchFunction={() => dispatch({ type: REWIND_XP })} />
    </React.Fragment >;
};
