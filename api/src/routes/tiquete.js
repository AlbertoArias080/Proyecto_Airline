const express = require("express");
const router = express.Router(); //manejador de rutas de express
const tiqueteSchema = require("../models/tiquete"); //Nuevo tiquete
const verifyToken = require("./validate_token");
const { verify } = require("jsonwebtoken");

//endpoint para Nuevo tiquete
router.post("/tiquete", verifyToken, (req, res) => {
  const tiquete = tiqueteSchema({
    numVuelo: req.body.numVuelo,
    pasajero: req.body.pasajero,
    numReserva: req.body.numReserva
  });

  tiquete
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//endpoint para Consultar todos los animales
router.get("/tiquete", verifyToken, (req, res) => {
  tiqueteSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

//endopoint para Consultar un animal
router.get("/tiquete/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  tiqueteSchema
    .findOne({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

//endpoint para Modificar un animal usando el id
router.put("/tiquete/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { numVuelo, pasajero, numReserva } = req.body;
  tiqueteSchema
    .updateOne(
      { _id: id },
      {
        $set: { numVuelo, pasajero, numReserva },
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
router.delete("/tiquete/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  tiqueteSchema
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});
module.exports = router;
