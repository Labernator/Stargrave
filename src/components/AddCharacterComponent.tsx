import { useHistory } from "react-router-dom";
import { AddIcon } from "../images";

export const AddCharacterComponent = ({ isCaptain }: { isCaptain: boolean }) => {
    const history = useHistory();
    return <div
        key={`${isCaptain ? "captain" : "firstmate"}_tile`}
        className="add-character-tile"
        onClick={() => {
            history.push("/CharacterCreation", { isCaptain });
        }}>
        <img className="background-image add-image" src={AddIcon} alt="addIcon" />
        <div className="background-title add-title">{`Click here to add a ${isCaptain ? "Captain" : "First Mate"} to your crew`}</div>
    </div>;
};
