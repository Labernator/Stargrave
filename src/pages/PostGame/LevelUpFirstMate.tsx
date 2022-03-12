import { useHistory } from "react-router-dom";
import { LevelUpState } from "../../types";
import { LevelUpCharacterPage } from "./LevelUpPage";
export const LevelUpFirstMatePage = () => {
    const history = useHistory();
    return <LevelUpCharacterPage isCaptainCharacter={false} pageState={history.location.state as LevelUpState} />;
};
