import { tablaPersona, tablaCuenta } from "../db/dbAppMemory.js";

const getAll = (req, res) => {
  res.json({ accounts: tablaCuenta });
};

const get = (req, res) => {
  let id = parseInt(req.params.id);
  let idx = tablaCuenta.findIndex((i) => i.id === id);

  if (idx === -1) {
    res.status(404).json({ message: "Cuenta no encontrada" });
  } else {
    res.json({ accounts: tablaCuenta[idx] });
  }
};

const getAccountsByPerson = (req, res) => {
  let id = parseInt(req.params.id);
  let accounts = tablaCuenta.filter((i) => i.idPersona == id);

  if (accounts.length == 0) {
    res.status(404).json({ message: "Cuentas no encontradas" });
  } else {
    res.json({ accounts: accounts });
  }
};

const getAccountByPerson = (req, res) => {
  let idperson = parseInt(req.params.idperson);
  let idaccount = parseInt(req.params.idaccount);
  
  let accounts = tablaCuenta.filter(
    (i) => i.idPersona == idperson && i.id == idaccount
  );

  if (accounts.length == 0) {
    res.status(404).json({ message: "Cuenta no encontrada" });
  } else {
    res.json({ accounts: accounts });
  }
};

const remove = (req, res) => {
  let id = parseInt(req.params.id);
  let idx = tablaPersona.findIndex((i) => i.id === id);

  if (idx === -1) {
    res.status(404).json({ message: "Cuenta no encontrada" });
  } else {
    tablaPersona.splice(idx, 1);
    res.status(204).json({});
  }
};

export default {
    get,
    getAll,
    getAccountsByPerson,
    getAccountByPerson,
    remove
};
