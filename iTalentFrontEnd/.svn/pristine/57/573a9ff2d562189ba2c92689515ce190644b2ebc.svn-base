const initialState = {
    email: ''
}

const detailsEmailReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload,
            };
        default:
            return state;
    }
};

export default detailsEmailReducer;