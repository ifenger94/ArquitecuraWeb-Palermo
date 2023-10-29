import { tablaPersona } from "../db/dbAppMemory.js";
import Persona from "../models/persona.js";

const getAll = (req, res) => {
  res.json({ tablaPersona });
};

const get = (req, res) => {
  let id = parseInt(req.params.id);
  let idx = tablaPersona.findIndex((i) => i.id === id);

  if (idx === -1) {
    res.status(404).json({ message: "Persona no encontrada" });
  } else {
    res.json({ Person: tablaPersona[idx] });
  }
};

const add = (req, res) => {
  let { nombre, apellido, edad } = req.body;
  let responseContent = { err: false, message: "" };
  let personId;

  if (!nombre) responseContent.message = "Nombre es requerido";
  if (!apellido) responseContent.message = "Apellido es requerido";
  if (!edad) responseContent.message = "Edad es requerido";

  if (responseContent.message.length > 0) {
    responseContent.err = true;
  } else {
    personId = tablaPersona.length + 1;
    tablaPersona.push(new Persona(personId, nombre, apellido, edad, 0, 0));
  }

  if (responseContent.err) {
    res.status(404).json(responseContent.message);
  } else {
    res.setHeader("Location", `/api/persons/${personId}`);
    res.status(201).json({});
  }
};

const edit = (req, res) => {
  let id = parseInt(req.params.id);
  let { nombre, apellido, edad } = req.body;
  let idx = tablaPersona.findIndex((task) => task.id === id);

  if (idx === -1) {
    res.status(404).json({ message: "Persona no encontrada" });
  } else {
    if (!nombre) res.status(400).json({ message: "Nombre es requerido" });
    else if (!apellido)
      res.status(400).json({ message: "Apellido es requerido" });
    else if (!edad) res.status(400).json({ message: "Edad es requerido" });
    else {
      tablaPersona[idx].apellido = nombre;
      tablaPersona[idx].nombre = apellido;
      tablaPersona[idx].edad = edad;
      res.status(204).json({});
    }
  }
};

const remove = (req, res) => {
  let id = parseInt(req.params.id);
  let idx = tablaPersona.findIndex((task) => task.id === id);

  if (idx === -1) {
    res.status(404).json({ message: "Persona no encontrada" });
  } else {
    tablaPersona.splice(idx, 1);
    res.status(204).json({});
  }
};

export default {
  add,
  get,
  getAll,
  edit,
  remove,
};
