import { tablaPersona, tablaCuenta, tablaAccion } from "../db/dbAppMemory.js";
import {
  TIPO_CAMPANIA,
  FRECUENCIA,
  TIPO_RESPUESTA,
  TIPO_ACCION,
} from "../models/enums/appEnums.js";
import Accion from "../models/accion.js";

const getAll = (req, res) => {
  res.json({ actions: tablaAccion });
};

const get = (req, res) => {
  let id = parseInt(req.params.id);
  let idx = tablaAccion.findIndex((i) => i.id === id);

  if (idx === -1) {
    res.status(404).json({ message: "Accion no encontrada" });
  } else {
    res.json({ actions: tablaAccion[idx] });
  }
};

const add = (req, res) => {
  let { nombre, tipo, tiposRespuestas, frecuencia } = req.body;
  let responseContent = { err: false, message: "" };
  let id;
  console.log(req.body);
  if (!nombre) {
    responseContent.message = "Nombre es requerido";
  }

  if (!tipo) {
    responseContent.message = "El tipo es requerida";
  } else {
    if (!Object.values(TIPO_ACCION).includes(tipo)) {
      responseContent.message = "El tipo no existe";
    }
  }

  if (!Array.isArray(tiposRespuestas)) {
    responseContent.message = "tiposRespuestas no es un array";
  } else {
    if (tiposRespuestas.length == 0 || tiposRespuestas.length > 3) {
      if (!Object.values(TIPO_RESPUESTA).includes(tiposRespuestas)) {
        responseContent.message = "El tipos de respuesta no existe";
      }
    }
  }

  if (!frecuencia) {
    responseContent.message = "La frecuencia es requerida";
  } else {
    if (!Object.values(FRECUENCIA).includes(frecuencia)) {
      responseContent.message = "La frecuencia no existe";
    }
  }

  if (responseContent.message.length > 0) {
    responseContent.err = true;
  } else {
    id = tablaAccion.length + 1;
    tablaAccion.push(
      new Accion(id, nombre, tipo, tiposRespuestas, frecuencia, new Date())
    );
  }

  if (responseContent.err) {
    res.status(400).json(responseContent.message);
  } else {
    res.setHeader("Location", `/api/actions/${id}`);
    res.status(201).json({});
  }
};

const remove = (req, res) => {
  let id = parseInt(req.params.id);
  let idx = tablaAccion.findIndex((i) => i.id === id);

  if (idx === -1) {
    res.status(404).json({ message: "Accion no encontrada" });
  } else {
    tablaAccion.splice(idx, 1);
    res.status(204).json({});
  }
};

export default {
  get,
  getAll,
  add,
  remove
};
