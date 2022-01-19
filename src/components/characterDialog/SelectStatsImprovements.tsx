import React, { useEffect, useState } from "react";
import * as Backgrounds from "../../data/Backgrounds.json";
import { BackgroundEnum, BackgroundModifications, BackgroundOptions, Stats, StatsEnum } from "../../types";

const backgroundInformation = Backgrounds.backgrounds as BackgroundOptions[];
const getBackgroundInfos = (background: BackgroundEnum) => backgroundInformation.find((bg) => bg.name === background) as BackgroundOptions;

export const SelectStatsImprovements = ({ background, updateStatsCallback, updateAndContinue }: { background: BackgroundModifications; updateStatsCallback(value: React.SetStateAction<Partial<Stats>>): void; updateAndContinue(): void }) => {
    const [selections, setSelections] = useState<Array<Partial<Stats>>>([]);
    useEffect(() => {
        const mand = background.statModifications.mandatory;
        const parts: Partial<Stats> = {};
        const merged: Partial<Stats> = Object.assign(parts, ...selections);
        updateStatsCallback(Object.fromEntries([...Object.entries(mand), ...Object.entries(merged)].reduce((acc, [key, value]) => acc.set(key, (acc.get(key) || 0) + (value || 0)), new Map<string, number | undefined>())));
    }, [selections]);
    const isStatSelected = (statName: string) => selections.find((stat) => stat[statName as StatsEnum] !== undefined);
    const statModificationsForBackground = getBackgroundInfos(background.name).statModifications;
    const maxStatsReached = () => selections.length === statModificationsForBackground.chooseOptionals;
    return <React.Fragment>
        <div style={{ marginTop: "0.5rem" }} className="modal-header">Granted Stats Improvements</div>
        {Object.entries(statModificationsForBackground.mandatory).map(([statName, statValue]) =>
            <div className="background-stat-selection selected" key={`add_captain_dialog_mand_stat_${statName}`}>+{statValue} {statName}</div>
        )}
        <div className="modal-header">{`Optional Stats Improvements \n (choose ${statModificationsForBackground.chooseOptionals} of the following)`}</div>
        {Object.entries(statModificationsForBackground.optional).map(([statName, statValue]) =>
            <div
                onClick={() => {
                    if (isStatSelected(statName)) {
                        setSelections(selections.filter((stat) => stat[statName as StatsEnum] === undefined));
                    } else {
                        if (maxStatsReached()) {
                            return;
                        }
                        setSelections([...selections, { [statName]: statValue }]);
                    }
                }}
                className={isStatSelected(statName) ? "background-stat-selection selected" : maxStatsReached() ? "background-stat-selection disabled" : "background-stat-selection"}
                key={`add_captain_dialog_opt_stat_${statName}`}>
                +{statValue} {statName}
            </div>
        )}
        <button
            onClick={() => maxStatsReached() ? updateAndContinue() : undefined}
            className={maxStatsReached() ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
        >Confirm</button>
    </React.Fragment>;
};
