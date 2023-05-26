import {ServicioHabitaciones} from "../services/ServicioHabitaciones.js" 
export class ControladorHabitaciones{

    constructor(){}

    async registrandoHabitacion(peticion,respuesta){
        let datosHabitacion=peticion.body
        let servicioHabitacion = new ServicioHabitaciones()
        try{

            if(datosHabitacion.precioNoche<100 && datosHabitacion.cantidadmaxima<2){
                respuesta.status(400).json({
                    "mensaje":"Revisa el precio por noche y la cantidad maxima de personas ingresada"
                })
        
            }else if(datosHabitacion.precioNoche<100){
                respuesta.status(400).json({
                    "mensaje":"Revisa el precio por noche"
                })
       
            }else if(datosHabitacion.cantidadmaxima<2){
            respuesta.status(400).json({
                "mensaje":"Muy poca gente en esta habitacion"
                })
            }/*else if(Date.parse(fechaFinal)< Date.parse(fechaInicial)){
                respuesta.status(400).json({
                  mensaje:"La fecha de ingreso no puede ser menor a la de salida"
                })
            }*/
            else{
            await servicioHabitacion.registrarHabitacion(datosHabitacion)
            respuesta.status(200).json({
                "mensaje": "Exito registrando los datos"
                })
            }
            
            }catch(errorPeticion){
                respuesta.status(400).json({
                    "mensaje":"Fallamos registrando la habitacion"+errorPeticion
                })
            }
        }
    
    async buscandoUnaHabitacion(peticion,respuesta){
        let idhabitacion=peticion.params.idhabitacion
        let servicioHabitacion = new ServicioHabitaciones()
        try{
            respuesta.status(200).json({
                "mensaje": "Exito buscando los datos "+idhabitacion,
                "habitacion":await servicioHabitacion.buscarHabitacion(idhabitacion)
            })
        }catch(errorPeticion){
            respuesta.status(400).json({
                "mensaje":"Fallamos "+errorPeticion
            })
        }
    }
    
    async buscandoTodasHabitaciones(peticion,respuesta){
        let servicioHabitacion = new ServicioHabitaciones()
        try{
            respuesta.status(200).json({
                "mensaje": "Exito buscando las habitaciones",
                "habitaciones":await servicioHabitacion.buscarTodasHabitaciones()

            })
        }catch(errorPeticion){
            respuesta.status(400).json({
                "mensaje":"Fallamos "+errorPeticion
            })
        }
    }
   
    async editandoHabitacion(peticion,respuesta){
        let idhabitacion=peticion.params.idhabitacion
        let datosHabitacion=peticion.body
        let servicioHabitacion = new ServicioHabitaciones()
        try{
            await servicioHabitacion.editarHabitacion(idhabitacion,datosHabitacion)
            respuesta.status(200).json({
                "mensaje": "Exito editando la habitacion"
            })
        }catch(errorPeticion){
            respuesta.status(400).json({
                "mensaje":"Fallamos "+errorPeticion,
            })
        }
    }
}