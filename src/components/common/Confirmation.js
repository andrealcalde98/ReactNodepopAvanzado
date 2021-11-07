import './Confirmation.css';

function Confirmation() {

    return (
        <div class="confirmation">
            ¿Estas seguro que quieres continuar?
            <span className="close" >
                &times; </span>
            <button  >Si</button>
        </div>
    );
}

export default Confirmation;