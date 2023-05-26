import {ServicioReservas} from "../services/ServicioReservas.js" 
import {ServicioHabitaciones} from "../services/ServicioHabitaciones.js"
export class ControladorReservas{

    constructor(){}

    async registrandoReserva(peticion,respuesta){
        let datosReserva=peticion.body
        let servicioReserva = new ServicioReservas()
        let servicioHabitacion= new ServicioHabitaciones() //incluir busqueda de habitacion para validar que exista 
        //revisar que la haibitacion exista        
        try{
            let habitacion = await servicioHabitacion.buscarHabitacion(datosReserva.idHabitacion)
            if(habitacion){
                let fechaincial= new Date(datosReserva.fechaInicioReserva).getTime();
                let fechafinal=new Date (datosReserva.fechaFinalReserva).getTime();
                let restar=fechafinal-fechaincial;
                let diasreserva = Math.floor(restar/86400000); //24 hr/dia x 60 min/hr x 60 seg/min x 1000 ms/seg
                console.log(diasreserva);

                let costonoche = habitacion.precioNoche * diasreserva
                //validar que fecha inicial sea menor que fechafinal (if else)
                if (restar < 0){
                    respuesta.status(400).json({
                        "mensaje":"La fecha inicial no puede ser menor que la final"
                    })
                }else{
                    datosReserva.costo = costonoche
                    await servicioReserva.registrarReserva(datosReserva);
                    respuesta.status(200).json({
                        "mensaje": "Exito registrando la reserva"
                    });
               }
                //let costototal= (restar fechas)*cosotonoche
                //datosReserva.costo=costototal
                //await servicioReserva.registrarReserva(datosReserva)
            }else{
                respuesta.status(400).json({
                    "mensaje":"Fallamos la habitacion seleccionada no existe"
                })
            }
        }catch(errorPeticion){
            respuesta.status(400).json({
                "mensaje":"Fallamos Registrando la Reserva"+errorPeticion
            })
        }
        
       
    }
//3.5 habityacion existe
//4.5 claculo reserva y dias
//5 fecha inicial real

    async buscandoReserva(peticion,respuesta){
        let idreserva=peticion.params.idreserva
        let servicioReserva = new ServicioReservas()
        try{
            respuesta.status(200).json({
                "mensaje": "Exito buscando la reserva " + idreserva,
                "reserva":await servicioReserva.buscarReserva(idreserva)
            })
        }catch(errorPeticion){
            respuesta.status(400).json({
                "mensaje":"Fallamos buscando la reserva"+errorPeticion
            })
        }
    }

    async buscandoTodasReservas(peticion,respuesta){
        let servicioReserva = new ServicioReservas()
        try{
            respuesta.status(200).json({
                "mensaje": "Exito buscando las reservas",
                "reservas":await servicioReserva.buscarTodasReservas()

            })
        }catch(errorPeticion){
            respuesta.status(400).json({
                "mensaje":"Fallamos buscando todas las reservas"+errorPeticion
            })
        }
    }

    async actualizandoReserva(peticion,respuesta){
        let idreserva=peticion.params.idreserva
        let datosReserva=peticion.body
        let servicioReserva = new ServicioReservas()
        try{
            await servicioReserva.editarReserva(idreserva,datosReserva)
            respuesta.status(200).json({
                "mensaje": "Exito editando la reserva"
            })
        }catch(errorPeticion){
            respuesta.status(400).json({
                "mensaje":"Fallamos editando la reserva"+errorPeticion,
            })
        }
    }

    async eliminandoReserva(peticion,respuesta){
        let idreserva=peticion.params.idreserva
        //let datosReserva=peticion.body
        let servicioReserva = new ServicioReservas();
        
        try{
            await servicioReserva.eliminarReserva(idreserva)
            respuesta.status(200).json({
                "mensaje": "Exito eliminando la reserva"
            })
        }catch(errorPeticion){
            respuesta.status(400).json({
                "mensaje":"Fallamos eliminando la reserva"+errorPeticion,
            })
        }
    }
}