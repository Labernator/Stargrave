import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Crew from "../../data/Samples/Serenity.json";
import { CreateCrewIcon, ImportCrewIcon, UseSampleIcon } from "../../images";
import { SET_CREW } from "../../redux/actions";
import { CrewState, InitialCrewState } from "../../types";

export const LandingPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    return <div className="flex-container" >
        <div className="chapter-header">Stargrave Crew Configuration</div>
        <div
            className="landing-page-tile"
            onClick={() => {
                dispatch({ type: SET_CREW, payload: InitialCrewState });
                history.push("/ShipName");
            }}>
            <div className="transaction-tile-header">Create new crew</div>
            <img alt="CreateWarband" style={{ width: "35%" }} src={CreateCrewIcon} />

        </div>
        <div
            className="landing-page-tile"
            onClick={() => {
                history.push("/FileSystem");
            }}>
            <div className="transaction-tile-header">Load existing crew from file or local storage</div>
            <img alt="SampleWarband" style={{ width: "35%" }} src={ImportCrewIcon} />

        </div>
        <div
            className="landing-page-tile"
            onClick={() => {
                dispatch({ type: SET_CREW, payload: (Crew as any).default as CrewState });
                history.push("/CrewOverview");
            }}>
            <div className="transaction-tile-header">Load the sample crew of the Serenity</div>
            <img alt="SampleWarband" style={{ width: "35%" }} src={UseSampleIcon} />

        </div>
    </div >;
};
