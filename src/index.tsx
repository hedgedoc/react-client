import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import * as serviceWorker from './service-worker';
import {LandingLayout} from "./components/landing/landing-layout";
import {ApplicationLoader} from "./components/application-loader/application-loader";
import {Provider} from "react-redux";
import {store} from "./utils/store";
import {setUp} from "./initializers";
import {Editor} from "./components/editor/editor";
import {History} from "./components/landing/pages/history/history";
import {Intro} from "./components/landing/pages/intro/intro";
import {Login} from "./components/landing/pages/login/login";

const initTasks = setUp()

ReactDOM.render(
  <Provider store={store}>
    <ApplicationLoader initTasks={initTasks}>
      <Router>
        <Switch>
                    <Route path="/history">
                        <LandingLayout>
                            <History/>
                        </LandingLayout>
                    </Route>
                    <Route path="/intro">
                        <LandingLayout>
                            <Intro/>
                        </LandingLayout>
                    </Route>
                    <Route path="/login">
                        <LandingLayout>
                            <Login/>
                        </LandingLayout>
                    </Route>
                    <Route path="/n/:id">
                        <Editor/>
                    </Route>
                </Switch>
      </Router>
    </ApplicationLoader>
  </Provider>
  , document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
