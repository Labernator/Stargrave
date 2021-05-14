import { InputComponent } from "./InputControl";

export const NameComponent = ({ currentStateValue, tooltip, inputCallback }: { currentStateValue: string; tooltip: string; inputCallback(name: string): void }) =>
    <div className="statusbar-name">
        <InputComponent callback={inputCallback} currentState={currentStateValue} tooltip={tooltip} cssClass="input-field" />
    </div>;
