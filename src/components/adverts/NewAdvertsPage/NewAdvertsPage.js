import { Redirect, useHistory } from "react-router";
import { useState, useMemo, useEffect } from "react";
import Button from '../../common/Button';
import Layout from '../../layout/Layout';
import { createAdvert, getTags } from "../service";

import './NewAdvertsPage.css';

function NewAdvertsPage() {
    const [tags, setTags] = useState([]);
    const history = useHistory();
    const [createdAdvertId, setCreatedAdvertId] = useState("");
    const [error, setError] = useState(null);
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
            console.log(error);
            setError(error);
            setIsLoading(false);
            if (error.status === 401) {
                return history.push("/login");
            }
        }
    };

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
                    <input name="name" type="text" placeholder="Introduce el nombre" onChange={handleChange} />
                </div>
                <div className="AdvertSale">
                    <label>Selecciona si es venta o compra </label>
                    <select name="sale" onChange={handleChange}>
                        <option value="">--</option>
                        <option value="true">Venta</option>
                        <option value="false">Compra</option>
                    </select>
                </div>
                <div className="advertPrice">
                    <input name="price" type="number" placeholder="Introduce el precio" onChange={handleChange} />
                </div>
                <div className="tags">
                    <label className="labelSelect" >Etiquetas: </label> <br></br>
                    <select name="tags" multiple onChange={handleChange}>
                        <option value="">--</option>
                        {tags.map((tags) => (
                            <option value={tags}>{tags}</option>
                        ))}
                    </select>
                </div>
                <div className="advertPhoto">
                    <input
                        name="photo" t
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
