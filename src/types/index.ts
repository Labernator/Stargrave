export enum BackgroundEnum {
    Biomorph = "Biomorph",
    Cyborg = "Cyborg",
    Mystic = "Mystic",
    Psionicist = "Psionicist",
    RoboticsExpert = "RoboticsExpert",
    Rogue = "Rogue",
    Tekker = "Tekker",
    Veteran = "Veteran",
    Aristocrat = "Aristocrat",
    Hunter = "Hunter",
}

export enum PowerCategory {
    LineOfSight = "Line of Sight",
    Touch = "Touch",
    SelfOnly = "Self-only",
    OutOfGameA = "Out of Game (A)",
    OutOfGameB = "Out of Game (B)",
}
export enum StatsEnum {
    Move = "Move",
    Fight = "Fight",
    Shoot = "Shoot",
    Armour = "Armour",
    Will = "Will",
    Health = "Health",
}

export enum CharactersEnum {
    Captain = "Captain",
    FirstMate = "FirstMate",
}

export enum SoldierEnum {
    Burner = "Burner",
    Grenadier = "Grenadier",
    Sniper = "Sniper",
    GuardDog = "Guard Dog",
    Casecracker = "Casecracker",
    Gunner = "Gunner",
    Codebreaker = "Codebreaker",
    Medic = "Medic",
    Pathfinder = "Pathfinder",
    ArmouredTrooper = "Armoured Trooper",
    Recruit = "Recruit",
    Runner = "Runner",
    Commando = "Commando",
    Trooper = "Trooper",
    Hacker = "Hacker",
    Chiseler = "Chiseler",
    Sentry = "Sentry",
}

export enum SoldierGroups {
    Standard = "Standard",
    Specialist = "Specialist",
}
export interface Background {
    name: string;
    powers: Power[];
}

export type Stats = { [key in StatsEnum]: number; };
export type StatStrings = { [key in StatsEnum]: string; };
export interface BackgroundMetadata {
    name: string;
    statModifications: {
        mandatory: Partial<Stats>;
        optional: Partial<Stats>;
        chooseOptionals: number;
    };
    corePowers: string[];
    description: string;
}

export interface BackgroundModifications {
    name: BackgroundEnum;
    statModifications: StatsImprovements;
    powers: Power[];
}

export interface BackgroundOptions {
    name: BackgroundEnum;
    statModifications: {
        mandatory: Partial<Stats>;
        optional: Partial<Stats>;
        chooseOptionals: number;
    };
    corePowers: string[];
    description: string;
}

export interface StatsImprovements {
    mandatory: Partial<Stats>;
    optional: Partial<Stats>;
}

export interface Power {
    name: string;
    activation: number;
    strain: number;
    category: string | string[];
    effect: string;
}

export interface ModifiedPower {
    name: string;
    activation: number;
}

export interface ModifiedGear {
    name: string;
    gearSlots: number;
}

export interface Equipment extends ModifiedGear {
    type: string;
    notes: string;
}

export interface Weapon extends ModifiedGear {
    type: string;
    maxRange: string | number;
    damageModifier?: number;
    notes?: string;
}

export interface Armour extends ModifiedGear {
    type: string;
    armourModifier?: number;
    notes?: string;
}
export interface Gear extends ModifiedGear {
    type: string;
    notes?: string;
    damageModifier?: number;
    maxRange?: string | number;
    armourModifier?: number;
}
export interface AdvancedWeapons extends ModifiedGear {
    type: string;
    notes?: string;
    damageModifier?: number;
    maxRange: string | number;
    cost: number;
    sell: number;
    equivalent: string;
}
export interface AdvancedTech extends ModifiedGear {
    type: string;
    notes: string;
    armourModifier?: number;
    cost: number;
    sell: number;
    shipGear?: boolean;
    characterOnly?: boolean;
    list: number;
    equivalent?: string;
}

export interface AlienArtefact extends ModifiedGear {
    type: string;
    notes: string;
    cost: number;
    sell: number;
    characterOnly: boolean;
}

export interface Loot {
    name: string;
    type: string;
    sell: number;
}

export type NormalGear = Equipment | Weapon | Armour;
export type SpecialGear = AlienArtefact | AdvancedTech | AdvancedWeapons;

export interface ShipUpgrade {
    name: string;
    notes: string;
    cost: number;
}

