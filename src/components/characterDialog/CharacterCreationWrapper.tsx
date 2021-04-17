import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { DeleteItemIcon } from "../../images";
import { SET_CAPTAIN, SET_FIRST_MATE } from "../../redux/actions";
import { BackgroundModifications } from "../../types/Background";
import { Character, Power, Stats, StatsEnum } from "../../types/Characters";
import { isCaptain } from "../../Utils";
import { CharacterTable } from "../CharacterTableComponent";
import { SelectBackground } from "./SelectBackground";
import { SelectPowers } from "./SelectPowers";
import { SelectPowerUpgrades } from "./SelectPowerUpgrades";
import { SelectStatsImprovements } from "./SelectStatsImprovements";

export const CharacterCreationDialog = ({ baseCharacter, callback }: { baseCharacter: Character; callback(value: React.SetStateAction<boolean>): void }) => {
    const [character, setCharacter] = useState<Character>(baseCharacter);
    const [background, setBackground] = useState<BackgroundModifications>();
    const [updatedStats, setUpdatedStats] = useState<Partial<Stats>>({});
    const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
    const [statsSelected, setStatsSelected] = useState<boolean>(false);
    const dispatch = useDispatch();
    const improvedStats = () => Object.keys(character.stats).reduce(
        (acc, stat) => ({ ...acc, [stat]: (character.stats[stat as StatsEnum] || 0) + (updatedStats[stat as StatsEnum] || 0) }),
        { "Move": 0, "Fight": 0, "Shoot": 0, "Armour": 0, "Will": 0, "Health": 0 }
    );
    const finishCreation = (powers: Power[]) => {
        dispatch({
            type: isCaptain(character.type) ? SET_CAPTAIN : SET_FIRST_MATE,
            payload: {
                ...character,
                stats: improvedStats(),
                background: {
                    name: background?.name,
                    powers,
                },
            },
        });
        callback(false);
    };
    return (
        ReactDOM.createPortal(
            <div className="block-background">
                <div className="modal">
                    <img
                        className="close-dialog"
                        src={DeleteItemIcon}
                        onClick={(e) => {
                            callback(false);
                            e.preventDefault();
                            e.stopPropagation();
                        }} />
                    {<div className="modal-header">{!character.name ? `Give your ${isCaptain(character.type) ? "Captain" : "First Mate"} a name` : `${isCaptain(character.type) ? "Captain" : "First Mate"} - Overview`}</div>}
                    <CharacterTable character={background ? { ...character, background: { name: background.name, powers: [] } } : character} statModifications={updatedStats} setNameCallback={(name: string) => setCharacter({ ...character, name })} />
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
                    {background && statsSelected && !(selectedPowers.length > 0) ? <SelectPowers background={background} isCaptain={isCaptain(character.type)} updatePowers={isCaptain(character.type) ? setSelectedPowers : finishCreation} />
                        : null}
                    {background && statsSelected && selectedPowers.length > 0 ? <SelectPowerUpgrades powers={selectedPowers} upgradePowers={finishCreation} /> : null}
                </div>
            </div >,
            document.getElementById("crewRoster") as HTMLElement
        )
    );
};
