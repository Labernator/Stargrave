import React from "react";
import * as Backgrounds from "../../data/Backgrounds.json";
import { BackgroundEnum, BackgroundModifications, BackgroundOptions } from "../../types/Background";
import { Stats } from "../../types/Characters";
import { maxStatsSelected } from "../../Utils";

const backgroundInformation = Backgrounds.backgrounds as BackgroundOptions[];
const getBackgroundInfos = (background: BackgroundEnum) => backgroundInformation.find((bg) => bg.name === background) as BackgroundOptions;

export const BackgroundStatsComponent = (
    { background, updateBackgroundCallback, hideComponent }:
        { background: BackgroundModifications; updateBackgroundCallback(value: React.SetStateAction<BackgroundModifications | undefined>): void; hideComponent(visible: boolean): void }
) => {
    const isStatSelected = (statName: string) => !!(Object.keys(background.statModifications.optional).find((stat) => stat === statName));
    const infos = getBackgroundInfos(background.name);
    return <React.Fragment>
        <div className="dialog-sub-header">Granted Stats Improvements</div>
        <div className="section-div" >
            {Object.entries(infos.statModifications.mandatory).map(([statName, statValue]) =>
                <div className="background-stat-selection background-stat-selected" key={`add_captain_dialog_mand_stat_${statName}`}>+{statValue} {statName}</div>
            )}
        </div>
        <div className="dialog-sub-header">{`Optional Stats Improvements (choose ${infos.statModifications.chooseOptionals} of the following)`}</div>
        <div className="section-div" >
            {Object.entries(infos.statModifications.optional).map(([statName, statValue]) =>
                <div
                    onClick={() => {
                        if (isStatSelected(statName)) {
                            const partialStats: Partial<Stats> = {};
                            updateBackgroundCallback({
                                ...background,
                                statModifications: {
                                    ...background.statModifications,
                                    optional: Object.entries(background.statModifications.optional).reduce((acc, [key, value]) => statName !== key ? { ...acc, [key]: value } : acc, partialStats),
                                },
                            });
                        } else {
                            if (maxStatsSelected(background)) {
                                return;
                            }
                            updateBackgroundCallback({
                                ...background,
                                statModifications: {
                                    ...background.statModifications,
                                    optional: { ...background.statModifications.optional, [statName]: statValue },
                                },
                            });
                        }
                    }}
                    className={isStatSelected(statName) ? "background-stat-selection background-stat-selected" : maxStatsSelected(background) ? "background-stat-selection background-stat-disabled" : "background-stat-selection"}
                    key={`add_captain_dialog_opt_stat_${statName}`}>
                    +{statValue} {statName}
                </div>
            )}
        </div>
        <button
            onClick={() => maxStatsSelected(background) ? hideComponent(true) : undefined}
            className={maxStatsSelected(background) ? "power-btn" : "power-btn disabled"}
        >Continue</button>
    </React.Fragment>;
};
