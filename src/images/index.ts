import { BackgroundEnum } from "../types/Background";
import BiomorphPng from "./Biomorph.png";
import CreateCrewPng from "./CreateCrew.png";
import CyborgPng from "./Cyborg.png";
import AddPng from "./icons/Add.png";
import CaptainPng from "./icons/Captain.png";
import CreditsPng from "./icons/Credits.png";
import CrewPng from "./icons/Crew.png";
import DeletePng from "./icons/Delete.png";
import SavePng from "./icons/Save.png";
import TreasuryPng from "./icons/Treasury.png";
import ImportCrewPng from "./ImportCrew.png";
import MysticPng from "./Mystic.png";
import PsionicistPng from "./Psionicist.png";
import RoboticsExpertPng from "./RoboticsExpert.png";
import RoguePng from "./Rogue.png";
import TekkerPng from "./Tekker.png";
import UnknownPng from "./Unknown.png";
import UseSamplePng from "./UseSample.png";
import VeteranPng from "./Veteran.png";

export const CyborgIcon = CyborgPng;
export const BiomorphIcon = BiomorphPng;
export const MysticIcon = MysticPng;
export const PsionicistIcon = PsionicistPng;
export const RoboticsExpertIcon = RoboticsExpertPng;
export const RogueIcon = RoguePng;
export const TekkerIcon = TekkerPng;
export const VeteranIcon = VeteranPng;

export const getBackgroundImage = (background: string | undefined) => {
    switch (background) {
        case BackgroundEnum.Biomorph: return BiomorphIcon;
        case BackgroundEnum.Cyborg: return CyborgIcon;
        case BackgroundEnum.Mystic: return MysticIcon;
        case BackgroundEnum.Psionicist: return PsionicistIcon;
        case BackgroundEnum.RoboticsExpert: return RoboticsExpertIcon;
        case BackgroundEnum.Rogue: return RogueIcon;
        case BackgroundEnum.Tekker: return TekkerIcon;
        case BackgroundEnum.Veteran: return VeteranIcon;
        default:
            return UnknownPng;
    }
};

export const CaptainIcon = CaptainPng;
export const UseSampleIcon = UseSamplePng;
export const CreateCrewIcon = CreateCrewPng;
export const ImportCrewIcon = ImportCrewPng;
export const CreditsIcon = CreditsPng;
export const TreasuryIcon = TreasuryPng;
export const CrewIcon = CrewPng;
export const AddIcon = AddPng;
export const SaveIcon = SavePng;

export const DeleteItemIcon = DeletePng;
