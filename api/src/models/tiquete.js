const mongoose = require("mongoose"); // importando el componente mogoose
const tiqueteSchema = mongoose.Schema({
  numVuelo: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'Vuelo',
    required: true,
  },
  pasajero: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'Pasajero',
    required: true,
  },
  numReserva: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("Tiquete", tiqueteSchema);