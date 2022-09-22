import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CharacterStatsHeader } from "../../components/statusbar/CharacterStatsHeader";
import { getBackgroundImage } from "../../images/index";
import { SET_CAPTAINS_BACKGROUND, SET_CAPTAINS_NAME, SET_FIRSTMATE_BACKGROUND, SET_FIRSTMATE_NAME } from "../../redux/actions";
import { BackgroundEnum, CharactersEnum } from "../../types";

export const CharacterBackgroundPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const characterType = history.location.state as CharactersEnum;
    const BackgroundTile = ({ bg }: { bg: BackgroundEnum }) => <div
        key={`add-character-${bg}`}
        className="add-character-tile"
        onClick={() => {
            dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_BACKGROUND : SET_FIRSTMATE_BACKGROUND, payload: bg });
            history.push("/CharacterStatsSelection", characterType);
        }}>
        <img style={{ width: "3.5rem" }} src={getBackgroundImage(bg)} alt={`add-character-${bg}-icon`} />
        <div>{`${bg === BackgroundEnum.RoboticsExpert ? "Robotics Expert" : bg}`}</div>
    </div>;

    return <React.Fragment>
        <CharacterStatsHeader characterType={characterType} />
        <div className="modal-header">{`Select a background for your ${characterType === CharactersEnum.Captain ? CharactersEnum.Captain : "First Mate"}`}</div>
        <div className="background-flex-container">
            {Object.keys(BackgroundEnum).map((backgroundEnumEntry: string) => <BackgroundTile bg={(backgroundEnumEntry as BackgroundEnum)} />)}
            <button
                onClick={() => {
                    dispatch({ type: characterType === CharactersEnum.Captain ? SET_CAPTAINS_NAME : SET_FIRSTMATE_NAME, payload: "" });
                    history.goBack();
                }}
                className={"page-btn"}
            >Back</button>
        </div>

    </React.Fragment>;
};
