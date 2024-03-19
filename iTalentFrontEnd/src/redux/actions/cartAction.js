export const SET_CART = 'SET_CART';
export const SET_CONTACT_MODAL = 'SET_CONTACT_MODAL'

export const setCart = (cart) => {
    return {
        type: SET_CART,
        payload: cart
    };
};

export const setContactModal = (contactModal) => {
    return {
        type: SET_CONTACT_MODAL,
        payload: contactModal
    };
};