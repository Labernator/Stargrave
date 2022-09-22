import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_CREW } from "../../redux/actions";
import { CrewState, InitialCrewState } from "../../types";

export const FileSystemPage = () => {
    const [selectedStorage, setSelectedStorage] = useState<CrewState>();
    useEffect(() => undefined, [selectedStorage]);
    const isStorageSelected = (state: CrewState) =>
        state.Credits === selectedStorage?.Credits &&
        state.ShipName === selectedStorage.ShipName &&
        state.Captain.name === selectedStorage.Captain.name &&
        state.Captain.level === selectedStorage.Captain.level &&
        state.FirstMate.level === selectedStorage.FirstMate.level;

    const history = useHistory();
    const dispatch = useDispatch();
    const getStorageTable = () => {
        const myStorage: string[] = Object.values(localStorage);
        return <table className="storage-table">
            <thead>
                <tr><td>Ship name</td><td>Captains name</td><td>Levels</td><td>Credits</td></tr>
            </thead>
            <tbody>
                {myStorage.length > 0 ?
                    myStorage.map((stateString) => {
                        const state: CrewState = JSON.parse(stateString);
                        return <tr className={isStorageSelected(state) ? "selected" : ""} onClick={() => setSelectedStorage(state)}>
                            <td>{state.ShipName}</td>
                            <td>{state.Captain.name}</td>
                            <td>{state.Captain.level} / {state.FirstMate.level}</td>
                            <td>{state.Credits}</td>
                        </tr>;
                    }) :
                    <tr><td colSpan={4}>Nothing has been stored yet or you have cleared your cache recently</td></tr>
                }
            </tbody>
        </table>;
    };
    return <div className="flex-container">
        <label htmlFor="file-uploader" className="flex-container">
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
            <button className="page-btn" onClick={() => document.getElementById("file-uploader")?.click()}>Load crew from file</button>
        </label>
        <div className="chapter-header">Local Storage</div>
        <div>Click on any entry in the local storage list and confirm your choice with the button below. </div>
        {getStorageTable()}
        <button
            onClick={(event) => {
                dispatch({ type: SET_CREW, payload: selectedStorage });
                history.push("/CrewOverview");
                event.preventDefault();
                event.stopPropagation();
            }}
            className={selectedStorage !== undefined ? "page-btn selected" : "page-btn disabled"}
        >Load crew</button>
        <button
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (selectedStorage) {
                    const key = `${selectedStorage.ShipName}_${selectedStorage.Captain.name}_${selectedStorage.Captain.level}_${selectedStorage.FirstMate.level}_${selectedStorage.Credits}`;
                    localStorage.removeItem(key);
                    setSelectedStorage(undefined);
                }
            }}
            className={selectedStorage !== undefined ? "page-btn dialog-btn-danger" : "page-btn disabled"}
        >Remove crew</button>
        <button
            onClick={(event) => {
                dispatch({ type: SET_CREW, payload: InitialCrewState });
                history.goBack();
                event.preventDefault();
                event.stopPropagation();
            }}
            className={"page-btn"}
        >Back</button>
    </div>;
};
