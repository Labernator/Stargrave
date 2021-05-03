import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { SET_CAPTAIN, SET_FIRST_MATE } from "../../redux/actions";
import { BackgroundModifications } from "../../types/Background";
import { Character, Power, Stats, StatsEnum } from "../../types/Characters";
import { getGearDetails, getStatsWithGear, isCaptain } from "../../Utils";
import { InputComponent } from "../InputControl";
import { ExitComponent } from "../statusbar/ExitComponent";
import { StatusBarTable } from "../StatusBarTable";
import { SelectBackground } from "./SelectBackground";
import { SelectGear } from "./SelectGear";
import { SelectPowers } from "./SelectPowers";
import { SelectPowerUpgrades } from "./SelectPowerUpgrades";
import { SelectStatsImprovements } from "./SelectStatsImprovements";

export const CharacterCreationDialog = ({ baseCharacter, callback }: { baseCharacter: Character; callback(value: React.SetStateAction<boolean>): void }) => {
    const [character, setCharacter] = useState<Character>(baseCharacter);
    const [background, setBackground] = useState<BackgroundModifications>();
    const [updatedStats, setUpdatedStats] = useState<Partial<Stats>>({});
    const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
    const [statsSelected, setStatsSelected] = useState<boolean>(false);
    const [powersUpgraded, setPowersUpgraded] = useState<boolean>(false);
    const [gear, setGear] = useState<string[]>([]);
    const dispatch = useDispatch();
    const improvedStats = () => Object.keys(character.stats).reduce(
        (acc, stat) => ({ ...acc, [stat]: (character.stats[stat as StatsEnum] || 0) + (updatedStats[stat as StatsEnum] || 0) }),
        { "Move": 0, "Fight": 0, "Shoot": 0, "Armour": 0, "Will": 0, "Health": 0 }
    );
    const finishPowerUpgrades = (powers: Power[]) => {
        setPowersUpgraded(true);
        setSelectedPowers(powers);
    };
    const finishCreation = () => {
        dispatch({
            type: isCaptain(character.type) ? SET_CAPTAIN : SET_FIRST_MATE,
            payload: {
                ...character,
                stats: improvedStats(),
                background: {
                    name: background?.name,
                    powers: selectedPowers,
                },
                gear,
            },
        });
        callback(false);
    };
    return (
        ReactDOM.createPortal(
            <div className="block-background">
                <div className="modal">
                    <div className="compact-statusbar" style={{ gridTemplateColumns: "20rem auto 4rem" }}>
                        <div className="statusbar-tiles" style={{ minWidth: "14rem" }}>
                            <div className="small-text">{`${character.name ? `${isCaptain(character.type) ? "Captain" : "First Mate"}` : `Click here to give your ${isCaptain(character.type) ? "Captain" : "First Mate"} a proper name`}`}</div>
                            <InputComponent callback={(name: string) => setCharacter({ ...character, name })} currentState={character.name} tooltip="Enter Name" cssClass="input-field" />
                        </div>
                        <StatusBarTable
                            character={background ? { ...character, stats: getStatsWithGear(character.stats, updatedStats, gear), background: { name: background.name, powers: [] } } : character}
                            statModifications={{}}
                            gearSlotsUsed={gear.reduce((acc, gearItem) => acc + getGearDetails(gearItem).gearSlots, 0)} />
                        <ExitComponent compactView={true} clickFn={(e) => {
                            callback(false);
                            e.preventDefault();
                            e.stopPropagation();
                        }} />
                    </div>
                    {!background ? <SelectBackground
                        character={character}
                        selectedBackground={background}
                        updateAndContinue={(val: BackgroundModifications) => { setBackground(val); }}
                    /> : null}
                    {background && !statsSelected ? <SelectStatsImprovements
                        background={background}
                        updateStatsCallback={(value) => { setUpdatedStats(value); }}
                        updateAndContinue={() => setStatsSelected(true)}
                    /> : null}
                    {background && statsSelected && !(selectedPowers.length > 0) ? <SelectPowers background={background} isCaptain={isCaptain(character.type)} updatePowers={isCaptain(character.type) ? setSelectedPowers : finishPowerUpgrades} />
                        : null}
                    {background && statsSelected && selectedPowers.length > 0 && !powersUpgraded ? <SelectPowerUpgrades powers={selectedPowers} upgradePowers={finishPowerUpgrades} /> : null}
                    {background && statsSelected && powersUpgraded ? <SelectGear isCaptain={isCaptain(character.type)} updateGear={setGear} finish={finishCreation} /> : null}
                    {background ?
                        <button
                            onClick={() => {
                                if (background && statsSelected && selectedPowers.length > 0 && powersUpgraded) {
                                    setGear([]);
                                    setPowersUpgraded(false);
                                    setSelectedPowers([]);
                                    return;
                                }
                                if (background && statsSelected && selectedPowers.length > 0) {
                                    setSelectedPowers([]);
                                    return;
                                }
                                if (background && statsSelected) {
                                    setStatsSelected(false);
                                    setUpdatedStats({});
                                    return;
                                }
                                if (background) {
                                    setBackground(undefined);
                                    return;
                                }
                            }}
                            className={"back-btn"}
                        >Back</button>
                        : undefined}
                </div>
            </div >,
            document.getElementById("crewRoster") as HTMLElement
        )
    );
};
