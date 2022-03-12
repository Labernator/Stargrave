import React, { useContext, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CustomBackButtonComponent } from "../../components/common/CustomBackButton";
import { CharacterStatsHeader } from "../../components/statusbar/CharacterStatsHeader";
import { SET_CAPTAINS_BACKGROUND, SET_CAPTAINS_STATS, SET_FIRSTMATE_BACKGROUND, SET_FIRSTMATE_STATS } from "../../redux/actions";
import { BackgroundEnum, CharactersEnum, CrewState, Stats, StatsEnum } from "../../types";
import { getBackgroundInfos } from "../../Utils";

export const CharacterStatsSelectionPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const history = useHistory();
    const dispatch = useDispatch();
    const characterType = history.location.state as CharactersEnum;
    const character = characterType === CharactersEnum.Captain ? state.Captain : state.FirstMate;
    const background = getBackgroundInfos(character.background as BackgroundEnum);
    const [selections, setSelections] = useState<Partial<Stats>>({});
    const isStatSelected = (statName: string) => selections[statName as StatsEnum] !== undefined;
    const statModificationsForBackground = getBackgroundInfos(background.name).statModifications;
    const maxStatsReached = () => Object.keys(selections).length === statModificationsForBackground.chooseOptionals;
    const calcPayload = () => {
        let stats = character.stats;
        stats = Object.entries(selections).reduce((newStats, [key, value]) => ({ ...newStats, [key]: value ? newStats[key as StatsEnum] + value : newStats[key as StatsEnum] }), stats);
        return Object.entries(statModificationsForBackground.mandatory).reduce((newStats, [key, value]) => ({ ...newStats, [key]: value ? newStats[key as StatsEnum] + value : newStats[key as StatsEnum] }), stats);
    };
    return <React.Fragment>
        <CharacterStatsHeader characterType={characterType} />
        <div style={{ marginTop: "0.5rem" }} className="modal-header">Granted Stats Improvements</div>
        {Object.entries(statModificationsForBackground.mandatory).map(([statName, statValue]) =>
            <div className="background-stat-selection selected" key={`add_captain_dialog_mand_stat_${statName}`}>+{statValue} {statName}</div>
        )}
        <div className="modal-header">{`Optional Stats Improvements \n (choose ${statModificationsForBackground.chooseOptionals} of the following)`}</div>
        {Object.entries(statModificationsForBackground.optional).map(([statName, statValue]) =>
            <div
                onClick={() => {
                    if (isStatSelected(statName)) {
                        const { [statName as StatsEnum]: exclProp, ...rest } = selections;
                        setSelections(rest);
                    } else {
                        if (maxStatsReached()) {
                            return;
                        }
                        setSelections({ ...selections, [statName]: statValue });
                    }
                }}
                className={isStatSelected(statName) ? "background-stat-selection selected" : maxStatsReached() ? "background-stat-selection disabled" : "background-stat-selection"}
                key={`add_captain_dialog_opt_stat_${statName}`}>
                +{statValue} {statName}
            </div>
        )}
        <button
            onClick={() => {
                if (maxStatsReached()) {
                    dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_STATS : SET_FIRSTMATE_STATS, payload: calcPayload() });
                    history.push("/CharacterPowerSelection", characterType);
                }
            }}
            className={maxStatsReached() ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
        >Confirm</button>
        <CustomBackButtonComponent dispatchFunction={() => dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_BACKGROUND : SET_FIRSTMATE_BACKGROUND, payload: undefined })} />
    </React.Fragment>;
};
