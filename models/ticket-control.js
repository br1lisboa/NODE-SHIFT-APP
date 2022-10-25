//> Para poder construir el path donde voy a grabar
const path = require('path')
const fs = require('fs')

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimos4 = []

        this.init()
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    init() {
        const { hoy, tickets, ultimos4, ultimo } = require('../db/data.json')
        if (hoy === this.hoy) {
            this.tickets = tickets
            this.ultimo = ultimo
            this.ultimos4 = ultimos4
        } else {
            // es otro dia
            this.guardarDB()
        }
    }

    guardarDB() {
        const dbPath = path.join(__dirname, '../db/data.json')
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    siguiente() {
        this.ultimo += 1
        const ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket)

        this.guardarDB()
        return 'Ticket ' + this.ultimo
    }

    atenderTicket(escritorio) {
        // No tenemos tickets
        if (this.tickets.length === 0) {
            return null
        }

        const ticket = this.tickets[0] //> Extaigo el 1ro
        this.tickets.shift() //> Esto remueve el 1er elemento del arreglo y lo retorna

        ticket.escritorio = escritorio //> Le coloco el escri que recibo como argumento

        this.ultimos4.unshift(ticket) //> Lo agrega al final del arreglo

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1) //> Elimina la ultima posicion del arreglo
        }

        this.guardarDB()
        return ticket
    }

}

module.exports = TicketControl