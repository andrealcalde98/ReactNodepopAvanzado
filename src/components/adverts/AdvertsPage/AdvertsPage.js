import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getLatestAdverts, getTags } from '../service.js';
import Button from '../../common/Button.js';
import Layout from '../../layout/Layout.js';
import Advert from './Advert';
import './Advert.css';

const EmptyList = () => (
    <div style={{ textAlign: 'center' }}>
        <p>Vaya, parece que esto esta vacío...</p>
        <Button as={Link} to="/adverts/new" variant="primary">
            Crear nuevo anuncio
        </Button>
    </div>
);

function AdvertsPage({ history, ...props }) {
    const [allAdverts, setAdverts] = useState([]);
    const [tags, setTags] = useState([]);
    const [filteredData, setFilteredData] = useState(allAdverts);



    useEffect(() => {
        getLatestAdverts().then(adverts => { setAdverts(adverts); setFilteredData(adverts) });
        getTags().then(tags => setTags(tags));
    }, []);

    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = {};
        console.log(value);
        // const nombre = allAdverts.map(function (name) {
        //     return name;
        // });
        // console.log(nombre)
        result = allAdverts.filter((data) => {
            return data.name.search('^' + value, 'i');
        });
        console.log(result)
        setFilteredData(result)
    }

    return (
        <Layout title="Filtra tus anuncios..." {...props}>
            {/* <form className="formContainer" onSubmit=""> */}
            <div className="advertName">
                <input name="name" type="text" placeholder="Introduce el nombre" onChange={(event) => handleSearch(event)} />
            </div>
            {/* <div className="AdvertSale">
                    <label>Selecciona si es venta o compra </label>
                    <select name="sale" onChange="">
                        <option value="">--</option>
                        <option value="true">Venta</option>
                        <option value="false">Compra</option>
                    </select>
                </div>
                <div className="advertPrice">
                    <input name="price" type="number" placeholder="Introduce el precio" onChange="" />
                </div>
                <div className="tags">
                    <label className="labelSelect" >Etiquetas: </label> <br></br>
                    <select name="tags" multiple onChange="">
                        <option value="">--</option>
                        {tags.map((tags) => (
                            <option value={tags}>{tags}</option>
                        ))}
                    </select>
                </div>
                <Button
                    type="submit"
                    disabled="">
                    Filtrar
                </Button> */}
            {/* </form> */}
            {allAdverts.length ? (
                <div className="container">
                    {filteredData.map(({ id, nombre, ...advert }) => (
                        <div key={nombre} >
                            <Link to={`/adverts/${id}`} style={{ textDecoration: 'none' }}>
                                <Advert {...advert} />
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyList />
            )}
        </Layout>
    );
}

export default AdvertsPage;

