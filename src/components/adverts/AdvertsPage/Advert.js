import React from 'react';
import T from 'prop-types';

// import Photo from '../../common/Photo';
import './Advert.css';

const Advert = ({ name, sale, price, tags, photo }) => {
  return (
    <div className="carta">
      {photo ? (<dt> <img className="imagenDetalle" src={`${process.env.REACT_APP_API_BASE_URL}${photo}`} alt="detalle"></img> </dt>)
        : null}
      <dt>
        <b>
          <p>{name}</p>
        </b>
      </dt>
      <p> {price} €</p>
      {
        sale === true ?
          (<p> Venta </p>)
          : (<p> Compra </p>)
      }
      <p> Etiquetas: {tags.join(', ')}</p>
    </div >
  );
};

export const advertType = {
  name: T.string.isRequired,
  sale: T.bool.isRequired,
  price: T.number.isRequired,
  tags: T.array.isRequired,
};

Advert.propTypes = advertType;

export default Advert;
