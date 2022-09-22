import React, { useContext, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CustomBackButtonComponent } from "../../components/common/CustomBackButton";
import { CharacterStatsHeader } from "../../components/statusbar/CharacterStatsHeader";
import { SET_CAPTAINS_POWERS, SET_FIRSTMATE_POWERS } from "../../redux/actions";
import { CharactersEnum, CrewState, ModifiedPower, Power } from "../../types";
import { getPower } from "../../Utils";

export const CharacterPowerImprovementsPage = () => {
    const { store } = useContext(ReactReduxContext);
    const state = store.getState() as CrewState;
    const history = useHistory();
    const dispatch = useDispatch();
    const characterType = history.location.state as CharactersEnum;
    const character = characterType === CharactersEnum.Captain ? state.Captain : state.FirstMate;
    const [selectedPowers, setSelectedPowers] = useState<ModifiedPower[]>([]);
    const [previewPower, setPreviewPower] = useState<Power | undefined>(undefined);
    const updatedArray = () => character.powers.filter((pwr) => !selectedPowers.find((x) => x.name === pwr.name)).concat(selectedPowers).sort((a, b) => (a.name.localeCompare(b.name)));
    const isPowerSelected = (power: ModifiedPower) => !!selectedPowers.find((pwr) => pwr.name === power.name);
    return <React.Fragment >
        {previewPower ?
            <React.Fragment >
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
            </React.Fragment > :
            <React.Fragment>
                <CharacterStatsHeader characterType={characterType} />
                <div className="modal-header">Select 2 of the following powers to lower their activation value by 1 each</div>
                {character.powers.map((power) => {
                    const actualPower = getPower(power.name);
                    return <div style={{ display: "inline-block", width: "100%" }}>
                        <div className={isPowerSelected(power) ? "background-power-selection full-width selected" : "background-power-selection full-width"}
                            onClick={() => {
                                if (selectedPowers.find((pwr) => pwr.name === power.name)) {
                                    setSelectedPowers(selectedPowers.filter((pwr) => pwr.name !== power.name));
                                } else {
                                    if (selectedPowers.length >= 2) {
                                        return;
                                    }
                                    setSelectedPowers([...selectedPowers, { ...power, activation: power.activation - 1 }]);
                                }
                            }}
                            key={`add_dialog_x_stat_${power.name}`}>
                            <div className={isPowerSelected(power) ? "info-corner inverted" : "info-corner "} />
                            <div className="info-corner-text">i</div>
                            <div>{power.name}</div>
                            <div style={{ fontSize: "0.8rem" }}>
                                {isPowerSelected(power) ? power.activation - 1 : power.activation} / {actualPower.strain} / {Array.isArray(actualPower.category) ? `${actualPower.category.join(", ")}` : actualPower.category}
                            </div>

                        </div>
                        <div className="info-click-area"
                            onClick={(event) => {
                                setPreviewPower(actualPower);
                                event.preventDefault();
                                event.stopPropagation();
                            }} />
                    </div>;
                })}
                <button
                    onClick={() => {
                        if (selectedPowers.length === 2) {
                            dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_POWERS : SET_FIRSTMATE_POWERS, payload: updatedArray() });
                            history.push("/CharacterSelectGear", characterType);
                        }
                    }}
                    className={selectedPowers.length === 2 ? "page-btn selected" : "page-btn disabled"}
                >Confirm</button>
                <CustomBackButtonComponent
                    dispatchFunction={() => dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_POWERS : SET_CAPTAINS_POWERS, payload: [] })}
                    customHistory={() => history.push("/CharacterPowerSelection", characterType)}
                />
            </React.Fragment >
        }

    </React.Fragment >;
};
