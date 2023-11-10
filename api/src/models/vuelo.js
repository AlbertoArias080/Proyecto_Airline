const mongoose = require("mongoose"); // importando el componente mogoose
const vueloSchema = mongoose.Schema({
  numVuelo: {
    type: String,
    requiered: true,
  },
  origen: {
    type: String,
    required: true,
  },
  destino: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    requiered: true,
  },
  cantPasajeros: {
    type: Number,
    requiered: true,
  },
  valor: {
    type: Number,
    requiered: true,
  }
  
});
module.exports = mongoose.model("Vuelo", vueloSchema);