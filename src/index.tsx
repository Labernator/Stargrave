import React from "react";
import * as ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { compose, createStore } from "redux";
import "./App.css";
import { CaptainCreationPage, CrewPage, FileOperationsPage, FirstMateCreationPage, LandingPage, PdfExportPage, ShipNamePage, SoldierSelectionPage } from "./pages";
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
        <Route path="/PdfExport" component={PdfExportPage} />
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
