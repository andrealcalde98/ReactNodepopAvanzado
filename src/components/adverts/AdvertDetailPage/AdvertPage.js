import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Redirect, useLocation, useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Button from '../../common/Button';
import Layout from '../../layout/Layout';
import { getAdvert, deleteAdvert } from '../service';
import './AdvertPage.css';
import Confirmation from './Confirmation';
import './Confirmation.css';


function AdvertPage() {
  const { advertId } = useParams();
  const [advert, setAdvert] = useState(null);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [display, setDisplay] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    getAdvert(advertId).then(advert => setAdvert(advert)).catch(error => setError(error));
  }, [advertId]);

  const handleConfirmDelete = async (event) => {
    event.preventDefault();
    setDisplay(true)
  };

  // Procedimiento para borrar el anuncio
  const handleDelete = async () => {
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

  const buttonDisabled = useMemo(
    () => isLoading
    [isLoading]
  );

  if (error?.status === 404) {
    return <Redirect to="/404" />;
  }

  return (
    <div>
      {advert &&
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
              {advert.tags.join(', ')}</div>
          </article>
          <Button className="delete-button" onClick={handleConfirmDelete}
            disabled={buttonDisabled}
            variant="delete"
            as={Link}
            to="/">
            Borrar
          </Button>

          {display && (
            <Confirmation onConfirm={handleDelete} onDisplay={setDisplay}>
              Estas seguro que quieres borrar este anuncio?
            </Confirmation>
          )}
        </Layout >}
    </div>
  );
}

export default AdvertPage;
