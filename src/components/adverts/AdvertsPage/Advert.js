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
      {
        sale === true ?
          (<dd> Venta </dd>)
          : (<dd> Compra </dd>)
      }
      <dd> {price} €</dd>
      <dd> Etiquetas: {tags}</dd>
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
