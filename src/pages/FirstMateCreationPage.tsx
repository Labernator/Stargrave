import { CharacterCreation } from "../components/CreateCharacter";
import * as Characters from "../data/Characters.json";
import { CharacterMetadata } from "../types/Metadata";

export const FirstMateCreationPage = () => {
    const baseFirstMate = Characters.FirstMate as CharacterMetadata;
    return <CharacterCreation baseCharacter={{ ...baseFirstMate, name: "" }} />;
};
