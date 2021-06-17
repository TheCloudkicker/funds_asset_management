import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from "react-router-dom";


import FundInvestments from './FundInvestments'
import FundOthers from './FundOthers'


const FundContainer = () => {

    let { fundID } = useParams();

    console.log("FUND ID", fundID)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {

    }, [])

    const handleRowClick = fundID => {
        history.push(`/setup/fund/${fundID}`)
    }


    return (
        <div className="fund-overview-container">

            <FundOthers />

            <FundInvestments />

        </div>
    )
}

export default FundContainer