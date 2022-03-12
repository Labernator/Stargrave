import React from "react";
import { QuickReferenceSheet1, QuickReferenceSheet2 } from "../images";

export const PrintableQuickReference = () =>
    <React.Fragment>
        <div id="printable-quick-reference1" style={{ position: "absolute", top: "-999rem" }}>
            <img alt="Quick Reference" style={{ width: "29.7cm", height: "21cm" }} src={QuickReferenceSheet1}></img>
        </div>
        <div id="printable-quick-reference2" style={{ position: "absolute", top: "-999rem" }}>
            <img alt="Quick Reference" style={{ width: "29.7cm", height: "21cm" }} src={QuickReferenceSheet2}></img>
        </div>
    </React.Fragment>;
