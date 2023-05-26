import express from "express"
import cors from "cors"
import {rutas} from "./routes/rutas.js"
import { establecerconexion } from "./dataBase/conexion.js"

export class API{
    
    constructor(){
        this.app = express()  //APP es express
        this.conectarBD()
        this.enrutarPeticiones()
    }
    despertarServidor(){
        this.app.listen(3000,()=> console.log("Servidor encendido..."))
    }
    enrutarPeticiones(){
        this.app.use(cors())
        this.app.use(express.json())  //habilitamos la recepcion de datos desde el body
        this.app.use('/', rutas) //habilitamos las rutas o endpoints
    }
    conectarBD(){
        establecerconexion()
    }
}