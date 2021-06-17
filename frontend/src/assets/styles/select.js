
export const customStyles = {
    placeholder: styles => {
        return {
            ...styles,
            color: 'white'
        }
    },
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    singleValue: base => ({ ...base, color: 'white' }),
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
            cursor: isDisabled ? 'not-allowed' : 'default',
        };
    },
};


export const customStyles3 = {
    container: styles => {
        return {
            ...styles,
            width: '100%',
        }
    },
    control: (styles, state) => {

        let backgroundColor = 'white'

        if (state.selectProps.isError) {
            backgroundColor = 'crimson'
        } else if (state.selectProps.unsaved_changes) (
            backgroundColor = 'var(--waibe-blue-primary)'
        )

        return {
            ...styles,
            borderRadius: '.28571429rem',
            paddingBotton: 0,

            marginBotton: 0,
            backgroundColor: backgroundColor
        }
    },
    menu: base => ({
        ...base,
        borderRadius: 0,
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            color: isSelected ? 'var(--header-color)' : 'var(--header-color)',
            backgroundColor: isSelected ? 'var(--waibe-blue-primary)' : 'none',
            cursor: isDisabled ? 'not-allowed' : 'default',
        };
    },
};