import React, { useContext, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Carousel } from "../../components/common/Carousel";
import { CustomBackButtonComponent } from "../../components/common/CustomBackButton";
import { SelectNewPowers } from "../../components/SelectNewPowers";
import { REWIND_XP, SET_CAPTAIN, SET_FIRST_MATE } from "../../redux/actions";
import { BackgroundEnum, CrewState, LevelImprovements, LevelUpState, ModifiedPower, Power, Stats, StatsEnum } from "../../types";
import { getAdvancePerLevel, getPower } from "../../Utils";
interface LvlImprov {
    LevelImprovement: LevelImprovements;
    amount: number;
}
export const LevelUpCharacterPage = ({ isCaptainCharacter, pageState }: { isCaptainCharacter: boolean; pageState: LevelUpState }) => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const character = isCaptainCharacter ? state.Captain : state.FirstMate;
    const dispatch = useDispatch();
    const history = useHistory();
    const levelsGained = isCaptainCharacter ? pageState.captainLevels : pageState.firstMateLevels;
    const [selectedPowers, setSelectedPowers] = useState<ModifiedPower[]>([]);
    const [newPower, setNewPower] = useState<ModifiedPower | undefined>(undefined);
    const [selections, setSelections] = useState<Array<Partial<Stats>>>([]);
    const isPowerSelected = (power: ModifiedPower) => !!selectedPowers.find((pwr) => pwr.name === power.name);
    const isStatSelected = (statName: string) => selections.find((stat) => stat[statName as StatsEnum] !== undefined);
    const improvedStats = () => {
        const captainStats = character.stats;
        let newStats: Stats = { ...captainStats };
        selections.forEach((sel) => newStats = { ...newStats, ...sel });
        return newStats;
    };
    const actualAdvances = () => {
        const currentLevel = character.level;
        const advances: LvlImprov[] = [];
        for (let i = currentLevel + 1; i < currentLevel + 1 + levelsGained; i++) {
            const advance = getAdvancePerLevel(i);
            if (advance) {
                const foundAdvance = advances.find((adv) => adv.LevelImprovement === advance);
                if (foundAdvance) {
                    const foundIdx = advances.findIndex((adv) => adv.LevelImprovement === advance);
                    advances[foundIdx] = { LevelImprovement: advance, amount: foundAdvance.amount + 1 };
                } else {
                    advances.push({ LevelImprovement: advance, amount: 1 });
                }
            }
        }
        return advances;
    };
    const allDoneFn = () => {
        const advances = actualAdvances();
        let allDone = true;
        for (const advance of advances) {
            switch (advance.LevelImprovement) {
                case LevelImprovements.LowerActivation:
                    allDone = (advance.amount <= selectedPowers.length);
                    break;
                case LevelImprovements.ImproveStat:
                    allDone = (advance.amount <= selections.length);
                    break;
                case LevelImprovements.NewPower:
                    allDone = !!newPower;
                    break;
                case LevelImprovements.NewPowerOrImproveStat:
                    if (pageState.choice === LevelImprovements.NewPower) {
                        allDone = !!newPower;
                    } else if (pageState.choice === LevelImprovements.ImproveStat) {
                        allDone = (advance.amount <= selections.length);
                    }
            }
        }
        return allDone;
    };
    const statMaxed = (statName: StatsEnum) => {
        switch (statName) {
            case StatsEnum.Move:
                return character.stats[StatsEnum.Move] >= 7;
            case StatsEnum.Fight:
                return character.stats[StatsEnum.Fight] >= 6;
            case StatsEnum.Shoot:
                return character.stats[StatsEnum.Shoot] >= 6;
            case StatsEnum.Will:
                return character.stats[StatsEnum.Will] >= 8;
            case StatsEnum.Health:
                return character.stats[StatsEnum.Health] >= 25;
            default:
                return true;
        }
    };
    const renderPowerChoice = (advance: LvlImprov) => <React.Fragment>
        <div className="modal-header">{LevelImprovements.LowerActivation}
            <div className="modal-sub-header">Choose {advance.amount} {advance.amount > 1 ? "different Powers" : "Power"} </div>
        </div>
        {character.powers?.map((power) =>
            <div
                style={{ fontWeight: "bold" }}
                className={isPowerSelected(power) ? "background-power-selection full-width selected" : selectedPowers.length >= advance.amount ? "background-power-selection full-width disabled" : "background-power-selection full-width"}
                onClick={() => {
                    if (selectedPowers.find((pwr) => pwr.name === power.name)) {
                        setSelectedPowers(selectedPowers.filter((pwr) => pwr.name !== power.name));
                    } else {
                        if (selectedPowers.length >= advance.amount) {
                            return;
                        }
                        setSelectedPowers([...selectedPowers, { ...power, activation: power.activation - 1 }]);
                    }
                }}
                key={`add_dialog_x_stat_${power.name}`}
            >
                <div>{power.name} ({isPowerSelected(power) ? power.activation - 1 : power.activation})</div>
                <div
                    style={{ fontSize: "0.8rem", fontWeight: "normal" }}>
                    {isPowerSelected(power) ?
                        power.activation - 1 : power.activation} / {getPower(power.name).strain} / {Array.isArray(getPower(power.name).category) ? `${(getPower(power.name).category as string[]).join(", ")}` :
                            getPower(power.name).category}
                </div>
            </div>)}
    </React.Fragment>;
    const renderStatsChoice = (advance: LvlImprov) => <React.Fragment>
        <div className="modal-header">{LevelImprovements.ImproveStat}
            <div className="modal-sub-header">Only stats that are not maxed can be selected</div>
        </div>
        {[StatsEnum.Move, StatsEnum.Fight, StatsEnum.Shoot, StatsEnum.Will, StatsEnum.Health].map((statName) =>
            !statMaxed(statName) ?
                <div
                    onClick={() => {
                        if (isStatSelected(statName)) {
                            setSelections(selections.filter((stat) => stat[statName] === undefined));
                        } else {
                            if (selections.length >= advance.amount) {
                                return;
                            }
                            setSelections([...selections, { [statName]: character.stats[statName] + 1 }]);
                        }
                    }}
                    className={isStatSelected(statName) ? "background-stat-selection selected" : selections.length >= advance.amount || statMaxed(statName) ? "background-stat-selection disabled" : "background-stat-selection"}
                    key={`add_captain_dialog_opt_stat_${statName}`}>
                    {statName} ({isStatSelected(statName) ? character.stats[statName] + 1 : character.stats[statName]})
            </div> : undefined)}
    </React.Fragment>;
    const renderNewPowerChoice = (_advance: LvlImprov) => <React.Fragment>
        <SelectNewPowers currentPowers={character.powers} background={character.background as BackgroundEnum} updatePowers={setNewPower} />
    </React.Fragment>;

    const renderLevelImprovements = (advance: LvlImprov, renderNodes: JSX.Element[]) => {
        switch (advance.LevelImprovement) {
            case LevelImprovements.LowerActivation:
                renderNodes.push(renderPowerChoice(advance));
                break;
            case LevelImprovements.ImproveStat:
                renderNodes.push(renderStatsChoice(advance));
                break;
            case LevelImprovements.NewPower:
                renderNodes.push(renderNewPowerChoice(advance));
                break;
            case LevelImprovements.NewPowerOrImproveStat:
                if (pageState.choice) {
                    renderLevelImprovements({ LevelImprovement: pageState.choice, amount: 1 }, renderNodes);
                }
        }
    };
    const improvedPowers = () => (newPower ? [...character.powers as Power[], newPower] : character.powers as Power[]).map((power) => selectedPowers.find((pwr) => power.name === pwr.name) || power);
    const renderAdvances = () => {
        const renderNodes: JSX.Element[] = [];
        const advances: LvlImprov[] = actualAdvances();
        for (const advance of advances) {
            renderLevelImprovements(advance, renderNodes);
        }
        return <Carousel
            splitSize={1}
            inputDivs={renderNodes}
        />;
    };

    return <React.Fragment>
        <div className="chapter-header">{character.name}</div>
        {renderAdvances()}
        <button
            onClick={() => {
                dispatch({
                    type: isCaptainCharacter ? SET_CAPTAIN : SET_FIRST_MATE,
                    payload: { ...character, level: character.level + levelsGained, powers: improvedPowers(), stats: improvedStats() },
                });
                if (isCaptainCharacter && pageState.firstMateLevels) {
                    history.push("/LevelUpFirstMate", pageState);
                } else {
                    history.push("/LootDeclaration");
                }
            }}
            className={allDoneFn() ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
        >Confirm</button>
        <CustomBackButtonComponent dispatchFunction={() => isCaptainCharacter ? dispatch({ type: REWIND_XP }) : undefined} />
    </React.Fragment>;
};
