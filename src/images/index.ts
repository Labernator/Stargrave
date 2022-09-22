import { BackgroundEnum, ShipUpgrade, SoldierEnum } from "../types";
import AdvancedTech1Png from "./AdvTech1.png";
import AdvancedTech2Png from "./AdvTech2.png";
import AdvancedWeaponsPng from "./AdvWeapons.png";
import AlienArtefactsPng from "./Alien.png";
import AristocratPng from "./Aristocrat.png";
import BiomorphPng from "./Biomorph.png";
import CargoBayPng from "./CargoBay.png";
import CreateCrewPng from "./CreateCrew.png";
import CyborgPng from "./Cyborg.png";
import HunterPng from "./Hunter.png";
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
import InformationPng from "./Information.png";
import MaintenancePng from "./Maintenance.png";
import MysticPng from "./Mystic.png";
import PostGamePng from "./PostGame.png";
import PsionicistPng from "./Psionicist.png";
import QuickReferenceSheet1Png from "./resources/Stargrave_Reference-1.png";
import QuickReferenceSheet2Png from "./resources/Stargrave_Reference-2.png";
import RoboticsExpertPng from "./RoboticsExpert.png";
import RoguePng from "./Rogue.png";
import SecretPng from "./Secret.png";
import ShipUpgradesPng from "./ShipUpgrades.png";
import ShoppingPng from "./Shopping.png";
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
import TradeGoodsPng from "./TradeGoods.png";
import TransactionLogPng from "./TransactionLog.png";
import UnknownPng from "./Unknown.png";
import AdvancedMedicalSuitePng from "./upgrades/AdvancedMedicalSuite.png";
import ArmamentWorkshopPng from "./upgrades/ArmamentWorkshop.png";
import CommunicationsArrayPng from "./upgrades/CommunicationsArray.png";
import ExternalCargoPodsPng from "./upgrades/ExternalCargoPods.png";
import ExtraQuartersPng from "./upgrades/ExtraQuarters.png";
import MeditationChamberPng from "./upgrades/MeditationChamber.png";
import RoboticsWorkshopPng from "./upgrades/RoboticsWorkshop.png";
import WeaponsLockerPng from "./upgrades/WeaponsLocker.png";
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
export const AristocratIcon = AristocratPng;
export const HunterIcon = HunterPng;

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

export const AdvancedTech1Icon = AdvancedTech1Png;
export const AdvancedTech2Icon = AdvancedTech2Png;
export const AlienArtefactsIcon = AlienArtefactsPng;
export const AdvancedWeaponsIcon = AdvancedWeaponsPng;

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
        case BackgroundEnum.Hunter: return HunterIcon;
        case BackgroundEnum.Aristocrat: return AristocratIcon;
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
export const InformationIcon = InformationPng;
export const TradeGoodsIcon = TradeGoodsPng;
export const SecretIcon = SecretPng;
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
export const ShipUpgradesIcon = ShipUpgradesPng;
export const CargoBayIcon = CargoBayPng;
export const ShoppingIcon = ShoppingPng;
export const TransactionLogIcon = TransactionLogPng;
export const MaintenanceIcon = MaintenancePng;

export const MeditationChamberIcon = MeditationChamberPng;
export const ExternalCargoPodsIcon = ExternalCargoPodsPng;
export const WeaponsLockerIcon = WeaponsLockerPng;
export const RoboticsWorkshopIcon = RoboticsWorkshopPng;
export const ExtraQuartersIcon = ExtraQuartersPng;
export const CommunicationsArrayIcon = CommunicationsArrayPng;
export const ArmamentWorkshopIcon = ArmamentWorkshopPng;
export const AdvancedMedicalSuiteIcon = AdvancedMedicalSuitePng;

export const getUpgradeImage = (upgrade: ShipUpgrade) => {
    switch (upgrade.name) {
        case "Armament Workshop": return ArmamentWorkshopIcon;
        case "Advanced Medical Suite": return AdvancedMedicalSuiteIcon;
        case "Communications Array": return CommunicationsArrayIcon;
        case "External Cargo Pods": return ExternalCargoPodsIcon;
        case "Extra Quarters": return ExtraQuartersIcon;
        case "Meditation Chamber": return MeditationChamberIcon;
        case "Robotics Workshop": return RoboticsWorkshopIcon;
        case "Weapon Locker": return WeaponsLockerIcon;
        default:
            return UnknownPng;
    }
};
