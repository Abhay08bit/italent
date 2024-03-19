const initialState = {
    cart: [],
    showContactModal: false,
    showContactModalError: false,
    contactModalError: ""
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CART':
            return {
                ...state,
                cart: action.payload,
            };

        case 'SET_CONTACT_MODAL':
            return {
                ...state,
                showContactModal: action.payload,
            };
        case 'SET_CONTACT_MODAL_ERROR':
            return {
                ...state,
                showContactModalError: action.payload.length != 0,
                contactModalError: action.payload,
            };

        default:
            return state;
    }
};

export default cartReducer;