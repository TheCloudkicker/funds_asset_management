export const numberWithCommas = (num, round = 0) => {

    if (isNaN(num)) {
        return num
    }
    if (typeof num === 'string') {
        num = parseFloat(num)
    }

    let roundNum = num.toFixed(round)
    return roundNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

export const formatName = string => {

    let name = string.replace('_', ' ')

    return capitalizeFirstLetter(name)
}

export const formatNumAsString = num => {
    if (isNaN(num)) {
        return num
    } else if (num < 0) {
        return `$(${numberWithCommas(num * -1)})`
    } else {
        return `$${numberWithCommas(num)}`
    }
}
export const booleanOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
]
export const booleanOptions2 = [
    { value: 'Yes', text: 'Yes' },
    { value: 'No', text: 'No' },
]
export const renderPercent = decimal => {
    let num = decimal * 100
    return num.toFixed(2);
}
export const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const trimString = (string, no) => {
    return string.substring(0, no);
}

export const ownership_types = [
    { value: 'COMBINED', label: 'COMBINED' },
    { value: 'SHARED', label: 'SHARED' },
    { value: 'CONSOLIDATED', label: 'CONSOLIDATED' },
]


export const entityTypes = [
    { value: "Corporation", label: "Corporation" },
    { value: "Partnership (LP)", label: "Partnership (LP)" },
    { value: "Limited Liability Company (LLC)", label: "Limited Liability Company (LLC)" },
    { value: "Limited Liability Partnership (LLP)", label: "Limited Liability Partnership (LLP)" },
    { value: "Limited (Ltd)", label: "Limited (Ltd)" },
    { value: "SCSp", label: "SCSp" },
    { value: "GmbH", label: "GmbH" },
]
export const acctSystems = [
    { value: 'Investran', label: 'Investran' },
    { value: 'InvestAI', label: 'InvestAI' },
]
export const domicileLocations = [
    { value: "Delaware", label: "Delaware" },
    { value: "Cayman", label: "Cayman" },
    { value: "Scotland", label: "Scotland" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Mauritius", label: "Mauritius" },
]
export const dateFormatOptions = [
    { value: 1, label: 'mm/dd/yyyy' },
    { value: 2, label: 'dd/mm/yyyy' },
]

export const fsliTypeOptions = [
    { value: 'Asset', label: 'Asset' },
    { value: 'Liability', label: 'Liability' },
    { value: 'Equity', label: 'Equity' },
    { value: 'Income', label: 'Income' },
    { value: 'Expense', label: 'Expense' },
]

export const capitalTypes = [
    { value: 'Contribution', label: 'Contribution' },
    { value: 'Distribution', label: 'Distribution' },
]
export const capitalTypes2 = [
    { value: 'Contribution', text: 'Contribution' },
    { value: 'Distribution', text: 'Distribution' },
]


export const getPosition = element => {

    var xPosition = 0;
    var yPosition = 0;

    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
}


export const getDimensions = ref => {

    let dist = getPosition(ref.current)

    return {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
        left: dist.x,
        top: dist.y,
        finalHeight: window.innerHeight - 150,
        finalWidth: window.innerWidth - 550,
    }
}

export const getChildDimensions = childEl => {
    return new Promise(function (resolve, reject) {

        let dist = getPosition(childEl)

        resolve({
            width: childEl.offsetWidth,
            height: childEl.offsetHeight,
            left: dist.x,
            top: dist.y,
            finalHeight: window.innerHeight - 150,
            finalWidth: window.innerWidth - 550,
        })

    })

}

