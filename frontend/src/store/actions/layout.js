import {
    UPDATE_APP_VIEW, TOGGLE_SIDE_NAV, UPDATE_REDIRECT_APP, WINOW_RESIZED,
    LOCK_LEFT_NAV, TOGGLE_IS_DARK, TOGGLE_DATE_VISIBLE, UPDATE_LAYOUT
} from './types'


export const updateLayout = (key, value) => {
    return {
        type: UPDATE_LAYOUT,
        payload: { key, value }
    }
}



export const windowResized = () => {
    return {
        type: WINOW_RESIZED
    }
}

export const toggleDateVisible = isVisible => {
    return {
        type: TOGGLE_DATE_VISIBLE,
        payload: isVisible
    }
}

export const toggleIsDark = isDark => {

    if (isDark) {
        document.documentElement.style.setProperty('--bg-primary', '#121212');
        document.documentElement.style.setProperty('--bg-secondary', '#282828');
        document.documentElement.style.setProperty('--bg-tertiary', '#1d1d1d');
        document.documentElement.style.setProperty('--bg-tertiary-hover', '#242424');
        document.documentElement.style.setProperty('--text-primary', '#b6b6b6');
        document.documentElement.style.setProperty('--text-secondary', '#ececec');

        document.documentElement.style.setProperty('--bg-sidenav', '#2b2c2d');
        document.documentElement.style.setProperty('--waibe-logo-text', '#4c51bf');
        document.documentElement.style.setProperty('--icon-secondary', '#4c51bf');
        document.documentElement.style.setProperty('--icon-color-primary', 'white');
        document.documentElement.style.setProperty('--bg-secondary-hover', '#3b3b3b');
        document.documentElement.style.setProperty('--bg-primary-hover', '#161616');

    } else {



        document.documentElement.style.setProperty('--bg-primary', '#fff');
        document.documentElement.style.setProperty('--bg-secondary', '#eeeeee');
        document.documentElement.style.setProperty('--bg-tertiary', '#f5f5f5');
        document.documentElement.style.setProperty('--bg-tertiary-hover', '#f8f8f8');
        // document.documentElement.style.setProperty('--text-primary', '#121212');
        document.documentElement.style.setProperty('--text-secondary', '#282828');
        document.documentElement.style.setProperty('--text-secondary-light', 'rgba(41, 41, 41, 0.3)');
        // document.documentElement.style.setProperty('--bg-sidenav', '#000000');
        document.documentElement.style.setProperty('--bg-sidenav', '#2b2c2d');
        document.documentElement.style.setProperty('--waibe-logo-text', '#fff');
        document.documentElement.style.setProperty('--icon-secondary', '#fff');
        document.documentElement.style.setProperty('--icon-color-primary', '#121212');
        document.documentElement.style.setProperty('--bg-secondary-hover', '#dadada');
        document.documentElement.style.setProperty('--bg-primary-hover', '#dedfe0');
    }


    // document.documentElement.style.setProperty('--bg-fourth', '#fff');

    return {
        type: TOGGLE_IS_DARK,
        payload: isDark
    }
}

export const lockLeftNav = isLocked => {
    return {
        type: LOCK_LEFT_NAV,
        payload: isLocked
    }
}


export const updateDirectApp = app => {
    return {
        type: UPDATE_REDIRECT_APP,
        payload: app
    }
}


export const updateAppView = (app, subApp) => {
    return {
        type: UPDATE_APP_VIEW,
        payload: { app, subApp }
    }
}
export const toggleSideNav = isOpen => {
    return {
        type: TOGGLE_SIDE_NAV,
        payload: isOpen
    }
}