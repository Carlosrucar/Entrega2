import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Base de datos simple
const datos = {
    grupos: [
        { id: "grupo1", valvulas: ["riego1", "riego2"] },
        { id: "grupo2", valvulas: ["riego1", "riego2"] },
        { id: "grupo3", valvulas: ["riego1", "riego2"] },
        { id: "grupo4", valvulas: ["riego1", "riego2"] },
        { id: "grupo5", valvulas: ["riego1", "riego2"] },
        { id: "grupo6", valvulas: ["riego1", "riego2"] }
    ],
    lista: []
};

// Rutas básicas
app.get('/', (req, res) => {
    res.send('Bienvenido a la REST API con Node.js y import!');
});

app.get('/api/items', (req, res) => {    
    res.json(datos.lista);
});

app.post('/api/items', (req, res) => {
    const nuevoItem = req.body;
    const itemExistente = datos.lista.find(item => item.name === nuevoItem.name);

    if (itemExistente) {
        itemExistente.state = nuevoItem.state;
        res.json(itemExistente);
    } else {
        nuevoItem.id = Date.now();
        datos.lista.push(nuevoItem);
        res.json(nuevoItem);
    }
});

app.get('/api/config', (req, res) => {
    res.json(datos.grupos);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});