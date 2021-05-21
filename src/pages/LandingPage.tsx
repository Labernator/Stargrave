import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Crew from "../data/Samples/Firefly.sg";
import { CreateCrewIcon, ImportCrewIcon, UseSampleIcon } from "../images";
import { SET_CREW } from "../redux/actions";
import { CrewState, InitialCrewState } from "../types/State";

export const LandingPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    return <div className="landing-page ">
        <div className="landing-page-title">Stargrave Crew Configuration</div>
        <label htmlFor="file-uploader" className="landing-page-tile">
            <input
                id="file-uploader"
                type="file"
                accept=".sg"
                style={{ display: "none" }}
                onChange={() => {
                    const reader = new FileReader();
                    reader.onload = (ev: ProgressEvent<FileReader>) => {
                        dispatch({ type: SET_CREW, payload: JSON.parse(ev.target?.result as string) });
                        history.push("/CrewOverview");
                    };
                    reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
                }}
            />

            <img alt="ImportWarband" className="landing-page-icon" src={ImportCrewIcon} />
            <div className="landing-page-header">Load existing crew from file</div>
        </label>
        <div
            className="landing-page-tile"
            onClick={() => {
                dispatch({ type: SET_CREW, payload: InitialCrewState });
                history.push("/ShipName");
            }}>

            <img alt="CreateWarband" className="landing-page-icon" src={CreateCrewIcon} />
            <div className="landing-page-header">Create new crew</div>
        </div>
        <div
            className="landing-page-tile"
            onClick={() => {
                dispatch({ type: SET_CREW, payload: (Crew as any).default as CrewState });
                history.push("/CrewOverview");
            }}>

            <img alt="SampleWarband" className="landing-page-icon" src={UseSampleIcon} />
            <div className="landing-page-header">Use sample crew</div>
        </div>
    </div >;
};
