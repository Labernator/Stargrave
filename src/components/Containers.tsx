export const FlexContainer = ({ firstItem, secondItem }: { firstItem: string; secondItem: string }) =>
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }} className="emphasized">
        <div>{firstItem}</div>
        <div>{secondItem}</div>
    </div>;
