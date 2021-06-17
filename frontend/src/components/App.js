import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, useHistory } from "react-router-dom";

import Alert from './alert/Alert'
import Calendar from './schedule/Calendar'
import Fs from './fs/Fs'
import LeftNav from './layout/LeftNav'
import Navigator from './navigator/Navigator'
import Recycle from './recycle/Recycle'
import Reports from './reports/Reports'
import Repository from './repository/Repository'
import Setup from './setup/Setup'
import Testing from './testing/Testing'
import Uploads from './uploads/Uploads'
import MainHeader from './layout/mainHeader/MainHeader'

import { useSelector, useDispatch } from 'react-redux'
import { toggleIsDark, toggleSideNav, windowResized } from '../store/actions/layout'
import { getSettings } from '../store/actions/settings'
import { getFunds, getAliases } from '../store/actions/funds/funds'
import { getRecycledItems } from '../store/actions/recycle';
import { getPeriods, setSelectedPeriod } from '../store/actions/periods'
import { setToday } from '../store/actions/calendar'
import { getDatabase } from '../store/actions/database'
import { getCurrencies } from '../store/actions/main';
import { getProfiles } from '../store/actions/user';
import { AppContainer } from '../assets/styled-components/Containers'
import Modal from './common/Modal'

const App = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  const { currentUser } = useSelector(state => state.user)
  const { leftNavExpanded, isDark, appString, modalVisible } = useSelector(state => state.layout)
  const isDarkRef = useRef(isDark)
  const leftNavExpandedRef = useRef(leftNavExpanded)


  useEffect(() => {
    checkIfNotDarkMode()
  }, [])

  useEffect(() => {
    dispatch(getPeriods())
    dispatch(getFunds())
    dispatch(getAliases())
    dispatch(getSettings())
    dispatch(getRecycledItems())
    dispatch(getDatabase())
    dispatch(getCurrencies())
    // dispatch(getProfiles())
    // dispatch(setToday())
  }, [])

  const toggleDarkMode = data => {
    isDarkRef.current = data;
    dispatch(toggleIsDark(data))
  };

  const toggleLeftNav = data => {
    leftNavExpandedRef.current = data;
    dispatch(toggleSideNav(data))
  };

  const listenForKeyEvent = evt => {
    if (evt.ctrlKey && evt.keyCode === 32) {
      history.push('/settings')
    } else if (evt.ctrlKey && evt.keyCode === 88) {
      if (isDarkRef.current) {
        toggleDarkMode(false)
      } else {
        toggleDarkMode(true)
      }
    } else if (evt.ctrlKey && evt.keyCode === 18) {
      if (leftNavExpandedRef.current) {
        toggleLeftNav(false)
      } else {
        toggleLeftNav(true)
      }
    }
  }



  const checkIfNotDarkMode = () => {
    dispatch(toggleIsDark(false))
    // if (!isDark) {
    //   dispatch(toggleIsDark(false))
    // }

  }

  const handleResize = () => dispatch(windowResized())

  useEffect(() => {
    let prevUrl = localStorage.getItem('waibeUrl')

    if (prevUrl) {
      setTimeout(() => {
        history.push(prevUrl)
      }, 0)
    }

    document.body.addEventListener('keydown', listenForKeyEvent);
    window.addEventListener('resize', handleResize)

    return () => {
      document.body.removeEventListener('keydown', listenForKeyEvent);
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <AppContainer style={{ gridTemplateRows: '4rem auto' }} isExpanded={leftNavExpanded && appString !== "Navigator"}>

      <Alert />
      <LeftNav dispatch={dispatch} />
      <MainHeader dispatch={dispatch} isDark={isDark} />

      {modalVisible ? <Modal dispatch={dispatch} /> : null}

      <Switch>
        <Route exact path="/" >
          <React.Fragment />
        </Route>
        <Route path="/calendar" component={Calendar} />
        <Route path="/fs" component={Fs} />
        <Route path="/navigator" component={Navigator} />
        <Route path="/recyclebin" component={Recycle} />
        <Route path="/reports" component={Reports} />
        <Route path="/repository" component={Repository} />
        <Route path="/setup" component={Setup} />
        <Route path="/testing" component={Testing} />
        <Route path="/uploads" component={Uploads} />
      </Switch>

    </AppContainer>
  )
}
export default App;
