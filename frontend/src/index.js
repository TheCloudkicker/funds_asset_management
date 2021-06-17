import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "semantic-ui-css/semantic.min.css";
import './assets/css/Index.css'
import './fonts/Roboto-Regular.ttf'

import { SpinnerFull } from './components/common/Spinner'
import registerServiceWorker from "./registerServiceWorker";
import firebase from "./firebase";
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { setUser, clearUser } from "./store/actions";

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import DarkAlertTemplate from './components/alert/DarkAlertTemplate'
import { useHistory } from "react-router-dom";

import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'


const options = {
    position: positions.TOP_RIGHT,
    timeout: 1000,
    offset: '2rem 2rem',
    transition: transitions.FADE,
    containerStyle: {
        zIndex: 200
    }
}

const Root = () => {

    const { isLoading } = useSelector(state => state.user)
    const { isDark } = useSelector(state => state.layout)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(setUser(user))
                history.push("/");
            } else {
                history.push("/login");
                dispatch(clearUser());
            }
        });
    }, [])

    if (isLoading) {
        return <SpinnerFull inverted={isDark ? false : true} />
    } else {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" component={App} />
            </Switch>
        )
    }
}





ReactDOM.render(
    <AlertProvider template={DarkAlertTemplate} {...options}>
        <Provider store={store}>
            <Router>
                <PersistGate persistor={persistor}>
                    <Root />
                </PersistGate>
            </Router>
        </Provider>
    </AlertProvider>,
    document.getElementById("root")
);
// registerServiceWorker();
