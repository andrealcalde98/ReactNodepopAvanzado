import { Redirect, useHistory } from "react-router";
import { useState, useMemo, useEffect } from "react";
import Button from '../../common/Button';
import Layout from '../../layout/Layout';
import { createAdvert, getTags } from "../service";
import Select from 'react-select';

import './NewAdvertsPage.css';

function NewAdvertsPage() {
    const [tags, setTags] = useState([]);
    const history = useHistory();
    const [createdAdvertId, setCreatedAdvertId] = useState("");
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [value, setValue] = useState({
        name: "",
        sale: "",
        price: null,
        tags: [],
        photo: null
    });

    const handleChange = event => {
        setValue(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
        console.log(value)
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
        console.log(value)
    };

    // no peritimos el envio submit hasta que este todo completo, menos la foto que no es requerida
    const elementDisabled = useMemo(
        () => isLoading || !value.name || !value.sale || value.price === null || value.tags.length < 1,
        [isLoading, value.name, value.sale, value.price, value.tags],
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        console.log(value)
        try {
            setIsLoading(false);
            // añadimos los valores en un formData para poder enviar la foto correctament
            let newAdvert = new FormData()
            newAdvert.append("name", value.name)
            newAdvert.append("sale", value.sale)
            newAdvert.append("price", value.price)
            newAdvert.append("tags", value.tags)
            if (value.photo) {
                newAdvert.append("photo", value.photo)
            }
            const createdAdvert = await createAdvert(newAdvert);
            setCreatedAdvertId(createdAdvert.id);
        } catch (error) {
            setErrors(error);
            console.log(errors);
            setIsLoading(false);
            if (error.status === 401) {
                return history.push("/login");
            }
        }
    };

    // constante con las etiquetas a mostrar
    const options = tags.map((tags) => ({
        value: tags, label: tags
    }))

    useEffect(() => {
        getTags().then(tags => setTags(tags));
    }, []);

    if (createdAdvertId) {
        return <Redirect to={`/adverts/${createdAdvertId}`} />;
    }

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
                    {/* {tags.map((tags) => (
                        <label>{tags}</label>
                    ))} */}
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

export default NewAdvertsPage;
