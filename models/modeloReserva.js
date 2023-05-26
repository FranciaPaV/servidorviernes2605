import mongoose from "mongoose";
const Schema = mongoose.Schema;

//cosntruimos el esquema personalizando la informacion
const Reserva=new Schema({
    nombreCliente:{
        type:String,
        required:true
    },
   apellidoCliente:{
        type:String,
        required:true
    },
    telefonoCliente:{
        type:Number,
        required:true
    },
    fechaInicioReserva:{
        type:Date,
        required:true
    },
    fechaFinalReserva:{
        type:Date,
        required:true
    },
    numeroPersonas:{
        type:Number,
        required:true
    },
    nombreHabitacion:{
        type:String,
        required:true
    },
    idHabitacion:{
        type:String,
        required:true
    },
    costo:{
        type:Number,
        required:false
    },
})

export const modeloReserva=mongoose.model('reserva',Reserva)