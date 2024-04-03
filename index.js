const express = require('express');
const app = express();

// Data-Base
const productos = [
    { id: 0, nombre: 'Producto 1', precio: 10 },
    { id: 1, nombre: 'Producto 2', precio: 20 },
    { id: 2, nombre: 'Producto 3', precio: 30 }
];
const clientes = [
    { id: 0, nombre: 'Cliente 1', edad: 10 },
    { id: 1, nombre: 'Cliente 2', edad: 20 },
    { id: 2, nombre: 'Cliente 3', edad: 30 }
];


// HOME
app.get('/', (req, res) => {
    res.json({
        "message": "Bienvenido al WebSite de Productos y Clientes!"
    });
});


// CRUD - READ
app.get('/productos', (req, res) => {
    res.json(productos);
});

app.get('/clientes', (req, res) => {
    res.json(clientes);
});


// CRUD - CREATE
app.post('/productos', (req,res) => {
    let body= "", data;

    req.on("data", chunck => { body += chunck.toString(); });
    
    req.on("end", () => {
        try {
            data = JSON.parse(body);
        } catch (error) {
            res.json({
                "message": "Error - Procesamiento de los datos"
            });
        }

        productos.push(data);
        res.json(productos);
    });
})

app.post('/clientes', (req,res) => {
    let body= "", data;

    req.on("data", chunck => { body += chunck.toString(); });
    
    req.on("end", () => {
        try {
            data = JSON.parse(body);
        } catch (error) {
            res.json({
                "message": "Error - Procesamiento de los datos"
            });
        }

        clientes.push(data);
        res.json(clientes);
    });
})


// CRUD - UPDATE
app.put('/productos/upd/:id', (req,res) => {
    let body= "", data;

    req.on("data", chunck => { body += chunck.toString(); });
    
    req.on("end", () => {
        try {
            data = JSON.parse(body);
        } catch (error) {
            res.json({
                "message": "Error - Procesamiento de los datos",
                "addition": `${error}`
            });
        }

        productos[req.params.id] = data;
        res.json(productos);
    });
})

app.put('/clientes/upd/:id', (req,res) => {
    let body= "", data;

    req.on("data", chunck => { body += chunck.toString(); });
    
    req.on("end", () => {
        try {
            data = JSON.parse(body);
        } catch (error) {
            res.json({
                "message": "Error - Procesamiento de los datos",
                "addition": `${error}`
            });
        }

        clientes[req.params.id] = data;
        res.json(clientes);
    });
})


// CRUD - DELETE
app.delete('/productos/del/:id', (req,res) => {
    try {
        productos.splice(req.params.id,1);
        res.json(productos);
    } catch (error) {
        res.json({
            "message": "Error - Procesamiento de los datos",
            "addition": `${error}`
        });
    }
})

app.delete('/clientes/del/:id', (req,res) => {
    try {
        clientes.splice(req.params.id,1);
        res.json(clientes);
    } catch (error) {
        res.json({
            "message": "Error - Procesamiento de los datos",
            "addition": `${error}`
        });
    }
})


// PORT - LISTEN
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
