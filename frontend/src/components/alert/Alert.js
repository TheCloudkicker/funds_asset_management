import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

const Alert = () => {

    const { successMessage, successTime, errorMessage, errorTime } = useSelector(state => state.alerts)
    const alert = useAlert()
    const [successReady, setSuccessReady] = useState(false)
    const [errorReady, setErrorReady] = useState(false)

    useEffect(() => {
        if (successReady) {
            alert.success(successMessage)
        } else {
            setSuccessReady(true)
        }
    }, [successTime])

    useEffect(() => {
        if (errorReady) {
            alert.error(errorMessage)
        } else {
            setErrorReady(true)
        }
    }, [JSON.stringify(errorTime)])

    return <React.Fragment />
}

export default Alert
