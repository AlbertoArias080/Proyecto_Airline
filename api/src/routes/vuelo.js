const express = require("express");
const router = express.Router(); //manejador de rutas de express
const vueloSchema = require("../models/vuelo"); //Nuevo vuelo
const pasajeroSchema = require("../models/pasajero");
const tiqueteSchema = require("../models/tiquete");
const verifyToken = require("./validate_token");
const { verify } = require("jsonwebtoken");

//endpoint para Nuevo vuelo
router.post("/vuelo", (req, res) => {
  const { idVuelo, pasaporte, documento, nombre, fechaNac } = req.body;
  const vuelo = vueloSchema({
    numVuelo: req.body.usuario,
    origen: req.body.correo,
    destino: req.body.clave,
    fecha: new Date (req.body.fecha),
    cantPasajeros: req.body.cantPasajeros,
    valor: req.body.valor
  });

  const pasajero=pasajeroSchema({
    pasaporte: pasaporte,
    documento: documento,
    nombre: nombre,
    fechaNac: fechaNac
  })

  pasajero
  .save()
    .then((data) => {
      const tiquete=tiqueteSchema({
        numVuelo: idVuelo,
        pasajero: data._id,
        fechaReserva: new Date()
      })
      tiquete.save()
      .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    })
    .catch((error) => res.json({ message: error }));
});

//endpoint para Consultar todos los animales
router.get("/vuelo", verifyToken, (req, res) => {
  vueloSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

//endopoint para Consultar un animal
router.get("/vuelo/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  vueloSchema
    .findOne({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

//endpoint para Modificar un animal usando el id
router.put("/vuelo/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { numVuelo, origen, destino, fecha, cantPasajeros, valor } = req.body;
  vueloSchema
    .updateOne(
      { _id: id },
      {
        $set: { numVuelo, origen, destino, fecha, cantPasajeros, valor },
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

//endpoint para Eliminar un animal usando el id
router.delete("/vuelo/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  vueloSchema
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});
module.exports = router;
