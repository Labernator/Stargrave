import React from "react";
import * as ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { compose, createStore } from "redux";
import "./App.css";
import { CaptainCreationPage } from "./pages/CaptainCreationPage";
import { CrewPage } from "./pages/CrewPage";
import { FileOperationsPage } from "./pages/FileOperationsPage";
import { FirstMateCreationPage } from "./pages/FirstMateCreationPage";
import { LandingPage } from "./pages/LandingPage";
import { ShipNamePage } from "./pages/SetShipNamePage";
import { SoldierSelectionPage } from "./pages/SoldierSelectionPage";
import { stateReducer } from "./redux/reducer";

const App = () =>
  <BrowserRouter>
    <div className="app-body">
      <Switch>
        <Route path="/ShipName" component={ShipNamePage} />
        <Route path="/CaptainCreation" component={CaptainCreationPage} />
        <Route path="/FirstMateCreation" component={FirstMateCreationPage} />
        <Route path="/SoldierSelection" component={SoldierSelectionPage} />
        <Route path="/CrewOverview" component={CrewPage} />
        <Route path="/FileOperations" component={FileOperationsPage} />
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
