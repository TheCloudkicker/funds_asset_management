import { SET_TODAY, INITIALIZE_MONTHS, CHANGE_CALENDAR_MONTH } from '../actions/types.js';

const initialState = {
    today: null,
    months: {
        first: null,
        second: null
    }
};

export default function (state = initialState, action) {

    switch (action.type) {
        case SET_TODAY:
            return {
                ...state,
                today: action.payload,
            };
        case CHANGE_CALENDAR_MONTH:
            return {
                ...state,
                months: action.payload,
            };
        case INITIALIZE_MONTHS:
            return {
                ...state,
                months: action.payload
            }
        default:
            return state;
    }
}



//   const [calendarInfo, setCalendarInfo] = useState({
//     view: 'month',
//     today: null,
//     selectedYear: null,
//     selectedMonth: {
//       no: null,
//       name: ''
//     },
//     prevMonth: {
//       no: null,
//       name: ''
//     },
//     nextMonth: {
//       no: null,
//       name: ''
//     },
//     selectedDay: null,
//     headerString: '',
//     monthData: [],
//     daysInMonth: null,
//     activeTab: 'Calendar'
//   })