import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SelectBackground } from "../components/characterDialog/SelectBackground";
import { SelectGear } from "../components/characterDialog/SelectGear";
import { SelectName } from "../components/characterDialog/SelectName";
import { SelectNonCorePowers } from "../components/characterDialog/SelectNonCorePowers";
import { SelectPowers } from "../components/characterDialog/SelectPowers";
import { SelectPowerUpgrades } from "../components/characterDialog/SelectPowerUpgrades";
import { SelectStatsImprovements } from "../components/characterDialog/SelectStatsImprovements";
import { CharacterStatusbar } from "../components/statusbar/CharacterStatusBar";
import { SET_CAPTAIN, SET_FIRST_MATE } from "../redux/actions";
import { BackgroundModifications } from "../types/Background";
import { Character, ModifiedGear, Power, Stats, StatsEnum } from "../types/Characters";
import { getStatsWithGear, isCaptain } from "../Utils";
import { CharacterOverview } from "./characterDialog/CharacterOverview";
// tslint:disable-next-line: cyclomatic-complexity
export const CharacterCreation = ({ baseCharacter }: { baseCharacter: Character }) => {
    const [character, setCharacter] = useState<Character>(baseCharacter);
    const [background, setBackground] = useState<BackgroundModifications>();
    const [updatedStats, setUpdatedStats] = useState<Partial<Stats>>({});
    const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
    const [statsSelected, setStatsSelected] = useState<boolean>(false);
    const [gearSelected, setGearSelected] = useState<boolean>(false);
    const [powersUpgraded, setPowersUpgraded] = useState<boolean>(false);
    const [gear, setGear] = useState<ModifiedGear[]>([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const isCaptainCharacter = isCaptain(character.type);
    const improvedStats = () => Object.keys(character.stats).reduce(
        (acc, stat) => ({ ...acc, [stat]: (character.stats[stat as StatsEnum] || 0) + (updatedStats[stat as StatsEnum] || 0) }),
        { "Move": 0, "Fight": 0, "Shoot": 0, "Armour": 0, "Will": 0, "Health": 0 }
    );
    const finishPowerUpgrades = (powers: Power[]) => {
        setPowersUpgraded(true);
        setSelectedPowers(powers);
    };
    const finishGearSelection = () => {
        setGearSelected(true);
    };
    const finishCreation = () => {
        dispatch({
            type: isCaptain(character.type) ? SET_CAPTAIN : SET_FIRST_MATE,
            payload: {
                ...character,
                stats: improvedStats(),
                background: background?.name,
                powers: selectedPowers,
                gear,
            },
        });
        isCaptainCharacter ? history.push("/FirstMateCreation", { isCaptain: false }) : history.push("/SoldierSelection");
    };
    return <React.Fragment>
        {!gearSelected ? <CharacterStatusbar
            character={background ? { ...character, stats: getStatsWithGear(character.stats, updatedStats, gear), background: background.name, powers: [] } : character}
            gearSlotsUsed={gear.reduce((acc, gearItem) => acc + gearItem.gearSlots, 0)}
        /> : null}
        {!character.name ? <SelectName
            character={character}
            updateAndContinue={(val: Character) => { setCharacter(val); }}
        /> : null}
        {!background && character.name ? <SelectBackground
            character={character}
            updateAndContinue={(val: BackgroundModifications) => { setBackground(val); }}
        /> : null}
        {background && !statsSelected ? <SelectStatsImprovements
            background={background}
            updateStatsCallback={(value) => { setUpdatedStats(value); }}
            updateAndContinue={() => setStatsSelected(true)}
        /> : null}
        {background && statsSelected && !(selectedPowers.length > 0) ?
            <SelectPowers background={background} isCaptain={isCaptainCharacter} updatePowers={setSelectedPowers} />
            : null}
        {background && statsSelected && selectedPowers.length > 0 && selectedPowers.length !== (isCaptainCharacter ? 5 : 4) ?
            <SelectNonCorePowers background={background} corePowers={selectedPowers} isCaptain={isCaptainCharacter} updatePowers={isCaptainCharacter ? setSelectedPowers : finishPowerUpgrades} />
            : null}
        {background && statsSelected && selectedPowers.length > 0 && selectedPowers.length === (isCaptainCharacter ? 5 : 4) && !powersUpgraded ?
            <SelectPowerUpgrades powers={selectedPowers} upgradePowers={finishPowerUpgrades} />
            : null}
        {background && statsSelected && powersUpgraded && !gearSelected ?
            <SelectGear isCaptain={isCaptainCharacter} updateGear={setGear} finish={finishGearSelection} />
            : null}
        {background && statsSelected && powersUpgraded && gearSelected ?
            <CharacterOverview
                character={{
                    ...character,
                    stats: improvedStats(),
                    background: background?.name,
                    powers: selectedPowers,
                    gear,
                }}
                finish={finishCreation} />
            : null}
        {character.name ?
            <button
                onClick={() => {
                    if (background && statsSelected && selectedPowers.length > 0 && powersUpgraded) {
                        setGear([]);
                        setPowersUpgraded(false);
                        setGearSelected(false);
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
                    if (!background && character.name) {
                        setCharacter({ ...character, name: "" });
                        return;
                    }
                }}
                className={"dialog-btn back-btn"}
            >Back</button>
            : undefined}
    </React.Fragment>;
};
