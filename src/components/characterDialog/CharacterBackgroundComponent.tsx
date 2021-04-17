import React, { useEffect, useState } from "react";
import * as Backgrounds from "../../data/Backgrounds.json";
import { getBackgroundImage } from "../../images/index";
import { BackgroundEnum, BackgroundModifications, BackgroundOptions } from "../../types/Background";
import { Character } from "../../types/Characters";
import { isCaptain } from "../../Utils";
import { BackgroundPowerOverviewComponent } from "./BackgroundPowerOverviewComponent";
import { BackgroundPowersComponent } from "./BackgroundPowersComponent";
import { BackgroundStatsComponent } from "./BackgroundStatsComponent";

const backgroundInformation = Backgrounds.backgrounds as BackgroundOptions[];
const getBackgroundInfos = (background: BackgroundEnum) => backgroundInformation.find((bg) => bg.name === background) as BackgroundOptions;

export const CharacterBackground = ({ character, updateBackground }: { character: Character; updateBackground(value: React.SetStateAction<BackgroundModifications | undefined>): void }) => {
    const [background, setBackground] = useState<BackgroundModifications | undefined>();
    const [hideStatsComponent, setHideStatsComponent] = useState<boolean>(false);
    const [hidePowerComponent, setHidePowerComponent] = useState<boolean>(false);

    useEffect(() => {
        updateBackground(background);
    }, [background]);

    const mergeStats = (bg: BackgroundModifications) => {
        const mand = Object.entries(bg.statModifications.mandatory);
        const opt = Object.entries(bg.statModifications.optional);
        const mergedMap = [...mand, ...opt].reduce((acc, [key, value]) => acc.set(key, (acc.get(key) || 0) + (value || 0)), new Map<string, number | undefined>());
        const divs: JSX.Element[] = [];
        for (const [key, value] of mergedMap) {
            divs.push(<div className="stats-overview-text">{`+${value} ${key}`}</div>);
        }
        return divs;
    };
    const backgroundSelection = () => <div className="add-character-background-container">
        {Object.keys(BackgroundEnum).filter((bg) => (background && hideStatsComponent) ? bg === background?.name : true).map((backgroundEnumEntry: string) =>
            <div
                key={`add-character-${backgroundEnumEntry}`}
                className={backgroundEnumEntry === background?.name ? "add-character-background background-selected" : "add-character-background"}
                onClick={() => {
                    if (backgroundEnumEntry === background?.name) {
                        setBackground(undefined);
                    } else {
                        setBackground({
                            name: backgroundEnumEntry as BackgroundEnum,
                            statModifications: { mandatory: getBackgroundInfos(backgroundEnumEntry as BackgroundEnum).statModifications.mandatory, optional: {} },
                            powers: [],
                        });
                        setHideStatsComponent(false);
                    }
                }}>
                <img className="add-character-background-icons" src={getBackgroundImage(backgroundEnumEntry)} />
                <div className="add-character-background-text">{`${backgroundEnumEntry}`}</div>
            </div>
        )}
        {background && hideStatsComponent ?
            <div
                key={"add-character-stats-overview"}
                className={"add-character-background background-selected"}
                onClick={() => setHideStatsComponent(false)}>
                <div className="stats-overview-header">Selected Stats</div>
                {mergeStats(background)}
            </div>
            : null}
    </div>;

    return <React.Fragment>
        {!background ? <div className="modal-header">{`Select a background for your ${isCaptain(character.type) ? "Captain" : "First Mate"}`}</div> : null}
        {backgroundSelection()}
        {background && !hideStatsComponent ? <BackgroundStatsComponent background={background} updateBackgroundCallback={setBackground} hideComponent={setHideStatsComponent} /> : null}
        {background && hideStatsComponent && !hidePowerComponent ? <BackgroundPowersComponent background={background} isCaptain={isCaptain(character.type)} updateBackgroundCallback={setBackground} hideComponent={setHidePowerComponent} /> : null}
        {background && hideStatsComponent && hidePowerComponent ? <BackgroundPowerOverviewComponent background={background} character={character} updateBackgroundCallback={setBackground} /> : null}
        {/* <button
            onClick={() => background && character.name ? updateBackground(background) : undefined}
            className={background && character.name ? "power-btn" : "power-btn disabled"}
        >Continue</button> */}
    </React.Fragment>;
};
