import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import personController from "./controllers/personController.js";
import accountController from "./controllers/accountController.js";
import errorController from "./controllers/errorController.js";
import actionController from "./controllers/actionController.js";
import campaignController from "./controllers/campaignController.js";
import personCampaignController from "./controllers/personCampaignController.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Routes */

// Persons
app.get("/api/v1/persons", personController.getAll);
app.get("/api/v1/persons/:id", personController.get);
app.post("/api/v1/persons", personController.add);
app.put("/api/v1/persons/:id", personController.edit);
app.delete("/api/v1/persons/:id", personController.remove);

//Accounts
app.get("/api/v1/accounts", accountController.getAll);
app.get("/api/v1/accounts/:id", accountController.get);
app.get("/api/v1/persons/:id/accounts", accountController.getAccountsByPerson);
app.get("/api/v1/persons/:idperson/accounts/:idaccount", accountController.getAccountByPerson);
app.delete("/api/v1/accounts/:id", accountController.remove);

//Actions
app.get("/api/v1/actions", actionController.getAll);
app.get("/api/v1/actions/:id", actionController.get);
app.post("/api/v1/actions", actionController.add);
app.delete("/api/v1/actions", actionController.remove);

//Campaigns
app.get("/api/v1/campaigns", campaignController.getAll);
app.get("/api/v1/campaigns/:id", campaignController.get);
app.post("/api/v1/actions/:id/campaigns", campaignController.add);
app.delete("/api/v1/campaigns", campaignController.remove);

//Persona - Campaña
app.get("/api/v1/campaigns/:id/persons/:idPerson", personCampaignController.getPersonInCampaign);
app.get("/api/v1/campaigns/:id/persons", personCampaignController.getPersonsInCampaign);
app.post("/api/v1/campaigns/:id/persons/:idPerson", personCampaignController.addPersonCampaign);
app.delete("/api/v1/campaigns/:id/persons/:idperson", personCampaignController.removePersonInCampaign);


app.use(errorController.error404);

app.listen(port, () => {
  console.log(`La API está funcionando en http://localhost:${port}`);
});