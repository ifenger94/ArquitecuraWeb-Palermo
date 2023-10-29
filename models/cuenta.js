class Cuenta {
    constructor(id,numeroCuenta,balance,isocode,fechaAlta,idPersona) {
      this.id = id
      this.numeroCuenta = numeroCuenta
      this.balance = balance
      this.monedaIsoCode = isocode
      this.fechaAlta = fechaAlta
      this.idPersona = idPersona
    }
}

export default Cuenta;