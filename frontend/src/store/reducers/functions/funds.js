
export const updateFundDetails = (fundsState, payload) => {


    if (payload.key === 'editAll') {

        for (var i = 0; i < fundsState.fundObject.details.length; i++) {

            fundsState.fundObject.details[i].readOnly = payload.value
        }

        fundsState.isReadOnly = payload.value


    } else {

        const fundDetail = { ...fundsState.fundObject.details[payload.index] }


        if (fundDetail.formType === 'input' || fundDetail.formType === 'date' || fundDetail.formType === 'bool') {

            fundDetail.current = payload.value

            if (fundDetail.current === fundDetail.previous) {
                fundDetail.unsaved_changes = false
            } else {
                fundDetail.unsaved_changes = true
            }

        } else if (fundDetail.formType === 'select') {

            fundDetail.current = payload.value

            if (JSON.stringify(fundDetail.current) === JSON.stringify(fundDetail.previous)) {
                fundDetail.unsaved_changes = false
            } else {
                fundDetail.unsaved_changes = true
            }

        }

        fundsState.fundObject.details[payload.index] = fundDetail

    }








    return fundsState
}