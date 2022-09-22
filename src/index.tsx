import React from "react";
import * as ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { compose, createStore } from "redux";
import "./App.css";
import {
  CharacterBackgroundPage, CharacterNamePage, CharacterNonCorePowerSelectionPage, CharacterPowerImprovementsPage,
  CharacterPowerSelectionPage, CharacterSelectGearPage, CharacterStatsSelectionPage,
  CrewPage, DataLootPage, EquipmentPage, ExperiencePage, FileOperationsPage,
  FileSystemPage, LandingPage, LevelUpCaptainPage,
  LevelUpFirstMatePage, LevelUpPage, PdfExportPage, PhysicalLootPage, PostGameSequencePage,
  ShipNamePage, ShipsCargoPage, ShoppingPage, SoldierEquipmentPage, SoldierSelectionPage, TransactionsPage
} from "./pages";
import { ShipUpgradesPage } from "./pages/Overview/ShipUpgradesPage";
import { TransactionHistoryPage } from "./pages/Overview/TransactionHistoryPage";
import { stateReducer } from "./redux/reducer";

const App = () =>
  <BrowserRouter>
    <div className="app-body">
      <Switch>
        <Route path="/ShipName" component={ShipNamePage} />
        <Route path="/CharacterName" component={CharacterNamePage} />
        <Route path="/CharacterBackground" component={CharacterBackgroundPage} />
        <Route path="/CharacterStatsSelection" component={CharacterStatsSelectionPage} />
        <Route path="/CharacterPowerSelection" component={CharacterPowerSelectionPage} />
        <Route path="/CharacterNonCorePowerSelection" component={CharacterNonCorePowerSelectionPage} />
        <Route path="/CharacterImprovePowers" component={CharacterPowerImprovementsPage} />
        <Route path="/CharacterSelectGear" component={CharacterSelectGearPage} />
        <Route path="/SoldierSelection" component={SoldierSelectionPage} />
        <Route path="/CrewOverview" component={CrewPage} />
        <Route path="/FileOperations" component={FileOperationsPage} />
        <Route path="/FileSystem" component={FileSystemPage} />
        <Route path="/Experience" component={ExperiencePage} />
        <Route path="/LevelUp" component={LevelUpPage} />
        <Route path="/LevelUpCaptain" component={LevelUpCaptainPage} />
        <Route path="/LevelUpFirstMate" component={LevelUpFirstMatePage} />
        <Route path="/PhysicalLootDeclaration" component={PhysicalLootPage} />
        <Route path="/DataLootDeclaration" component={DataLootPage} />
        <Route path="/PostGameSequence" component={PostGameSequencePage} />
        <Route path="/TransactionHistory" component={TransactionHistoryPage} />
        <Route path="/PdfExport" component={PdfExportPage} />
        <Route path="/ShipsCargo" component={ShipsCargoPage} />
        <Route path="/ShipUpgrades" component={ShipUpgradesPage} />
        <Route path="/SoldierEquipment" component={SoldierEquipmentPage} />
        <Route path="/Equipment" component={EquipmentPage} />
        <Route path="/Transactions" component={TransactionsPage} />
        <Route path="/Shopping" component={ShoppingPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </div>
  </BrowserRouter>;

export const AppContainer = connect()(App);
export const store = createStore(stateReducer, compose(typeof window === "object" &&
  typeof (window as any).devToolsExtension !== "undefined" ?
  (window as any).devToolsExtension() :
  (f: any) => f
));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
