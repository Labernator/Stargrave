import React, { useContext, useEffect, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Carousel } from "../../components/common/Carousel";
import { CustomBackButtonComponent } from "../../components/common/CustomBackButton";
import { CharacterStatsHeader } from "../../components/statusbar/CharacterStatsHeader";
import { SET_CAPTAINS_POWERS, SET_FIRSTMATE_POWERS } from "../../redux/actions";
import { BackgroundEnum, CharactersEnum, CrewState, Power } from "../../types";
import { getNonCorePowers, isCorePower } from "../../Utils";

export const CharacterNonCorePowerSelectionPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const history = useHistory();
    const dispatch = useDispatch();
    const characterType = history.location.state as CharactersEnum;
    const character = characterType === CharactersEnum.Captain ? state.Captain : state.FirstMate;
    const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
    const [previewPower, setPreviewPower] = useState<Power | undefined>(undefined);
    const [lastPreviewPower, setLastPreviewPower] = useState<Power | undefined>(undefined);
    useEffect(() => {
        if (previewPower) {
            setLastPreviewPower(previewPower);
        }
    }, [previewPower]);
    const isPowerSelected = (power: Power) => !!selectedPowers.find((pwr) => pwr.name === power.name);
    const maxCorePowersSelected = () => {
        let powersRemaining2 = characterType === CharactersEnum.Captain ? 4 : 3;
        if (selectedPowers.filter((power) => !isCorePower(power.name, character.background as BackgroundEnum)).length === 2) {
            powersRemaining2 = characterType === CharactersEnum.Captain ? 3 : 2;
        }
        return selectedPowers.filter((power) => isCorePower(power.name, character.background as BackgroundEnum)).length >= powersRemaining2;
    };
    const powersRemaining = (characterType === CharactersEnum.Captain ? 5 : 4) - character.powers.length;

    return <React.Fragment>
        {previewPower ?
            <React.Fragment>
                <div className="modal-header">
                    {`View Details for Power "${previewPower.name}"`}
                    <div className="modal-sub-header">{"Click the back to return to the selection menu."}</div>
                </div>
                <div className="power-preview-section">
                    <div className="power-preview-name">{`${previewPower.name}`}</div>
                    <div className="power-preview-infos">
                        {`Activation: ${previewPower.activation}`} / {`Strain: ${previewPower.strain}`} / {Array.isArray(previewPower.category) ? `Categories: ${previewPower.category.join(", ")}` : `Category: ${previewPower.category}`}
                    </div>
                    <div className={previewPower.effect.length <= 200 ? "large-text" : previewPower.effect.length <= 400 ? "power-preview-medium-text" : "power-preview-small-text"}>{previewPower.effect}</div>
                </div>
                <button
                    onClick={(event) => {
                        setPreviewPower(undefined);
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                    className={"dialog-btn close-btn foreground"}
                >Close</button>
            </React.Fragment> :
            <React.Fragment>
                <CharacterStatsHeader characterType={characterType} />
                <div className="modal-header">
                    {`Choose ${powersRemaining} additional ${powersRemaining === 1 ? "Power" : "Powers"}`}
                    <div className="modal-sub-header">{"Swipe or use the page buttons to see more entries"}</div>
                </div>
                <Carousel
                    splitSize={8}
                    resetPage={lastPreviewPower ? Math.ceil(getNonCorePowers(character.background as BackgroundEnum, characterType === CharactersEnum.Captain).findIndex((pwr) => pwr.name === lastPreviewPower?.name) / 8) : 1}
                    inputDivs={getNonCorePowers(character.background as BackgroundEnum, characterType === CharactersEnum.Captain).map((power) =>
                        <div
                            onClick={() => {
                                if (isPowerSelected(power)) {
                                    const idx = selectedPowers.findIndex((pwr) => pwr.name === power.name);
                                    if (idx !== -1) {
                                        setSelectedPowers([...selectedPowers.slice(0, idx), ...selectedPowers.slice(idx + 1, selectedPowers.length)]);
                                    }
                                } else {
                                    if (maxCorePowersSelected()) {
                                        return;
                                    }
                                    setSelectedPowers([...selectedPowers, { ...power, activation: power.activation }]);
                                }
                            }}
                            className={isPowerSelected(power) ? "power-selection selected" : maxCorePowersSelected() ? "power-selection disabled" : "power-selection"}
                            key={`add_dialog_x_stat_${power.name}`}>

                            <div className={isPowerSelected(power) ? "info-corner inverted" : "info-corner"} />
                            <div className="info-corner-text">i</div>
                            <div>{power.name}</div>
                            <div style={{ fontSize: "0.8rem" }}>{power.activation} / {power.strain} / {Array.isArray(power.category) ? `${power.category.join(", ")}` : power.category}</div>
                            <div className="info-click-area-non-core"
                                onClick={(event) => {
                                    setPreviewPower(characterType === CharactersEnum.Captain ? power : { ...power, activation: power.activation + 2 });
                                    event.preventDefault();
                                    event.stopPropagation();
                                }} />
                        </div>

                    )}

                />
                <button
                    onClick={() => {
                        if (selectedPowers.length === powersRemaining) {
                            dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_POWERS : SET_FIRSTMATE_POWERS, payload: [...selectedPowers, ...character.powers].sort((a, b) => (a.name.localeCompare(b.name))) });
                            history.push(characterType === CharactersEnum.Captain ? "/CharacterImprovePowers" : "/CharacterSelectGear", characterType);
                        }
                    }}
                    className={selectedPowers.length === powersRemaining ? "page-btn selected" : "page-btn disabled"}
                >Confirm</button>
                <CustomBackButtonComponent dispatchFunction={() => dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_POWERS : SET_FIRSTMATE_POWERS, payload: [] })} />
            </React.Fragment>}
    </React.Fragment>;
};
