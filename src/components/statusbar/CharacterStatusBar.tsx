import { connect } from "react-redux";
import { Character } from "../../types/Characters";
import { CrewState } from "../../types/State";
import { isCaptain } from "../../Utils";
import { CharacterStatusBarTable } from "../CharacterStatusBarTable";

export const Statusbar = ({ character, gearSlotsUsed }: { character: Character; gearSlotsUsed: number }) =>
    <div key="statusbar" id="statusbar" className="statusbar" >
        <div className="statusbar-tiles" style={{ display: "block", float: "none" }}>{`${isCaptain(character.type) ? "Cpt." : "Ltn."} ${character.name}` || "Unnamed Character"}</div>
        <CharacterStatusBarTable
            character={character}
            gearSlotsUsed={gearSlotsUsed} />
    </div>;

const mapStateToProps = (state: CrewState) => state;

export const CharacterStatusbar = connect(mapStateToProps)(Statusbar);
