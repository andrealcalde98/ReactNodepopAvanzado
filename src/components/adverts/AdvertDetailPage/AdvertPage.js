import { connect } from 'react-redux';
import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';
import Layout from '../../layout/Layout';
import { getAdvert, getUi } from '../../../store/selectors';
import { deleteAdvert, loadAdvert } from '../../../store/action';
import './AdvertPage.css';
import Confirmation from './Confirmation';
import './Confirmation.css';


function AdvertPage({ advert, isLoading }) {
  const { advertId } = useParams();

  const [display, setDisplay] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdvert(advertId))
  }, [dispatch, advertId]);

  const handleConfirmDelete = async (event) => {
    event.preventDefault();
    setDisplay(true)
  };

  // Procedimiento para borrar el anuncio
  const handleDelete = async () => {
    await dispatch(deleteAdvert(advertId))
  }

  const buttonDisabled = useMemo(
    () => isLoading
    [isLoading]
  );

  return (
    <div>
      {advert &&
        <Layout title={advert.name}>
          <div>
            <img className="photo" alt="advert" src={advert.photo} />
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

const mapStateToProps = (state, ownProps) => {
  return {
    advert: getAdvert(state, ownProps.match.params.advertId),
    ...getUi(state),
  };
};

const connectedToStore = connect(mapStateToProps);


export default connectedToStore(AdvertPage);
