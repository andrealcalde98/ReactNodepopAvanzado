import React from 'react';

function Confirmation({ onConfirm, onDisplay, confirmation, ...props }) {

    const cancel = () => onDisplay(false);
    const confirm = () => onConfirm();


    return (
        <><div className="confirmation-box"
        >
            <div className="confirmation-text" {...props}>
            </div>
            <div className="button-container">
                <button
                    className="cancel-button"
                    onClick={cancel}>
                    Cancelar
                </button>
                <button
                    className="confirmation-button"
                    onClick={confirm}>
                    Borrar
                </button>
            </div>
        </div><div
            className="confirm-bg">
            </div></>
    )
}

export default Confirmation;
