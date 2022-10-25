// REFERENCIAS HTML
const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('#btnAtender')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')


// Leer params del navegador
const searchParams = new URLSearchParams(window.location.search)

// Le consulto con el .has si en el objeto existe tal palabra
if (!searchParams.has('escritorio')) {
    // Si no existe lo redirecciono al html principal
    window.location = 'index.html'
    throw new Error('Escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = escritorio

divAlerta.style.display = 'none'

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (ultimo) => {
    //lblNuevoTicket.innerText = 'Ticket ' + ultimo
})

btnAtender.addEventListener('click', () => {

    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => { //> Desestructuro lo que viene en el payload
        if (!ok) {
            lblTicket.innerText = 'Nadie'
            return divAlerta.style.display = ''
        }

        lblTicket.innerText = 'Ticket ' + ticket.numero
    })
    /* socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket
    }); */

});