var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




var app = express();
app.use(express.json());


//Routes
const routerTransportes = require ('./routes/transportes');
app.use('/api/transportes',routerTransportes);

const routerReservas = require ('./routes/reservasTransportes');
app.use('/api/reservas-transporte',routerReservas);

const routerClientes = require ('./routes/clienteReservas');
app.use('/api/clientes/',routerClientes);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
