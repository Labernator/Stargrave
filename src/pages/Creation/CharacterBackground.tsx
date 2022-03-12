import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CustomBackButtonComponent } from "../../components/common/CustomBackButton";
import { CharacterStatsHeader } from "../../components/statusbar/CharacterStatsHeader";
import { getBackgroundImage } from "../../images/index";
import { SET_CAPTAINS_BACKGROUND, SET_CAPTAINS_NAME, SET_FIRSTMATE_BACKGROUND, SET_FIRSTMATE_NAME } from "../../redux/actions";
import { BackgroundEnum, CharactersEnum } from "../../types";

export const CharacterBackgroundPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const characterType = history.location.state as CharactersEnum;
    const [background, setBackground] = useState<BackgroundEnum | undefined>();
    const renderBackgroundTile = (bg: BackgroundEnum) => <div
        key={`add-character-${bg}`}
        className={bg === background ? "add-character-background selected" : "add-character-background"}
        onClick={() => setBackground(
            bg === background ?
                undefined : bg
        )}>
        <img className="add-character-background-icons" src={getBackgroundImage(bg)} alt={`add-character-${bg}-icon`} />
        <div className="large-text">{`${bg}`}</div>
    </div>;

    return <React.Fragment>
        <CharacterStatsHeader characterType={characterType} />
        <div className="modal-header">{`Select a background for your ${characterType === CharactersEnum.Captain ? CharactersEnum.Captain : "First Mate"}`}</div>
        {Object.keys(BackgroundEnum).map((backgroundEnumEntry: string) => renderBackgroundTile(backgroundEnumEntry as BackgroundEnum))}
        <button
            onClick={() => {
                if (background) {
                    dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_BACKGROUND : SET_FIRSTMATE_BACKGROUND, payload: background });
                    history.push("/CharacterStatsSelection", characterType);
                }
            }}
            className={background ? "dialog-btn confirm-btn" : "dialog-btn confirm-btn disabled"}
        >Confirm</button>
        <CustomBackButtonComponent dispatchFunction={() => dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_NAME : SET_FIRSTMATE_NAME, payload: "" })} />
    </React.Fragment>;
};
