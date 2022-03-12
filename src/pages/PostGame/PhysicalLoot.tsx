import React, { useState } from "react";
import { Carousel } from "../../components/common/Carousel";
import { getAdvancedTech, getAdvancedWeapons, getAlienArtefacts } from "../../Utils";
enum Categories {
    Credits = "Credits",
    AdvancedTech = "Advanced Technologies",
    AdvancedWeapons = "Advanced Weapons",
    AlienTech = "Alien Artefacts",
}
export const PhysicalLoot = () => {
    const [selectedItem, setSelectedItem] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<Categories | undefined>(undefined);
    const advTech = getAdvancedTech();
    const alienTech = getAlienArtefacts();
    const advWeapons = getAdvancedWeapons();
    const isItemSelected = (name: string) => selectedItem === name;
    const renderPhysicalLootSelection: JSX.Element = <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className={selectedCategory === Categories.Credits ? "loot-selection selected" : "loot-selection"}
            onClick={() => setSelectedCategory(Categories.Credits)}
        >
            {Categories.Credits}
        </div>
        <div className={selectedCategory === Categories.AdvancedWeapons ? "loot-selection selected" : "loot-selection"}
            onClick={() => setSelectedCategory(Categories.AdvancedWeapons)}
        >
            {Categories.AdvancedWeapons}
        </div>
        <div className={selectedCategory === Categories.AdvancedTech ? "loot-selection selected" : "loot-selection"}
            onClick={() => setSelectedCategory(Categories.AdvancedTech)}
        >
            {Categories.AdvancedTech}
        </div>
        <div className={selectedCategory === Categories.AlienTech ? "loot-selection selected" : "loot-selection"}
            onClick={() => setSelectedCategory(Categories.AlienTech)}
        >
            {Categories.AlienTech}
        </div>
    </div>;
    const renderItems = () => {
        let renderedItems: JSX.Element;
        switch (selectedCategory) {
            case Categories.Credits:
                return renderedItems = <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div style={{ padding: "1rem", width: "24%" }} className={isItemSelected("75 \xA5") ? "gear-selection selected" : "gear-selection"} onClick={() => setSelectedItem("75 \xA5")}>{"75 \xA5"}</div>
                    <div style={{ padding: "1rem", width: "24%" }} className={isItemSelected("150 \xA5") ? "gear-selection selected" : "gear-selection"} onClick={() => setSelectedItem("150 \xA5")}>{"150 \xA5"}</div>
                    <div style={{ padding: "1rem", width: "23%" }} className={isItemSelected("200 \xA5") ? "gear-selection selected" : "gear-selection"} onClick={() => setSelectedItem("200 \xA5")}>{"200 \xA5"}</div>
                    <div style={{ padding: "1rem", width: "24%" }} className={isItemSelected("250 \xA5") ? "gear-selection selected" : "gear-selection"} onClick={() => setSelectedItem("250 \xA5")}>{"250 \xA5"}</div>
                    <div style={{ padding: "1rem", width: "24%" }} className={isItemSelected("300 \xA5") ? "gear-selection selected" : "gear-selection"} onClick={() => setSelectedItem("300 \xA5")}>{"300 \xA5"}</div>
                    <div style={{ padding: "1rem", width: "23%" }} className={isItemSelected("400 \xA5") ? "gear-selection selected" : "gear-selection"} onClick={() => setSelectedItem("400 \xA5")}>{"400 \xA5"}</div>
                </div>;
            case Categories.AdvancedTech:
                return renderedItems = <Carousel
                    splitSize={10}
                    inputDivs={advTech.map((tech) => <div className={isItemSelected(tech.name) ? "gear-selection selected" : "gear-selection"} onClick={() => setSelectedItem(tech.name)}>{tech.name}</div>)}
                />;
            case Categories.AdvancedWeapons:
                return renderedItems = <Carousel
                    splitSize={10}
                    inputDivs={advWeapons.map((weapon) => <div className={isItemSelected(weapon.name) ? "gear-selection selected" : "gear-selection"} onClick={() => setSelectedItem(weapon.name)}>{weapon.name}</div>)}
                />;
            case Categories.AlienTech:
                return renderedItems = <Carousel
                    splitSize={10}
                    inputDivs={alienTech.map((artefact) => <div className={isItemSelected(artefact.name) ? "gear-selection selected" : "gear-selection"} onClick={() => setSelectedItem(artefact.name)}>{artefact.name}</div>)}
                />;
        }
    };
    return <React.Fragment>
        <div>Select the loot category:</div>
        {renderPhysicalLootSelection}
        <div>Select your loot item:</div>
        {renderItems()}
    </React.Fragment>;
};
