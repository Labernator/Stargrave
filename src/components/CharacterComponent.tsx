import { store } from "..";
import { getBackgroundImage } from "../images";
import { Character, StatsEnum } from "../types/Characters";

export const CharacterComponent = ({ isCaptain }: { isCaptain: boolean }) => {
    const state = store.getState();
    const character = (isCaptain ? state.Captain : state.FirstMate) as Character;
    const id = isCaptain ? "captain" : "firstmate";
    const renderCaptainStats = () => <tr>
        <td>{character.name}</td>
        {Object.keys(character.stats).map((stat) => {
            switch (stat) {
                case "Fight":
                case "Shoot":
                case "Will":
                    return <td key={`${id}_stat_${stat}`}>+{character.stats[stat as StatsEnum]}</td>;
                default:
                    return <td key={`${id}_stat_${String(stat)}`}>{character.stats[stat as StatsEnum]}</td>;
            }
        })}
        <td>{character.level}</td>
    </tr>;

    return <div key={`${id}_tile`} className="character-tile">
        <div className="character-title">
            <div className="character-title-left">{character.name}</div>
            <div className="character-title-right">{isCaptain ? "Captain" : "First Mate"}</div>
        </div>
        <table className="character-table">
            <thead>
                <tr>
                    <td key={`${id}_stat_header_name`}>Name</td>
                    {Object.keys(StatsEnum).map((stat) => <td key={`${id}_stat_header_${stat}`}>{stat}</td>)}
                    <td key={`${id}_stat_header_level`}>Level</td>
                </tr>
            </thead>
            <tbody>
                {renderCaptainStats()}
            </tbody>
        </table>
        <div className="character-title">Background</div>
        <div>
            <div style={{ float: "left" }}>
                <img className="background-image-tile" src={getBackgroundImage(character.background?.name)} alt={`${id}_tile-${character.name}-bg-icon`} />
                <div className="background-title">{character.background?.name}</div>
            </div>
            <table className="power-table">
                <thead>
                    <tr>
                        <td>Power</td>
                        <td>Activation Level</td>
                        <td>Strain</td>
                        <td>Category</td>
                    </tr>
                </thead>
                <tbody>
                    {character.background?.powers.map((power) =>
                        <tr key={`${id}_power_${power.name}`}>
                            <td>{power.name}</td><td>{power.activationValue}</td>
                            <td>{power.strain}</td>
                            <td>{Array.isArray(power.category) ? power.category.map((cat) => <div>{cat}</div>) : power.category}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>;
};
