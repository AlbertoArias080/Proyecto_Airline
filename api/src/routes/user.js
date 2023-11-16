const express = require("express");
const router = express.Router(); //manejador de rutas de express
const userSchema = require("../models/user"); //Nuevo user
const verifyToken = require("./validate_token");
const { verify } = require("jsonwebtoken");

//endpoint para Nuevo user
router.post("/user", verifyToken, (req, res) => {
  const user = userSchema({
    usuario: req.body.usuario,
    correo: req.body.correo,
    clave: req.body.clave
  });

  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//endpoint para Consultar todos los animales
router.get("/user", verifyToken, (req, res) => {
  userSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

//endopoint para Consultar un animal
router.get("/user/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  userSchema
    .findOne({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

//endpoint para Modificar un animal usando el id
router.put("/user/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { usuario, correo, clave } = req.body;
  userSchema
    .updateOne(
      { _id: id },
      {
        $set: { usuario, correo, clave },
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
router.delete("/user/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  userSchema
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});
module.exports = router;
