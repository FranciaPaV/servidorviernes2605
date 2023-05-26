import express from "express"
import { ControladorHabitaciones } from "../controllers/ControladorHabitaciones.js"
import { ControladorReservas } from "../controllers/ControladorReservas.js"

let controladorHabitacion=new ControladorHabitaciones()
let controladorReserva=new ControladorReservas()

//para separar las rutas de la logica de negocio, utilizaré un metodo especial de EXPRESS: express.Router
export let rutas = express.Router()

rutas.post('/registrarhabitacion', controladorHabitacion.registrandoHabitacion)
rutas.get('/buscarhabitaciones',controladorHabitacion.buscandoTodasHabitaciones)
rutas.get('/buscarhabitacion/:idhabitacion',controladorHabitacion.buscandoUnaHabitacion) //"":id..." esto siginifica que es un dato variable
rutas.put('/actualizarhabitacion/:idhabitacion',controladorHabitacion.editandoHabitacion)
rutas.post('/registrarreserva',controladorReserva.registrandoReserva)
rutas.get('/buscarreservas', controladorReserva.buscandoTodasReservas)
rutas.get('/buscarreserva/:idreserva', controladorReserva.buscandoReserva)
rutas.put('/actualizarreserva/:idreserva', controladorReserva.actualizandoReserva)
rutas.delete('/eliminarreserva/:idreserva', controladorReserva.eliminandoReserva)