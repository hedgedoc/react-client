import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import * as serviceWorker from './service-worker';
import {Landing} from "./components/landing/layout";
import {setUpFontAwesome} from "./initializers/fontAwesome";
import {ApplicationLoader} from "./components/loader/application-loader";
import {Provider} from "react-redux";
import {setUpI18n} from "./initializers/i18n";
import {store} from "./utils/store";
import {loadAllConfig} from "./initializers/configLoader";

setUpFontAwesome();
const initTasks: (Promise<any>[]) = [setUpI18n(), loadAllConfig(), new Promise(resolve => setTimeout(resolve, 3000))]

ReactDOM.render(
    <Provider store={store}>
        <ApplicationLoader initTasks={initTasks}>
            <Router>
                <Landing/>
            </Router>
        </ApplicationLoader>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
