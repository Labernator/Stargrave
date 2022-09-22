import { useHistory } from "react-router-dom";

export const CustomBackButtonComponent = ({ dispatchFunction, customHistory }: { dispatchFunction(): void; customHistory?(): void }) => {

    const history = useHistory();
    return <button
        onClick={(event) => {
            dispatchFunction();
            customHistory ? customHistory() : history.goBack();
            event.preventDefault();
            event.stopPropagation();
        }}
        className={"page-btn"}
    >Back</button>;
};
