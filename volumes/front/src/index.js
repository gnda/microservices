// index.js

const express = require('express');
const fetch = require('node-fetch');
const app = express();

const inventory = 'http://inventory_back:8000/';
const product = inventory + 'products';

app.get('/', (req, res) => {
    res.send('Accueil')
})

app.get('/inventory', (req, res) => {
    fetch(inventory)
        .then(res => res.json())
        .then(json => {
            res.send(json)
        });
})

app.get('/products', (req, res) => {
    fetch(product)
        .then(res => res.json())
        .then(json => {
            res.send(json)
        });
})

app.listen(5000, () => console.log('Server is up and running'));