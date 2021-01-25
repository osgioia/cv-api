"use strict";

const express = require("express");
const curriculumRepository = require("./curriculumRepository");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 3001;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();

console.log(process.env.TELEGRAM_BOTID);

app.all("*", function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", function (req, res) {
  res.status(200).json({
    acciones: ["GET /curriculum", "POST /mensajes"],
    mensaje: "Bienvenido a la API del curriculum vitae de Osvaldo Gioia.",
  });
});

app.get("/curriculum", function (req, res) {
  res.send(curriculumRepository.getCurriculum());
});

app.post("/mensajes", function (req, res) {
  var mensaje = req.body.mensaje;
  res.json({ mensaje: "Gracias por su mensaje." });
  res.send(curriculumRepository.postMessage(mensaje));
});

app.listen(port, function () {
  console.log("Server running on port", port);
});
