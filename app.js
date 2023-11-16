var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

const { auth  } = require('express-oauth2-jwt-bearer');
require("dotenv").config();
var app = express();

app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



const jwtCheck = auth({
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_URL,
  tokenSigningAlg: 'RS256'
});


const handleJwtCheckError = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // Error de autenticación (código 401)
    return res.status(401).json({ error: 'Acceso no autorizado.' });
  }
  // Otros manejadores de errores
  next(err);
};

const routerTransportes = require ('./routes/transportes');
app.use('/api/transportes',jwtCheck,handleJwtCheckError, routerTransportes);

const routerReservas = require ('./routes/reservasTransportes');
app.use('/api/reservas-transporte',jwtCheck,handleJwtCheckError,routerReservas);

const routerClientes = require ('./routes/clienteReservas');
app.use('/api/clientes/',jwtCheck,handleJwtCheckError,routerClientes);





//swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IAEW-5K4-2023 API Grupo 3 Gestion de transporte",
      version: "1.0.0",
    },
    servers: [
     {  url:"http://localhost:5000" 
     }
    ]
    ,
    url: "/docs/swagger.json",
  },
  apis : [ `${path.join(__dirname,'./routes/*.js')}`]

}

const specs = swaggerJsdoc(swaggerSpec);

app.use("/docs", swaggerUI.serve);
app.get("/docs", swaggerUI.setup(null, {
    swaggerOptions: {
        url: "/docs/swagger.json",
    },
}));
app.get("/docs/swagger.json", (req, res) => res.json(specs));


// view engine setup


app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const PUERTO =  process.env.PORT || 5000;
app.listen(PUERTO, () =>
{
  console.log(`El servidor esta escuchando en el puerto ${PUERTO}`);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  
});





// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;
