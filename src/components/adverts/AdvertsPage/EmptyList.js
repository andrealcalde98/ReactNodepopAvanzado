import Button from '../../common/Button.js';
import { Link } from 'react-router-dom';

export const EmptyList = () => (
    <div style={{ textAlign: 'center' }}>
        <p>Vaya, parece que esto esta vacío...</p>
        <Button as={Link} to="/adverts/new" variant="primary">
            Crear nuevo anuncio
        </Button>
    </div>
);