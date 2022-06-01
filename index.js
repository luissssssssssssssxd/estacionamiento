const express = require('express');
require('dotenv').config();
const cors = require('cors');



const {dbConnection} = require('./database/config');
const morgan = require('morgan');


//Crear el servidor de express
const app = express();


//Configurar CORS
app.use(cors());

//Lectura y parseo del Body
app.use(express.json());

app.use(morgan("dev"));




//Base de datos
dbConnection();


///Rutas

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/login',require('./routes/auth'));


app.listen(process.env.PORT,()=>{
    console.log('App corriendo en puerto '+ process.env.PORT)
}) 