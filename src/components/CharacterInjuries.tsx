import React from "react";
import { Character } from "../types";

export const CharacterInjuries = ({ character }: { character: Character }) =>
    <React.Fragment>
        {character.missNextGame ?
            <table className="character-tile-table" style={{ width: "100%", textAlign: "left" }}>
                <colgroup>
                    <col style={{ width: "25%" }} />
                    <col style={{ width: "75%" }} />
                </colgroup>
                <tbody>
                    <tr className={"small-text"}>
                        <td style={{ fontSize: "1rem", paddingRight: "1rem", fontWeight: "bold" }}>Injuries</td>
                        <td>Barely Alive - Misses the upcoming mission</td>
                    </tr>
                </tbody>
            </table> :
            undefined
        }
    </React.Fragment>;
