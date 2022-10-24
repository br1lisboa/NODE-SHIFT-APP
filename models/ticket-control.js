//> Para poder construir el path donde voy a grabar
const path = require('path')
const fs = require('fs')

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

}

module.exports = TicketControl