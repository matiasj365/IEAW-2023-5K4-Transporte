const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost:27017/IAEW-2023-5K4-Transporte`)
.then ( () => {console.log("Conectado")})
.catch((error => console.log(error)))

module.exports = mongoose

