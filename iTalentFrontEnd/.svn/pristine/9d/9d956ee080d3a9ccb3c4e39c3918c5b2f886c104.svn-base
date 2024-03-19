import React, { useState } from 'react';
import Popup from './popup';
import { BsCart3 } from "react-icons/bs";

function FloatingButton() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="floating-button" onClick={togglePopup}>
                <BsCart3 style={{ fontSize: "30px" }} />
            </button>
            {isOpen && <Popup />}
        </div>
    );
}

export default FloatingButton;