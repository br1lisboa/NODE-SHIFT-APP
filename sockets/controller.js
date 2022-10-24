const TicketControl = require("../models/ticket-control");


const ticketControl = new TicketControl()

const socketController = (socket) => {

    socket.on('enviar-mensaje', ( payload, callback ) => {
        
        const id = 123456789;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload );

    })

}



module.exports = {
    socketController
}

