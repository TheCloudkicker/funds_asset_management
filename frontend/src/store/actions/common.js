export const authConfig = getState => {
    const token = getState().user.currentUser.xa

    const config = { headers: { 'Content-Type': 'application/json' } }

    if (token) { config.headers['Authorization'] = `JWT ${token}` }

    return config;
}

export const getPrefRate = getState => {
    // const token = getState().user


    return 8
}

export const devPrefixes = url => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://127.0.0.1:8000' + url;
    } else {
        return url
    }
}

export const webWorkerPrefizes = url => {
    let path = url
    if (process.env.NODE_ENV !== 'development') {
        path = url
        //  `/static${url}`
    }
    return path
}