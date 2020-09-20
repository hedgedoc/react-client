import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { ApplicationLoader } from './components/application-loader/application-loader'
import { NotFoundErrorScreen } from './components/common/routing/not-found-error-screen'
import Redirector from './components/common/routing/redirector'
import { ErrorBoundary } from './components/error-boundary/error-boundary'
import IntroPage from './components/intro-page/intro-page'
import LoginPage from './components/login-page/login-page'
import ProfilePage from './components/profile-page/profile-page'
import RegisterPage from './components/register-page/register-page'
import { store } from './redux'
import * as serviceWorker from './service-worker'
import './style/index.scss'
import './style/dark.scss'

const Editor = React.lazy(() => import('./components/editor/editor'))
const HistoryPage = React.lazy(() => import('./components/history-page/history-page'))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ApplicationLoader>
        <ErrorBoundary>
          <Switch>
            <Route path="/history">
              <HistoryPage/>
            </Route>
            <Route path="/intro">
              <IntroPage/>
            </Route>
            <Route path="/login">
              <LoginPage/>
            </Route>
            <Route path="/register">
              <RegisterPage/>
            </Route>
            <Route path="/profile">
              <ProfilePage/>
            </Route>
            <Route path="/n/:id">
              <Editor/>
            </Route>
            <Route path="/:id">
              <Redirector/>
            </Route>
            <Route path="/">
              <Redirect to="/intro"/>
            </Route>
            <Route>
              <NotFoundErrorScreen/>
            </Route>
          </Switch>
        </ErrorBoundary>
      </ApplicationLoader>
    </Router>
  </Provider>
  , document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
