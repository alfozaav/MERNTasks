//  Importar el servidor
const express = require('express');
const conectarDB = require('./config/db');

//  Crear el servidor/App
const app = express();

//  Conectar a la DB
conectarDB();

//  Habilitar espress.json para leer datos
app.use(express.json({ extended: true }));

//  Puerto de la App/Servidor
const PORT = process.env.PORT || 4000;


// //  Definir la página principal
// app.get('/', (req, res) => {
//     res.send('Hola Mundo')
// });

//  Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));

//  Arrancar la App/Servidor
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
})