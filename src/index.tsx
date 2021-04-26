import React from "react";
import * as ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { compose, createStore } from "redux";
import "./App.css";
import { CrewPage } from "./pages/CrewPage";
import { LandingPage } from "./pages/LandingPage";
import { stateReducer } from "./redux/reducer";

const App = () =>
  <BrowserRouter>
    <div className="app-body">
      <Switch>
        {/* <Route path="/SampleWarbands" component={SampleWarbandsPage} /> */}
        <Route path="/NewCrew" component={CrewPage} />
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
