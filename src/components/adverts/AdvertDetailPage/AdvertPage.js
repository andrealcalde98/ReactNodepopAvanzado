import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Redirect, useLocation, useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Button from '../../common/Button';
import Layout from '../../layout/Layout';
import { getAdvert, deleteAdvert } from '../service';
import './AdvertPage.css';
import './Confirmation.css';


function AdvertPage() {
  const { advertId } = useParams();
  const [advert, setAdvert] = useState([]);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false)

  const history = useHistory();

  const location = useLocation();
  console.log(location);

  useEffect(() => {
    getAdvert(advertId).then(advert => setAdvert(advert)).catch(error => setError(error));
  }, [advertId]);

  const handleConfirmDelete = async (event) => {
    event.preventDefault();
    handleConfirmationBox();
    // const result = window.confirm("Estas seguro que quieres borrar?");
  };

  // Procedimiento para borrar el anuncio
  const handleDelete = async () => {
    if (confirmDelete === true) {
      try {
        await deleteAdvert(advertId);
        setIsLoading(false);
        const { from } = location.state || { from: { pathname: "/adverts" } };
        history.replace(from);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
  }

  const buttonDisabled = useMemo(
    () => isLoading
    [isLoading]
  );

  if (error?.status === 404) {
    return <Redirect to="/404" />;
  }

  // Nos permite mostrar y ocultar el cuadro de confirmación, también opacar el fondo.
  const handleConfirmationBox = () => {
    if (!confirmDelete) {
      document.querySelector(".confirm-bg").style.display = "flex"
      document.querySelector(".confirmation-box").style.display = "flex"
      setConfirmDelete(true)
    } else {
      document.querySelector(".confirm-bg").style.display = "none"
      document.querySelector(".confirmation-box").style.display = "none"
      setConfirmDelete(false)
    }
  }

  return (
    <Layout title={advert.name}>
      <div>
        <img className="photo" alt="advert" src={`${process.env.REACT_APP_API_BASE_URL}${advert.photo}`} />
      </div>
      <hr />
      <article className="data">
        <h2>{advert.price} €</h2>
        {advert.sale === true ?
          (<p> Venta </p>)
          : (<p> Compra </p>)}
        <div> Etiquetas: <br />
          {advert.tags}</div>
      </article>
      <Button className="delete-button" onClick={handleConfirmDelete}
        disabled={buttonDisabled}
        variant="delete"
        as={Link}
        to="/">
        Borrar
      </Button>

      <div className="confirmation-box">
        <div className="confirmation-text">
          Estas seguro que quieres borrar este anuncio?
        </div>
        <div className="button-container">
          <button
            className="cancel-button"
            onClick={handleConfirmationBox}>
            Cancelar
          </button>
          <button
            className="confirmation-button"
            onClick={handleDelete}>
            Borrar
          </button>
        </div>
      </div>
      <div
        className="confirm-bg"
      >
      </div>

    </Layout >

  );
}

export default AdvertPage;
