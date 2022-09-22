import { useHistory } from "react-router-dom";

export const BackButtonComponent = () => {

    const history = useHistory();
    return <button
        onClick={(event) => {
            history.goBack();
            event.preventDefault();
            event.stopPropagation();
        }}
        className={"dialog-btn back-btn"}
    >Back</button>;
};

export const PageBackBtnComponent = () => {
    const history = useHistory();
    return <button
        onClick={(event) => {
            history.goBack();
            event.preventDefault();
            event.stopPropagation();
        }}
        className={"page-btn"}
    >Back</button>;
};
