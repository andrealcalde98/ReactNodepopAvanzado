import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slider, Box } from '@mui/material';
import Select from 'react-select';

import { getLatestAdverts, getTags } from '../service.js';
import Layout from '../../layout/Layout.js';
import Advert from './Advert';
import { marks } from './marks.js';
import { EmptyList } from './EmptyList'
import './Advert.css';

function AdvertsPage({ history, ...props }) {
    const [defaultAdverts, setAdverts] = useState([]);
    const [filteredAdverts, setFilteredAdverts] = useState(defaultAdverts);
    const [tags, setTags] = useState([]);

    // Default values (reset)
    const [defaultInputValue, setDefaultInputValue] = useState("");
    const [defaultRadioValue, setDefaultRadioValue] = useState({ false: false, true: false });
    const [defaultSliderValue, setDefaultSliderValue] = useState([1, 1000]);
    const [defaultSelectValue, setDefaultSelectValue] = useState([]);

    // set filters values
    const [filters, setFilters] = useState(
        { name: "", sale: "", price: [1, 1000], tags: [] });

    // set tags options
    const options = tags.map((tags) => ({
        value: tags, label: tags
    }))

    useEffect(() => {
        getLatestAdverts().then(adverts => { setAdverts(adverts); setFilteredAdverts(adverts) });
        getTags().then(tags => setTags(tags));
    }, []);

    const handleName = (event) => {
        setDefaultInputValue(event.target.value)
        let value = event.target.value.toLowerCase();
        setFilters((prevState) => ({
            ...prevState,
            [event.target.name]: value,
        }));
    }

    const handleSale = (event) => {
        setDefaultRadioValue(() => {
            return {
                true: false,
                false: false,
                [event.target.value]: true
            };
        });
        let value = event.target.value.toLowerCase();
        setFilters((prevState) => ({
            ...prevState,
            [event.target.name]: value,
        }));
    }

    const handleChangeSlider = (event, newValue) => {
        // change slider position
        setDefaultSliderValue(newValue);
        let value = event.target.value
        setFilters((prevState) => ({
            ...prevState,
            [event.target.name]: value,
        }));
    };

    const handleTags = (selectedOptions, event, e) => {
        setDefaultSelectValue(selectedOptions)
        let value = Array.from(selectedOptions, (option) =>
            option.value.toString()
        );
        setFilters((prevState) => ({
            ...prevState,
            [event.name]: value,
        }));
    };

    const handleSearch = (event) => {
        event.preventDefault();
        let result = null;
        result = defaultAdverts.filter((data) => {
            if (data.price > filters.price[0] && data.price < filters.price[1])
                return (
                    data.name.toLowerCase().search(filters.name) !== -1 &&
                    data.sale.toString().search(filters.sale) !== -1 &&
                    data.tags.toString().search(filters.tags) !== -1
                    // data.price.toString().search(filters.price)
                )
            else
                return null
        });
        setFilteredAdverts(result)
    }

    const handleReset = () => {
        setFilteredAdverts(defaultAdverts);
        // reset inputs
        setDefaultInputValue("")
        setDefaultRadioValue({ false: false, true: false })
        setDefaultSliderValue([1, 1000])
        setDefaultSelectValue(null)
        // reset filter state
        setFilters({ name: "", sale: "", price: [1, 1000], tags: [] })
    }

    return (
        <Layout title="Filtra tus anuncios..." {...props}>
            <form className="filtersform" onSubmit={handleSearch}>
                <div className="advertName">
                    <label>Filtra por nombre: </label>
                    <input name="name" value={defaultInputValue} type="text" placeholder="Introduce el nombre" onChange={handleName} />
                </div>
                <div className="AdvertSale">
                    <label>Selecciona si es compra o venta: </label>
                    <input type="radio" name="sale" id="r2" value="true" checked={defaultRadioValue.true} onChange={handleSale} /> Venta
                    <input type="radio" name="sale" id="r3" value="false" checked={defaultRadioValue.false} onChange={handleSale} /> Compra
                </div><br></br>
                <label>Selecciona un rango de precio:</label>
                <div className="AdvertPrice">º
                    <Box sx={{ width: 400 }}>
                        <Slider
                            name="price"
                            value={defaultSliderValue}
                            onChange={handleChangeSlider}
                            valueLabelDisplay="auto"
                            min={1}
                            max={1000}
                            marks={marks}
                            disableSwap
                        />
                    </Box>
                </div>
                <div className="tags">
                    <Select
                        className="AdvertTags"
                        name="tags"
                        placeholder="Selecciona una o más etiquetas"
                        isMulti
                        value={defaultSelectValue}
                        options={options}
                        onChange={handleTags}
                    >
                    </Select>
                    <br></br>
                </div>
                <button className="applySearch" type="submit">Aplicar filtros</button>
                <button className="resetFilters" onClick={handleReset}>Borrar filtros</button>
            </form>
            {
                filteredAdverts.length ? (
                    <div className="container">
                        {filteredAdverts.map(({ id, nombre, ...advert }) => (
                            <div key={nombre} >
                                <Link to={`/adverts/${id}`} style={{ textDecoration: 'none' }}>
                                    <Advert {...advert} />
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyList />
                )
            }
        </Layout >
    );
}

export default AdvertsPage;

