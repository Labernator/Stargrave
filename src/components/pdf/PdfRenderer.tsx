import { PdfCharacters, PdfSoldiers } from "./PdfRosterComponents";

export const PdfRenderer = () =>
    <div className="pdf-container">
        <PdfCharacters />
        <PdfSoldiers />
    </div>;
