export const headerStyles = {
    singleValue: styles => {
        return {
            ...styles,
            color: 'white'
        }
    },
    placeholder: styles => {
        return {
            ...styles,
            color: 'white'
        }
    },
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    container: styles => {
        return {
            ...styles,
            width: '100%',
            marginBottom: 0,
            marginTop: 0,
            border: 'none',
            width: '100%',

        }
    },
    menu: base => ({
        ...base,
        backgroundColor: '#1b1c1d',

    }),
    control: (styles, state) => ({
        ...styles,
        height: 33,
        minHeight: 35,
        marginBottom: 0,
        backgroundColor: '#1b1c1d',
        cursor: 'pointer',
        marginTop: 0,
        zIndex: '100 !important',
        border: state.isFocused ? 0 : 0,
        // This line disable the blue border
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
            border: state.isFocused ? 0 : 0
        },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected, dateFormat }) => {
        return {
            ...styles,
            color: 'white',
            backgroundColor: isSelected ? 'var(--waibe-blue-primary)' : 'none',
            cursor: isDisabled ? 'not-allowed' : 'default',
        };
    },
};
export const headerStylesNarrow = {
    singleValue: styles => {
        return {
            ...styles,
            color: 'white'
        }
    },
    placeholder: styles => {
        return {
            ...styles,
            color: 'white'
        }
    },
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    container: styles => {
        return {
            ...styles,
            width: '100%',
            marginBottom: 0,
            marginTop: 0,
            border: 'none',
            width: '100%',
        }
    },
    menu: base => ({
        ...base,
        backgroundColor: '#1b1c1d',

    }),
    control: (styles, state) => ({
        ...styles,
        height: 33,
        minHeight: 35,
        marginBottom: 0,
        backgroundColor: '#1b1c1d',

        marginTop: 0,
        zIndex: '100 !important',
        border: state.isFocused ? 0 : 0,
        // This line disable the blue border
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
            border: state.isFocused ? 0 : 0
        },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected, dateFormat }) => {
        return {
            ...styles,
            color: 'white',
            backgroundColor: isSelected ? 'var(--waibe-blue-primary)' : 'none',
            cursor: isDisabled ? 'not-allowed' : 'default',
        };
    },
};


