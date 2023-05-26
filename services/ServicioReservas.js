import {modeloReserva} from "../models/modeloReserva.js";
export class ServicioReservas{

    constructor(){}

    async registrarReserva(datosReserva){
        let reservaNueva = new modeloReserva(datosReserva)
        return await reservaNueva.save()
    }

    async buscarTodasReservas(){
        let reservasConsultadas = await modeloReserva.find()
        return reservasConsultadas
    }

    async buscarReserva(idreserva){
        let reservaConsultada = await modeloReserva.findById(idreserva)
        return reservaConsultada
    }

    async editarReserva(idreserva,datosReserva){
        return await modeloReserva.findByIdAndUpdate(idreserva,datosReserva)
    }
    
    async eliminarReserva(idreserva){
        return await modeloReserva.findByIdAndDelete(idreserva)
    }
}