export interface Character {
    name: string;
    stats: Stats;
    level: number;
    gearSlots: number;
    type: string;
    background?: string;
    powers: ModifiedPower[];
    gear: ModifiedGear[];
    missNextGame?: boolean;
    currentHealth?: number;
}

export interface Soldier {
    type: string;
    stats: Stats;
    cost: number;
    gearSlots: number;
    gear: string[];
    group: SoldierGroups;
    name: string;
    currentHealth?: number;
    isRobot?: boolean;
}

export interface Creature {
    name: string;
    stats: Stats;
    gear: string[];
    notes?: string[];
}

export interface SoldierMetadata {
    type: string;
    cost: number;
    stats: Stats;
    gear: string[];
    group: SoldierGroups;
}

export interface CharacterMetadata {
    stats: Stats;
    level: number;
    gearSlots: number;
    type: string;
}
export interface Transaction {
    credits: number;
    sign: boolean;
    record: string;
}
export interface CrewState {
    Credits: number;
    Captain: Character;
    FirstMate: Character;
    Soldiers: Soldier[];
    ShipName: string;
    Experience: number;
    ExperienceRecords: number[];
    CreditRecords: Transaction[];
    Cargo: LootItem[];
    ShipUpgrades: string[];
}

export const InitialCrewState: CrewState = {
    Credits: 400,
    Soldiers: [],
    ShipName: "",
    Captain: { name: "", level: 15, stats: { Move: 6, Fight: 3, Shoot: 2, Will: 3, Armour: 9, Health: 16 }, gearSlots: 6, type: CharactersEnum.Captain, powers: [], gear: [] },
    FirstMate: { name: "", level: 0, stats: { Move: 6, Fight: 2, Shoot: 2, Will: 2, Armour: 9, Health: 14 }, gearSlots: 5, type: CharactersEnum.FirstMate, powers: [], gear: [] },
    Experience: 0,
    ExperienceRecords: [0],
    CreditRecords: [{ credits: 400, sign: true, record: "Initial Crew Treasury" }],
    Cargo: [],
    ShipUpgrades: [],
};

export enum LevelImprovements {
    LowerActivation = "Lower an Activation Number",
    ImproveStat = "Improve a Stat",
    NewPower = "Learn a new Power",
    NewPowerOrImproveStat = "New Power or Improve Stat",
}

export interface LevelUpState {
    captainLevels: number;
    firstMateLevels: number;
    choice?: LevelImprovements.NewPower | LevelImprovements.ImproveStat;
}

export interface DropdownOptions {
    placeholder: Gear;
    id: string;
}

export interface StringDropdownOptions {
    placeholder: string;
    id: string;
}

export enum LootType {
    Physical = "Physical Loot",
    Data = "Data Loot",
}

export enum PhysicalCategories {
    TradeGoods = "Trade Goods",
    AdvancedTechnology = "Advanced Technology",
    AdvancedWeapons = "Advanced Weapons",
    AlienTech = "Alien Artefact",
}

export enum DataCategories {
    Credits = "Credits",
    Information = "Information",
    AdvancedTechnology = "Advanced Technology",
    AdvancedWeapons = "Advanced Weapons",
    Secret = "Secret",
}
export interface SelectedCategory {
    lootId: number;
    selectedCategory: PhysicalCategories | DataCategories;
}

export enum TradeGoods {
    TradeGoods75 = "Trade Goods 75 \xA5",
    TradeGoods150 = "Trade Goods 150 \xA5",
    TradeGoods200 = "Trade Goods 200 \xA5",
    TradeGoods250 = "Trade Goods 250 \xA5",
    TradeGoods300 = "Trade Goods 300 \xA5",
    TradeGoods400 = "Trade Goods 400 \xA5",
}

export enum Information {
    Information75 = "Information 75 \xA5",
    Information100 = "Information 100 \xA5",
    Information125 = "Information 125 \xA5",
    Information150 = "Information 150 \xA5",
    Information200 = "Information 200 \xA5",
}

export enum LootCategories {
    Information,
    TradeGoods,
    AdvancedTechnology,
    AdvancedWeapons,
    Secret,
    Credits,
    AlienTech,
}

export interface LootItem {
    name: string;
    type: LootCategories;
}

export enum ShoppingCategories {
    AlienArtefacts = "Alien Artefacts",
    AdvancedWeapons = "Advanced Weapons",
    AdvancedTech1 = "Advanced Tech 1",
    AdvancedTech2 = "Advanced Tech 2",
}
