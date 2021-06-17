



export const updateCarryState = (carryCopy, payload) => {

    if (payload.key === 'lock') {
        carryCopy['compare']['client_value'].editable = payload.value

    } else if (payload.section === 'investments' || payload.section === 'allocation') { //

        if (payload.subSection === null) {

            if (payload.key === 'hypothetical_inv_flows' || payload.key === 'maximum_allocable_carry') {
                carryCopy[payload.section][payload.key] = payload.value
            } else if (payload.key === 'max_distributable_carry' || payload.key === 'total_allocable_carry' || payload.key === 'cy_carry') {
                carryCopy[payload.section][payload.key] = payload.value
            }


        } else if (payload.subSection === 'hyp_liq_value') {

            if (payload.key === 'editable' || payload.key === 'isOpen') {
                if (payload.indexes.accountIndex === null) {
                    carryCopy[payload.section][payload.subSection][payload.indexes.type][payload.key] = payload.value
                }
            }

        } else if (payload.subSection === 'primary' || payload.subSection === 'secondary' || payload.subSection === 'direct') {



            if (payload.key === 'editable' || payload.key === 'isOpen') {

                if (payload.indexes.yearIndex === null && payload.indexes.accountIndex === null) {

                    carryCopy[payload.section][payload.subSection][payload.indexes.type][payload.key] = payload.value

                } else if (payload.indexes.yearIndex !== null && payload.indexes.accountIndex === null) {


                    carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex][payload.key] = payload.value

                } else {
                    // carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex].balances[payload.indexes.balanceIndex][payload.key] = payload.value

                }

            } else if (payload.key === 'total') {

                if (payload.indexes.yearIndex !== null && payload.indexes.accountIndex === null) {

                    if (!isNaN(payload.value) && payload.value !== '') {
                        carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex][payload.key].current = parseFloat(payload.value)
                        carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex][payload.key].isError = false
                        if (carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex][payload.key].current === carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex][payload.key].previous) {
                            carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex][payload.key].unsaved_changes = false
                        } else {
                            carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex][payload.key].unsaved_changes = true
                        }
                    } else {
                        if (payload.value === '') {
                            carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex][payload.key].current = 0
                        } else {
                            carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex][payload.key].isError = true
                        }
                    }
                }


            } else if (payload.key === 'include') {



                carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex].balances[payload.indexes.accountIndex][payload.key] = payload.value

            } else if (payload.key === 'overrideValue') {


                if (!isNaN(payload.value) && payload.value !== '') {
                    carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex].balances[payload.indexes.balanceIndex][payload.key].current = payload.value
                    carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex].balances[payload.indexes.balanceIndex][payload.key].isError = false
                    if (carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex].balances[payload.indexes.balanceIndex][payload.key].current === carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex].balances[payload.indexes.balanceIndex][payload.key].previous) {
                        carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex].balances[payload.indexes.balanceIndex][payload.key].unsaved_changes = false
                    } else {
                        carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex].balances[payload.indexes.balanceIndex][payload.key].unsaved_changes = true
                    }
                } else {
                    if (payload.value === '') {
                        carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex].balances[payload.indexes.balanceIndex][payload.key].current = 0
                    } else {
                        carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex].balances[payload.indexes.balanceIndex][payload.key].isError = true
                    }
                }
            } else if (payload.key === 'total-accounts') {
                carryCopy[payload.section][payload.subSection][payload.indexes.type].years[payload.indexes.yearIndex]['total'].current = parseFloat(payload.value)
            } else if (payload.key === 'total-section') {
                carryCopy[payload.section][payload.subSection][payload.indexes.type]['total'].current = parseFloat(payload.value)
            } else if (payload.key === 'total-type') {

                carryCopy[payload.section][payload.subSection]['total'] = parseFloat(payload.value)
            }

        } else if (payload.subSection === 'blockers') {


            if (payload.key === 'editable' || payload.key === 'isOpen') {


                if (payload.indexes.blockerIndex !== null && payload.indexes.yearIndex === null) {
                    console.log('blockers', payload)
                    console.log('blockers', carryCopy[payload.section][payload.subSection])
                    carryCopy[payload.section].blockers[payload.subSection][payload.indexes.blockerIndex][payload.key] = payload.value

                } else if (payload.indexes.blockerIndex !== null && payload.indexes.yearIndex !== null) {
                    console.log('B4', carryCopy[payload.section][payload.subSection][payload.indexes.type])
                    carryCopy[payload.section].blockers[payload.subSection][payload.indexes.blockerIndex].years[payload.indexes.yearIndex][payload.key] = payload.value
                }


            } else if (payload.key === 'total') {

                if (!isNaN(payload.value) && payload.value !== '') {

                    carryCopy[payload.section][payload.subSection][payload.indexes.type][payload.indexes.yearIndex][payload.key].current = payload.value
                    carryCopy[payload.section][payload.subSection][payload.indexes.type][payload.indexes.yearIndex][payload.key].isError = false

                    if (carryCopy[payload.section][payload.subSection][payload.indexes.type][payload.indexes.yearIndex][payload.key].current === carryCopy[payload.section][payload.subSection][payload.indexes.type][payload.indexes.yearIndex][payload.key].previous) {
                        carryCopy[payload.section][payload.subSection][payload.indexes.type][payload.indexes.yearIndex][payload.key].unsaved_changes = false
                    } else {
                        carryCopy[payload.section][payload.subSection][payload.indexes.type][payload.indexes.yearIndex][payload.key].unsaved_changes = true
                    }

                } else {
                    if (payload.value === '') {

                        carryCopy[payload.section].blockers[payload.subSection][payload.indexes.yearIndex][payload.key].current = 0
                    } else {
                        carryCopy[payload.section].blockers[payload.subSection][payload.indexes.yearIndex][payload.key].isError = true
                    }

                }

            } else if (payload.key === 'include') {
                carryCopy[payload.section][payload.subSection][payload.subSection][payload.indexes.blockerIndex].years[payload.indexes.yearIndex].accounts[payload.indexes.accountIndex].include = payload.value
            } else if (payload.key === 'total-accounts') {

                carryCopy[payload.section][payload.subSection][payload.subSection][payload.indexes.blockerIndex].years[payload.indexes.yearIndex]['total'].current = parseFloat(payload.value)
            } else if (payload.key === 'total-section') {
                carryCopy[payload.section][payload.subSection][payload.subSection][payload.indexes.blockerIndex].total = parseFloat(payload.value)
            } else if (payload.key === 'total-blockers') {
                console.log('total-blockers!!!', carryCopy[payload.section][payload.subSection].total)
                carryCopy[payload.section][payload.subSection].total = parseFloat(payload.value)
            }

        } else if (payload.subSection === 'legacy_blockers') {

            console.log('LEgacy')

            if (payload.key === 'editable' || payload.key === 'isOpen') {

                carryCopy[payload.section].blockers[payload.subSection][payload.indexes.yearIndex][payload.key] = payload.value

            } else if (payload.key === 'total') {

                if (!isNaN(payload.value) && payload.value !== '') {

                    carryCopy[payload.section].blockers[payload.subSection][payload.indexes.yearIndex][payload.key].current = parseFloat(payload.value)
                    carryCopy[payload.section].blockers[payload.subSection][payload.indexes.yearIndex][payload.key].isError = false

                    if (carryCopy[payload.section].blockers[payload.subSection][payload.indexes.yearIndex][payload.key].current === carryCopy[payload.section].blockers[payload.subSection][payload.indexes.yearIndex][payload.key].previous) {
                        carryCopy[payload.section].blockers[payload.subSection][payload.indexes.yearIndex][payload.key].unsaved_changes = false
                    } else {
                        carryCopy[payload.section].blockers[payload.subSection][payload.indexes.yearIndex][payload.key].unsaved_changes = true
                    }

                } else {
                    if (payload.value === '') {

                        carryCopy[payload.section].blockers[payload.subSection][payload.indexes.yearIndex][payload.key].current = 0
                    } else {
                        carryCopy[payload.section].blockers[payload.subSection][payload.indexes.yearIndex][payload.key].isError = true
                    }

                }

            }

        } else if (['derivatives', 'htd_carry', 'master', 'other_income'].includes(payload.subSection) > -1) {

            if (payload.indexes.yearIndex === null && payload.key === 'total') {
                carryCopy[payload.section][payload.subSection][payload.key] = payload.value
            } else if (payload.key === 'editable' || payload.key === 'isOpen' || payload.key === 'include') {
                if (payload.indexes.yearIndex !== null && payload.indexes.accountIndex !== null) {
                    carryCopy[payload.section][payload.subSection].years[payload.indexes.yearIndex].accounts[payload.indexes.accountIndex][payload.key] = payload.value
                } else {
                    carryCopy[payload.section][payload.subSection].years[payload.indexes.yearIndex][payload.key] = payload.value
                }
            } else if (payload.key === 'total') {
                if (payload.indexes.accountIndex === null && payload.indexes.yearIndex !== null) {
                    if (!isNaN(payload.value) && payload.value !== '') {
                        carryCopy[payload.section][payload.subSection].years[payload.indexes.yearIndex][payload.key].current = parseFloat(payload.value)
                        carryCopy[payload.section][payload.subSection].years[payload.indexes.yearIndex][payload.key].isError = false
                        if (carryCopy[payload.section][payload.subSection].years[payload.indexes.yearIndex][payload.key].current === carryCopy[payload.section][payload.subSection].years[payload.indexes.yearIndex][payload.key].previous) {
                            carryCopy[payload.section][payload.subSection].years[payload.indexes.yearIndex][payload.key].unsaved_changes = false
                        } else {
                            carryCopy[payload.section][payload.subSection].years[payload.indexes.yearIndex][payload.key].unsaved_changes = true
                        }
                    } else {
                        if (payload.value === '') {
                            carryCopy[payload.section][payload.subSection].years[payload.indexes.yearIndex][payload.key].current = 0
                        } else {
                            carryCopy[payload.section][payload.subSection].years[payload.indexes.yearIndex][payload.key].isError = true
                        }
                    }
                }
            } else if (payload.key === "overrideValue") {
                if (payload.indexes.accountIndex !== null && payload.indexes.yearIndex !== null) {
                    carryCopy[payload.section][payload.subSection].years[payload.indexes.yearIndex].accounts[payload.indexes.accountIndex][payload.key].current = payload.value
                }
            } else if (payload.key === 'total-accounts') {
                carryCopy[payload.section][payload.subSection].years[payload.indexes.yearIndex]['total'].current = payload.value
            } else if (payload.key === 'reset') {

                carryCopy[payload.section][payload.subSection].years[payload.indexes.yearIndex].accounts[payload.indexes.accountIndex].overrideValue.current = ""
            }

        }

    } else if (payload.section === 'compare') {
        if (payload.key === 'editable') {
            carryCopy[payload.section]['client_value'][payload.key] = payload.value
        } else if (payload.key === 'difference') {
            carryCopy[payload.section][payload.key] = payload.value
        } else if (payload.key === 'client_value') {
            if (!isNaN(payload.value) && payload.value !== '') {
                carryCopy[payload.section][payload.key].current = parseFloat(payload.value)
                carryCopy[payload.section][payload.key].isError = false
                if (carryCopy[payload.section][payload.key].current === carryCopy[payload.section][payload.key].previous) {
                    carryCopy[payload.section][payload.key].unsaved_changes = false
                } else {
                    carryCopy[payload.section][payload.key].unsaved_changes = true
                }
            } else {
                if (payload.value === '') {
                    carryCopy[payload.section][payload.key].current = 0
                } else {
                    carryCopy[payload.section][payload.key].isError = true
                }
            }
        }
    }
    return carryCopy
}
