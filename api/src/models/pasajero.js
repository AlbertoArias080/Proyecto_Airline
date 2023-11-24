const mongoose = require("mongoose"); // importando el componente mogoose
const pasajeroSchema = mongoose.Schema({
  pasaporte: {
    type: String,
    required: true,
  },
  documento: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  fechaNac: {
    type: Date,
    requiered: true,
  }
});
module.exports = mongoose.model("Pasajero", pasajeroSchema);
