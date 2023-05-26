import mongoose from "mongoose";

export async function establecerconexion(){
    try{
        await mongoose.connect(process.env.DATABASE)
        console.log("Exito conectandonos con la DB")

    }catch(error){
        console.log("Fallamos en la conexion a DB"+error)

    }
}