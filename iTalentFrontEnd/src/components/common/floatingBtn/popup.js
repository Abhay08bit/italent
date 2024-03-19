import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart, setContactModal } from '../../../redux/actions/cartAction';
import { withRouter } from 'react-router-dom/cjs/react-router-dom';
function Popup() {
    const cart = useSelector(state => state.cart.cart);
    const contactModal = useSelector(state => state.cart.contactModal);
    const dispatch = useDispatch();

    let deleteItem = (obj) => {
        let x = cart.filter(item => item["E_mail"] !== obj["E_mail"])
        dispatch(setCart([...x]))
    }

    let setShowContactModal = () => {
        dispatch(setContactModal(true))
    }

    return (
        <div className="popup">
            <div>
                {cart.length > 0 ? cart.map((item, index) => (
                    <div key={index}>{item.Name}<button onClick={() => deleteItem(cart[index])}>Delete</button></div>

                )) : <div>No talents added!</div>}
            </div>
            <div>
                <button onClick={() => setShowContactModal()}
                    className="become_an_expert btn btn-primary btn-orange-color my-2 my-sm-0"
                    style={{ marginLeft: "10px" }}
                    type="button">Proceed to contact</button>
            </div>
            {/* {console.log(cart)} */}

        </div>
    )

}

export default withRouter(Popup);