import Persona from "../models/persona.js"
import Cuenta from "../models/cuenta.js"
import Campania from "../models/campania.js"
import Accion from "../models/accion.js"
import {TIPO_CAMPANIA,FRECUENCIA,TIPO_RESPUESTA,TIPO_ACCION} from "../models/enums/appEnums.js"

const tablaPersona = [
    new Persona(1, 'Juan', 'Pérez', 30, 500, 200),
    new Persona(2, 'María', 'Gómez', 25, 300, 150),
    new Persona(3, 'Pedro', 'Sánchez', 40, 800, 400),
    new Persona(4, 'Laura', 'Martínez', 35, 600, 300),
    new Persona(5, 'Carlos', 'López', 28, 450, 180),
    new Persona(6, 'Ana', 'Ramírez', 22, 250, 120),
    new Persona(7, 'Roberto', 'Díaz', 50, 1000, 500),
    new Persona(8, 'Carmen', 'Fernández', 42, 700, 350),
    new Persona(9, 'Miguel', 'García', 32, 550, 220),
    new Persona(10, 'Sofía', 'Hernández', 29, 400, 190),
];

const tablaCuenta = [
    new Cuenta(1, 'ES1234567890', 1000, 'ARS', new Date(), 1), // Cuenta de Juan Pérez
    new Cuenta(2, 'ES9876543210', 800, 'ARS', new Date(), 2),  // Cuenta de María Gómez
    new Cuenta(3, 'ES5555555555', 1200, 'ARS', new Date(), 3),  // Cuenta de Pedro Sánchez
    new Cuenta(4, 'ES1111111111', 950, 'ARS', new Date(), 4),  // Cuenta de Laura Martínez
    new Cuenta(5, 'ES9999999999', 1050, 'ARS', new Date(), 5),  // Cuenta de Carlos López
    new Cuenta(6, 'ES7777777777', 750, 'ARS', new Date(), 6),  // Cuenta de Ana Ramírez
    new Cuenta(7, 'ES2222222222', 2000, 'ARS', new Date(), 7),  // Cuenta de Roberto Díaz
    new Cuenta(8, 'ES8888888888', 1800, 'ARS', new Date(), 8),  // Cuenta de Carmen Fernández
    new Cuenta(9, 'ES4444444444', 1350, 'ARS', new Date(), 9),  // Cuenta de Miguel García
    new Cuenta(10, 'ES6666666666', 950, 'ARS', new Date(), 10), // Cuenta de Sofía Hernández
    new Cuenta(11, 'ES9876543211', 3000, 'ARS', new Date(), 1),  // Cuenta de María Gómez
];

const tablaCampania = [
    new Campania(1, "Campaña 1", TIPO_CAMPANIA.ONLINE, 1,new Date()),
    new Campania(2, "Campaña 2", TIPO_CAMPANIA.SMS, 2,new Date()),
    new Campania(3, "Campaña 3", TIPO_CAMPANIA.WHATSHAP, 3,new Date()),
    new Campania(4, "Campaña 4", TIPO_CAMPANIA.ONLINE, 4,new Date()),
    new Campania(5, "Campaña 5", TIPO_CAMPANIA.WHATSHAP, 5,new Date()),
    new Campania(6, "Campaña 6", TIPO_CAMPANIA.ONLINE, 6,new Date()),
    new Campania(7, "Campaña 7", TIPO_CAMPANIA.WHATSHAP, 7,new Date()),
    new Campania(8, "Campaña 8", TIPO_CAMPANIA.ONLINE, 8,new Date()),
    new Campania(9, "Campaña 9", TIPO_CAMPANIA.SMS, 9,new Date()),
    new Campania(10, "Campaña 10", TIPO_CAMPANIA.SMS, 10,new Date()),
    
]

const tablaAccion = [
  new Accion(1, "Accion 1", TIPO_ACCION.ANALASIS_FRAUDE, [TIPO_RESPUESTA.POSITIVA, TIPO_RESPUESTA.NEUTRAL,TIPO_RESPUESTA.NEGATIVA], FRECUENCIA.DIARIA,new Date()),
  new Accion(2, "Accion 2", TIPO_ACCION.LLAMADO_MANUAL, [TIPO_RESPUESTA.POSITIVA, TIPO_RESPUESTA.NEGATIVA], FRECUENCIA.SEMANAL,new Date()),
  new Accion(3, "Accion 3", TIPO_ACCION.BUSQUEDA_DE_DATOS, [TIPO_RESPUESTA.NEGATIVA,TIPO_RESPUESTA.POSITIVA], FRECUENCIA.MENSUAL,new Date()),
  new Accion(4, "Accion 4", TIPO_ACCION.ANALASIS_FRAUDE, [TIPO_RESPUESTA.POSITIVA,TIPO_RESPUESTA.NEGATIVA], FRECUENCIA.DIARIA,new Date()),
  new Accion(5, "Accion 5", TIPO_ACCION.ANALASIS_FRAUDE, [TIPO_RESPUESTA.NEUTRAL,TIPO_RESPUESTA.NEGATIVA], FRECUENCIA.SEMANAL,new Date()),
  new Accion(6, "Accion 6", TIPO_ACCION.LLAMADO_MANUAL, [TIPO_RESPUESTA.NEGATIVA,TIPO_RESPUESTA.POSITIVA], FRECUENCIA.MENSUAL,new Date()),
  new Accion(7, "Accion 7", TIPO_ACCION.BUSQUEDA_DE_DATOS, [TIPO_RESPUESTA.POSITIVA,TIPO_RESPUESTA.NEGATIVA], FRECUENCIA.DIARIA,new Date()),
  new Accion(8, "Accion 8", TIPO_ACCION.ANALASIS_FRAUDE, [TIPO_RESPUESTA.POSITIVA, TIPO_RESPUESTA.NEGATIVA], FRECUENCIA.SEMANAL,new Date()),
  new Accion(9, "Accion 9", TIPO_ACCION.ANALASIS_FRAUDE, [TIPO_RESPUESTA.NEUTRAL, TIPO_RESPUESTA.POSITIVA], FRECUENCIA.MENSUAL,new Date()),
  new Accion(10, "Accion 10", TIPO_ACCION.LLAMADO_MANUAL, [TIPO_RESPUESTA.NEUTRAL, TIPO_RESPUESTA.NEGATIVA], FRECUENCIA.DIARIA,new Date()),
]

const tablaPersonaCampania = [
    {id:1,idPersona:1,idCampania:1},
    {id:2,idPersona:1,idCampania:5},
    {id:3,idPersona:1,idCampania:9},
    {id:4,idPersona:2,idCampania:2},
    {id:5,idPersona:2,idCampania:1},
    {id:6,idPersona:2,idCampania:3},
    {id:7,idPersona:3,idCampania:9},
    {id:8,idPersona:3,idCampania:10},
    {id:9,idPersona:4,idCampania:8},
    {id:10,idPersona:4,idCampania:1},
]

export {
    tablaPersona,
    tablaCuenta,
    tablaCampania,
    tablaAccion,
    tablaPersonaCampania
}


