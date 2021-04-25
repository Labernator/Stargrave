import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { DeleteItemIcon } from "../../images";
import { CrewState } from "../../types/State";

export const SaveLoadComponent = ({ state, closeCallback }: { state: CrewState; closeCallback(): void }) => {
    const [fileName, setFileName] = useState<string>(`${state.Title}-Level-${state.Captain?.level}`);
    const [validFileName, setFileNameValidity] = useState<boolean>(true);
    useEffect(() => {
        document.getElementById("NameInput")?.focus();
    });
    const onInput = (e: React.FormEvent<HTMLInputElement>) => {
        const regex = /^[a-zA-Z0-9_\-.]+$/;
        setFileName(e.currentTarget.value);
        e.currentTarget.value !== "" && regex.test(e.currentTarget.value) ? setFileNameValidity(true) : setFileNameValidity(false);
    };
    const saveToFileNew = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const anchor = document.createElement("a");
        document.body.appendChild(anchor);
        const json = JSON.stringify(state);
        const blob = new Blob([json], { type: "octet/stream" });
        const url = window.URL.createObjectURL(blob);
        anchor.href = url;
        anchor.download = `${fileName}.sg`;
        anchor.id = "ClickableDownloadAnchor";
        anchor.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(document.getElementById("ClickableDownloadAnchor") as Node);
        closeCallback();
        e.preventDefault();
        e.stopPropagation();
    };
    return (
        ReactDOM.createPortal(
            <div className="block-background">
                <div className="modal">
                    <img
                        className="close-dialog"
                        src={DeleteItemIcon}
                        alt="deleteIcon"
                        onClick={(e) => {
                            closeCallback();
                            e.preventDefault();
                            e.stopPropagation();
                        }} />
                    {<div className="modal-header">{"Save your warband"}</div>}
                    <div className="save-warband-text">Please enter a file name.</div>
                    <input
                        id="NameInput"
                        className={validFileName ? "input-field" : "input-field input-error"}
                        onChange={onInput}
                        value={fileName} />
                    {!validFileName ?
                        <div className="save-warband-error-text">
                            This is not a valid file name. Valid filenames contain only letters, numbers, dashes, underscores and dots.
                    </div> :
                        undefined}
                    <button
                        style={{ gridArea: "8" }}
                        className={validFileName ? "power-btn" : "power-btn disabled"}
                        onClick={(e) => validFileName ? saveToFileNew(e) : undefined}
                    >Save</button>
                </div>
            </div >,
            document.getElementById("crewRoster") as HTMLElement
        )
    );
};

const mapStateToProps = (state: CrewState) => state;

export const SaveLoadDialog = connect(mapStateToProps)(SaveLoadComponent);
