import React, { useContext, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CustomBackButtonComponent } from "../../components/common/CustomBackButton";
import { CharacterStatsHeader } from "../../components/statusbar/CharacterStatsHeader";
import { SET_CAPTAINS_POWERS, SET_CAPTAINS_STATS, SET_FIRSTMATE_POWERS, SET_FIRSTMATE_STATS } from "../../redux/actions";
import { BackgroundEnum, CharactersEnum, CrewState, Power } from "../../types";
import { getBackgroundInfos, getBaseCaptain, getBaseFirstMate, getPowerInfos } from "../../Utils";

export const CharacterPowerSelectionPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const history = useHistory();
    const dispatch = useDispatch();
    const characterType = history.location.state as CharactersEnum;
    const character = characterType === CharactersEnum.Captain ? state.Captain : state.FirstMate;
    const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
    const [previewPower, setPreviewPower] = useState<Power>();
    const isPowerSelected = (power: Power) => !!selectedPowers.find((pwr) => pwr.name === power.name);
    const minPowersSelected = () => selectedPowers.length >= (characterType === CharactersEnum.Captain ? 3 : 2);
    const maxPowersSelected = () => selectedPowers.length >= (characterType === CharactersEnum.Captain ? 4 : 3);
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
                    {`Choose ${characterType === CharactersEnum.Captain ? "3 - 4" : "2 - 3"} core Powers`}
                    <div className="modal-sub-header">{"Click the info icon in the top right corner of a power to view its details"}</div>
                </div>
                {getPowerInfos(getBackgroundInfos(character.background as BackgroundEnum).corePowers).map((power) => <div style={{ display: "inline-block", width: "100%" }}>
                    <div
                        onClick={() => {
                            if (isPowerSelected(power)) {
                                const idx = selectedPowers.findIndex((pwr) => pwr.name === power.name);
                                if (idx !== -1) {
                                    setSelectedPowers([...selectedPowers.slice(0, idx), ...selectedPowers.slice(idx + 1, selectedPowers.length)]);
                                }
                            } else {
                                if (maxPowersSelected()) {
                                    return;
                                }
                                setSelectedPowers([...selectedPowers, { ...power, activation: power.activation + (characterType === CharactersEnum.Captain ? 0 : 2) }]);
                            }
                        }}
                        className={isPowerSelected(power) ? "power-selection selected" : maxPowersSelected() ? "power-selection disabled" : "power-selection"}
                        key={`add_dialog_x_stat_${power.name}`}>

                        <div key="power-info-corner" className={isPowerSelected(power) ? "info-corner inverted" : "info-corner "} />
                        <div key="power-info-corner-text" className="info-corner-text">i</div>
                        <div key="power-name">{power.name}</div>
                        <div key="power-details" style={{ fontSize: "0.8rem" }}>
                            {power.activation + (characterType === CharactersEnum.Captain ? 0 : 2)} / {power.strain} / {Array.isArray(power.category) ? `${power.category.join(", ")}` : power.category}
                        </div>
                    </div>
                    <div className="info-click-area"
                        onClick={(event) => {
                            setPreviewPower(characterType === CharactersEnum.Captain ? power : { ...power, activation: power.activation + 2 });
                            event.preventDefault();
                            event.stopPropagation();
                        }} />
                </div>
                )}
                <button
                    onClick={() => {
                        if (minPowersSelected()) {
                            dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_POWERS : SET_FIRSTMATE_POWERS, payload: selectedPowers.sort((a, b) => (a.name.localeCompare(b.name))) });
                            history.push("/CharacterNonCorePowerSelection", characterType);
                        }
                    }}
                    className={minPowersSelected() ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
                >Confirm</button>
                <CustomBackButtonComponent
                    dispatchFunction={() => characterType === CharactersEnum.Captain ? dispatch({ type: SET_CAPTAINS_STATS, payload: getBaseCaptain().stats }) : dispatch({ type: SET_FIRSTMATE_STATS, payload: getBaseFirstMate().stats })}
                />
            </React.Fragment>}
    </React.Fragment>;
};
