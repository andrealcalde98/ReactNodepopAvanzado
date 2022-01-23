import { connect } from 'react-redux';
import { useState, useMemo, useEffect } from "react";
import Button from '../../common/Button';
import Layout from '../../layout/Layout';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { createAdvert, loadTags } from '../../../store/action';
import { getTags, getUi } from '../../../store/selectors';


import './NewAdvertsPage.css';

function NewAdvertsPage({ isLoading }) {
    const dispatch = useDispatch();
    const tags = useSelector(getTags)

    const [value, setValue] = useState({
        name: "",
        sale: "",
        price: "",
        tags: [],
        photo: null
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newAdvert = new FormData()
        newAdvert.append("name", value.name)
        newAdvert.append("sale", value.sale)
        newAdvert.append("price", value.price)
        newAdvert.append("tags", value.tags)
        if (value.photo) {
            newAdvert.append("photo", value.photo)
        }
        await dispatch(createAdvert(newAdvert));
    };

    const handleChange = event => {
        setValue(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const handleTags = (selectedOptions, event) => {
        let value = Array.from(
            selectedOptions,
            (option) => option.value
        );
        setValue((prevState) => ({
            ...prevState,
            [event.name]: value,
        }));
    };

    // no peritimos el envio submit hasta que este todo completo, menos la foto que no es requerida
    const elementDisabled = useMemo(
        () => isLoading || !value.name || !value.sale || value.price === null || value.tags.length < 1,
        [isLoading, value.name, value.sale, value.price, value.tags],
    );

    useEffect(() => {
        dispatch(loadTags())
    }, [dispatch]);

    // Tags to show in SELECT
    const options = tags.map((tags) => ({
        value: tags, label: tags
    }))

    return (
        <Layout title="Añade tu anuncio">
            <form className="formContainer" onSubmit={handleSubmit}>
                <div className="advertName">
                    <input name="name" value={value.name} type="text" placeholder="Introduce el nombre" onChange={handleChange} />
                </div>
                <div className="AdvertSale">
                    <label>Selecciona si es venta o compra </label>
                    <select name="sale" value={value.sale} onChange={handleChange}>
                        <option value="">--</option>
                        <option value="true">Venta</option>
                        <option value="false">Compra</option>
                    </select>
                </div>
                <div className="advertPrice">
                    <input name="price" type="number" min="0" value={value.price} placeholder="Introduce el precio" onChange={handleChange} />
                </div>
                <div className="tags">
                    <Select
                        name="tags"
                        placeholder="Selecciona una o más etiquetas"
                        isMulti
                        options={options}
                        onChange={handleTags}
                    >
                    </Select><br></br>
                </div>
                <div className="advertPhoto">
                    <input
                        name="photo"
                        type="file"
                        onChange={(e) => setValue(prevState => ({
                            ...prevState,
                            [e.target.name]: e.target.files[0]
                        }))}
                    /><br></br>
                    {/* <label>
                        <input name="photo" type="checkbox" value="on" onChange={handleChange} disabled />
                        Envía un valor vacío
                    </label> */}
                </div>
                <Button
                    type="submit"
                    disabled={elementDisabled}>
                    Crear Anuncio
                </Button>
            </form>
        </Layout >
    );
}

const mapStateToProps = state => {
    return getUi(state);
};

const ConnectedNewAdvertsPage = connect(
    mapStateToProps,
)(NewAdvertsPage);

export default ConnectedNewAdvertsPage;

