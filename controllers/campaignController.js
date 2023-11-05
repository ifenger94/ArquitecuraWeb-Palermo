import {
  tablaCampania,
  tablaAccion,
  tablaPersonaCampania,
  tablaPersona,
} from "../db/dbAppMemory.js";
import Campania from "../models/campania.js";
import { TIPO_CAMPANIA } from "../models/enums/appEnums.js";

const getAll = (req, res) => {
  res.json({ tablaCampania });
};

const get = (req, res) => {
  let id = parseInt(req.params.id);
  let idx = tablaCampania.findIndex((i) => i.id === id);

  if (idx === -1) {
    res.status(400).json({ message: "Campania no encontrada" });
  } else {
    res.json({ Person: tablaPersona[idx] });
  }
};

const add = (req, res) => {
  let campaniaId;

  let accionId = parseInt(req.params.id);
  let { nombre, tipo } = req.body;
  let responseContent = { err: false, message: "" };

  if (!tablaAccion.find((e) => e.id == accionId))
    responseContent.message = "La accion no existe";

  if (!nombre) responseContent.message = "Nombre es requerido";

  if (!tipo) {
    responseContent.message = "El tipo es requerida";
  } else {
    if (!Object.values(TIPO_CAMPANIA).includes(tipo)) {
      responseContent.message = "El tipo no existe";
    }
  }

  if (responseContent.message.length > 0) {
    responseContent.err = true;
  } else {
    campaniaId = tablaCampania.length + 1;
    tablaCampania.push(
      new Campania(campaniaId, nombre, tipo, accionId, new Date())
    );
  }

  if (responseContent.err) {
    res.status(400).json(responseContent.message);
  } else {
    res.setHeader("Location", `v1/api/campaigns/${campaniaId}`);
    res.status(201).json({});
  }
};

const addPersonCampaign = (req, res) => {
    let {id,idPerson} = req.params;
    let responseContent = { err: false, message: "", statusCode: 0 };
    
    if (!tablaCampania.find((e) => e.id == id))
    {
        responseContent.message = "La campaña no existe";
        responseContent.statusCode = 404;
    }

    if (!tablaPersona.find((e) => e.id == idPerson))
    {
        responseContent.message = "La Persona no existe";
        responseContent.statusCode = 404;
    }

    if (!tablaPersonaCampania.find((e) => e.idPersona == idPerson && e.idCampania == id))
    {
        responseContent.message = "La Persona ya esta vinculada a la campaña";
        responseContent.statusCode = 400;
    }

    if (responseContent.message.length > 0) {
        responseContent.err = true;
    } else {
        let idpersonCampaign = tablaPersonaCampania.length + 1;
        tablaPersonaCampania.push({idpersonCampaign,idPersona:idPerson,idCampania:id})
    }

    if (responseContent.err) {
        res
          .status(responseContent.statusCode)
          .json({ message: responseContent.message });
      } else {
        res.setHeader("Location", `v1/api/campaigns/${campaniaId}/persons/${idPerson}`);
        res.status(201).json({});
      }
}

const edit = (req, res) => {
  let id = parseInt(req.params.id);
  let { nombre, tipo } = req.body;
  let responseContent = { err: false, message: "", statusCode: 0 };

  let idx = tablaCampania.findIndex((task) => task.id === id);

  if (idx === -1) {
    responseContent.message = "Campania no encontrada";
    responseContent.statusCode = 404;
  } else {
    if (!nombre) {
      responseContent.message = "Nombre es requerido";
      responseContent.statusCode = 400;
    }
    if (!tipo) {
      responseContent.message = "El tipo es requerida";
      responseContent.statusCode = 400;
    } else {
      if (!Object.values(TIPO_CAMPANIA).includes(tipo)) {
        responseContent.message = "El tipo no existe";
        responseContent.statusCode = 400;
      }
    }
  }

  if (responseContent.message.length > 0) {
    responseContent.err = true;
  } else {
    tablaCampania[idx].nombre = nombre;
    tablaCampania[idx].tipo = tipo;
  }

  if (responseContent.err) {
    res
      .status(responseContent.statusCode)
      .json({ message: responseContent.message });
  } else {
    res.status(204).json({});
  }
};

const remove = (req, res) => {
  let id = parseInt(req.params.id);
  let responseContent = { err: false, message: "", statusCode: 0 };

  let idx = tablaCampania.findIndex((i) => i.id === id);

  if (idx === -1) {
    responseContent.message = "Campania no encontrada";
    responseContent.statusCode = 404;
  } else {
    if (tablaPersonaCampania.findIndex((i) => i.idCampania === id) != -1) {
      responseContent.message =
        "La campania posee personas vinculadas, no puede eliminarse";
      responseContent.statusCode = 400;
    }
  }

  if (responseContent.message.length > 0) {
    responseContent.err = true;
  } else {
    tablaCampania.splice(idx, 1);
  }

  if (responseContent.err) {
    res
      .status(responseContent.statusCode)
      .json({ message: responseContent.message });
  } else {
    res.status(204).json({});
  }
};


export default {
  add,
  addPersonCampaign,
  get,
  getAll,
  edit,
  remove
};
