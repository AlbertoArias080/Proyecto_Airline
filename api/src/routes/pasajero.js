const express = require("express");
const router = express.Router(); //manejador de rutas de express
const pasajeroSchema = require("../models/pasajero"); //Nuevo pasajero
const verifyToken = require("./validate_token");
const { verify } = require("jsonwebtoken");

//endpoint para Nuevo pasajero
router.post("/pasajero", verifyToken, (req, res) => {
  const pasajero = pasajeroSchema({
    pasaporte: req.body.pasaporte,
    documento: req.body.documento,
    nombre: req.body.nombre,
    fechaNac: new Date(req.body.fechaNac),
    reserva: new Date(req.body.reserva)
  });

  pasajero
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//endpoint para Consultar todos los animales
router.get("/pasajero", verifyToken, (req, res) => {
  pasajeroSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

//endopoint para Consultar un animal
router.get("/pasajero/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  pasajeroSchema
    .findOne({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

//endpoint para Modificar un animal usando el id
router.put("/pasajero/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { pasaporte, documento, nombre, fechaNac, reserva } = req.body;
  pasajeroSchema
    .updateOne(
      { _id: id },
      {
        $set: { pasaporte, documento, nombre, fechaNac, reserva },
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
router.delete("/pasajero/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  pasajeroSchema
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});
module.exports = router;
