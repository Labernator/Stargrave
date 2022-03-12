import { BackgroundEnum, SoldierEnum } from "../types";
import BiomorphPng from "./Biomorph.png";
import CreateCrewPng from "./CreateCrew.png";
import CyborgPng from "./Cyborg.png";
import AddPng from "./icons/Add.png";
import CaptainPng from "./icons/Captain.png";
import CreditsPng from "./icons/Credits.png";
import CrewPng from "./icons/Crew.png";
import DeletePng from "./icons/Delete.png";
import ExitPng from "./icons/Exit.png";
import InfoPng from "./icons/Info.png";
import LeavePng from "./icons/Leave.png";
import MinusPng from "./icons/Minus.png";
import SavePng from "./icons/Save.png";
import PdfPng from "./icons/SavePdf.png";
import TreasuryPng from "./icons/Treasury.png";
import ImportCrewPng from "./ImportCrew.png";
import MysticPng from "./Mystic.png";
import PostGamePng from "./PostGame.png";
import PsionicistPng from "./Psionicist.png";
import QuickReferenceSheet1Png from "./resources/Stargrave_Reference-1.png";
import QuickReferenceSheet2Png from "./resources/Stargrave_Reference-2.png";
import RoboticsExpertPng from "./RoboticsExpert.png";
import RoguePng from "./Rogue.png";
import ArmouredTrooperPng from "./soldiers/ArmouredTrooper.png";
import BurnerPng from "./soldiers/Burner.png";
import CasecrackerPng from "./soldiers/Casecracker.png";
import ChiselerPng from "./soldiers/Chiseler.png";
import CodebreakerPng from "./soldiers/Codebreaker.png";
import CommandoPng from "./soldiers/Commando.png";
import GrenadierPng from "./soldiers/Grenadier.png";
import GuardDogPng from "./soldiers/GuardDog.png";
import GunnerPng from "./soldiers/Gunner.png";
import HackerPng from "./soldiers/Hacker.png";
import MedicPng from "./soldiers/Medic.png";
import PathfinderPng from "./soldiers/Pathfinder.png";
import RecruitPng from "./soldiers/Recruit.png";
import RunnerPng from "./soldiers/Runner.png";
import SentryPng from "./soldiers/Sentry.png";
import SniperPng from "./soldiers/Sniper.png";
import TrooperPng from "./soldiers/Trooper.png";
import StarshipPng from "./Starship.png";
import TekkerPng from "./Tekker.png";
import UnknownPng from "./Unknown.png";
import UseSamplePng from "./UseSample.png";
import VeteranPng from "./Veteran.png";

export const QuickReferenceSheet1 = QuickReferenceSheet1Png;
export const QuickReferenceSheet2 = QuickReferenceSheet2Png;
export const CyborgIcon = CyborgPng;
export const BiomorphIcon = BiomorphPng;
export const MysticIcon = MysticPng;
export const PsionicistIcon = PsionicistPng;
export const RoboticsExpertIcon = RoboticsExpertPng;
export const RogueIcon = RoguePng;
export const StarshipIcon = StarshipPng;
export const TekkerIcon = TekkerPng;
export const VeteranIcon = VeteranPng;

export const BurnerIcon = BurnerPng;
export const GrenadierIcon = GrenadierPng;
export const SniperIcon = SniperPng;
export const CodebreakerIcon = CodebreakerPng;
export const GuardDogIcon = GuardDogPng;
export const CasecrackerIcon = CasecrackerPng;
export const GunnerIcon = GunnerPng;
export const MedicIcon = MedicPng;
export const PathfinderIcon = PathfinderPng;
export const ArmouredTrooperIcon = ArmouredTrooperPng;
export const RecruitIcon = RecruitPng;
export const RunnerIcon = RunnerPng;
export const SentryIcon = SentryPng;
export const TrooperIcon = TrooperPng;
export const HackerIcon = HackerPng;
export const ChiselerIcon = ChiselerPng;
export const CommandoIcon = CommandoPng;

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

export const getSoldierImage = (soldierType: string) => {
    switch (soldierType) {
        case SoldierEnum.Burner: return BurnerIcon;
        case SoldierEnum.Grenadier: return GrenadierIcon;
        case SoldierEnum.Sniper: return SniperIcon;
        case SoldierEnum.Casecracker: return CasecrackerIcon;
        case SoldierEnum.Codebreaker: return CodebreakerIcon;
        case SoldierEnum.GuardDog: return GuardDogIcon;
        case SoldierEnum.Gunner: return GunnerIcon;
        case SoldierEnum.Medic: return MedicIcon;
        case SoldierEnum.Pathfinder: return PathfinderIcon;
        case SoldierEnum.ArmouredTrooper: return ArmouredTrooperIcon;
        case SoldierEnum.Recruit: return RecruitIcon;
        case SoldierEnum.Runner: return RunnerIcon;
        case SoldierEnum.Sentry: return SentryIcon;
        case SoldierEnum.Trooper: return TrooperIcon;
        case SoldierEnum.Hacker: return HackerIcon;
        case SoldierEnum.Chiseler: return ChiselerIcon;
        case SoldierEnum.Commando: return CommandoIcon;
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
export const LeaveIcon = LeavePng;
export const AddIcon = AddPng;
export const SaveIcon = SavePng;
export const ExitIcon = ExitPng;
export const InfoIcon = InfoPng;
export const MinusIcon = MinusPng;
export const PdfIcon = PdfPng;
export const DeleteItemIcon = DeletePng;
export const PostGameIcon = PostGamePng;
