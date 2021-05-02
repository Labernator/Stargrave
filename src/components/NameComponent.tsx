import { InputComponent } from "./InputControl";

export const NameComponent = ({ currentStateValue, inputCallback }: { currentStateValue: string; inputCallback(name: string): void }) =>
    <div className="statusbar-tiles" style={{ minWidth: "14rem" }}>
        <div className="toolbar-two-column-header-text small-text">Crew Name</div>
        <InputComponent callback={inputCallback} currentState={currentStateValue} tooltip="Your crew needs a name" cssClass="input-field" />
    </div>;
