import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Character } from "../../types/Characters";
import { CrewState } from "../../types/State";
import { CharacterStatusBarTable } from "../CharacterStatusBarTable";
import { ExitComponent } from "./ExitComponent";

export const Statusbar = ({ character, gearSlotsUsed }: { character: Character; gearSlotsUsed: number }) => {
    const history = useHistory();
    return <div key="statusbar" id="statusbar" className="statusbar" style={{ gridTemplateColumns: "auto 3rem" }}>
        <div className="statusbar-tiles" style={{ gridArea: 1 }}>{character.name || "Unnamed Character"}</div>
        <ExitComponent compactView={true} clickFn={() => {
            history.push("/CrewCreation");
        }} />
        {/* <FileComponent compactView={true} /> */}
        <CharacterStatusBarTable
            character={character}
            gearSlotsUsed={gearSlotsUsed} />
    </div>;
};

const mapStateToProps = (state: CrewState) => state;

export const CharacterStatusbar = connect(mapStateToProps)(Statusbar);
