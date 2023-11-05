import {
  tablaCampania,
  tablaPersonaCampania,
  tablaPersona,
} from "../db/dbAppMemory.js";

const getPersonInCampaign = (req, res) => {
  try {
    let { id, idPerson } = req.params;
    let responseContent = { err: false, message: "", statusCode: 0 };

    let campaigns;
    let campaignPersonId;

    let idx = tablaCampania.findIndex((i) => i.id == id);

    if (idx == -1) {
      responseContent.message = "Campaña no encontrada";
      responseContent.statusCode = 404;
    } else {
      campaignPersonId = tablaPersonaCampania.findIndex(
        (i) => i.idCampania == id && i.idPersona == idPerson
      );
      if (campaignPersonId == -1) {
        responseContent.message = `La persona con id: ${idPerson} no es encuentra en la campaña`;
        responseContent.statusCode = 404;
      }
    }

    if (responseContent.message.length > 0) {
      responseContent.err = true;
    } else {
      campaigns = tablaCampania[idx];
      campaigns.person = tablaPersona.find(
        (i) => i.id == tablaPersonaCampania[campaignPersonId].idPersona
      );
    }

    if (responseContent.err) {
      res
        .status(responseContent.statusCode)
        .json({ message: responseContent.message });
    } else {
      res.status(200).json({ campaigns });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Se produjo un error al procesar la solicitud" });
  }
};

const getPersonsInCampaign = (req, res) => {
  try {
    let { id } = req.params;
    let responseContent = { err: false, message: "", statusCode: 0 };
    console.log(id);
    let idx = tablaCampania.findIndex((i) => i.id == id);
    let campaigns;

    if (idx == -1) {
      responseContent.message = "Campaña no encontrada";
      responseContent.statusCode = 404;
    }

    if (responseContent.message.length > 0) {
      responseContent.err = true;
    } else {
      campaigns = tablaCampania[idx];
      console.log(campaigns);
      let persons = tablaPersonaCampania
        .filter((i) => i.idCampania == id)
        .map((i) => i.idPersona);
      console.log(persons);
      campaigns.persons = tablaPersona.filter((e) => persons.includes(e.id));
    }

    if (responseContent.err) {
      res
        .status(responseContent.statusCode)
        .json({ message: responseContent.message });
    } else {
      res.status(200).json({ campaigns });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Se produjo un error al procesar la solicitud" });
  }
};

const removePersonInCampaign = (req, res) => {
  try {
    let { id, idperson } = req.params;
    let responseContent = { err: false, message: "", statusCode: 0 };
    let campaignPersonId;

    let idx = tablaCampania.findIndex((i) => i.id === id);

    if (idx === -1) {
      responseContent.message = "Campaña no encontrada";
      responseContent.statusCode = 404;
    } else {
      campaignPersonId = tablaPersonaCampania.findIndex(
        (i) => i.idCampania === id && i.idPersona == idperson
      );
      if (!campaignPersonId) {
        responseContent.message = `La persona con id: ${idperson} no es encuentra en la campaña`;
        responseContent.statusCode = 404;
      }
    }

    if (responseContent.err) {
      res
        .status(responseContent.statusCode)
        .json({ message: responseContent.message });
    } else {
      tablaPersonaCampania.splice(campaignPersonId, 1);
      res.status(204).json({});
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Se produjo un error al procesar la solicitud" });
  }
};

const addPersonCampaign = (req, res) => {
  try {
    let { id, idPerson } = req.params;
    let responseContent = { err: false, message: "", statusCode: 0 };

    if (!tablaCampania.find((e) => e.id == id)) {
      responseContent.message = "La campaña no existe";
      responseContent.statusCode = 404;
    }

    if (!tablaPersona.find((e) => e.id == idPerson)) {
      responseContent.message = "La Persona no existe";
      responseContent.statusCode = 404;
    }

    if (
      tablaPersonaCampania.find(
        (e) => e.idPersona == idPerson && e.idCampania == id
      )
    ) {
      responseContent.message = "La Persona ya esta vinculada a la campaña";
      responseContent.statusCode = 400;
    }

    if (responseContent.message.length > 0) {
      responseContent.err = true;
    } else {
      let idpersonCampaign = tablaPersonaCampania.length + 1;
      tablaPersonaCampania.push({
        idpersonCampaign,
        idPersona: idPerson,
        idCampania: id,
      });
    }

    if (responseContent.err) {
      res
        .status(responseContent.statusCode)
        .json({ message: responseContent.message });
    } else {
      res.setHeader("Location", `/api/v1/campaigns/${id}/persons/${idPerson}`);
      res.status(201).json({});
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Se produjo un error al procesar la solicitud" });
  }
};

export default {
  addPersonCampaign,
  removePersonInCampaign,
  getPersonInCampaign,
  getPersonsInCampaign,
};
