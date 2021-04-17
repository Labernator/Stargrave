import React, { useLayoutEffect, useRef, useState } from "react";

export const InputComponent = ({ currentState, tooltip, cssClass, callback }: { currentState: string; tooltip: string; cssClass: string; callback(name: string): void }) => {
    const [name, setName] = useState<string>(currentState);
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    useLayoutEffect(() => {
        inputRef?.current?.focus();
    }, [inputVisible]);

    const checkEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            callback(name);
            setInputVisible(false);
        }
        if (event.code === "Escape") {
            setName(currentState);
            callback(currentState);
            setInputVisible(false);
        }
    };

    return inputVisible ?
        <input
            ref={inputRef}
            className={cssClass}
            id="NameInput"
            onChange={(event: React.FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)}
            onKeyDown={checkEnter}
            onBlur={() => {
                callback(name);
                setInputVisible(false);
            }}
            value={name}
        /> :
        <div
            style={{ placeSelf: "start", padding: "0.2rem 0.23rem" }}
            className={currentState ? "input-text-div" : "input-text-div input-error"}
            onClick={() => setInputVisible(true)}>
            {currentState || tooltip}
        </div>;
};
