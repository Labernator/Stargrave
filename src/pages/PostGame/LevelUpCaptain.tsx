import { useHistory } from "react-router-dom";
import { LevelUpState } from "../../types";
import { LevelUpCharacterPage } from "./LevelUpPage";
export const LevelUpCaptainPage = () => {
    const history = useHistory();
    return <LevelUpCharacterPage isCaptainCharacter={true} pageState={history.location.state as LevelUpState} />;
};
