import { CharacterCreation } from "../components/CreateCharacter";
import * as Characters from "../data/Characters.json";
import { CharacterMetadata } from "../types";

export const CaptainCreationPage = () => {
    const baseCaptain = Characters.Captain as CharacterMetadata;
    return <CharacterCreation baseCharacter={{ ...baseCaptain, name: "" }} />;
};
