//Listado de los servicios... cada servicio tiene un nombre (endpoint)
import * as dotenv from 'dotenv'
import {API} from './API.js'
dotenv.config()


let servidor = new API()

//1. despertamos la bestia
servidor.despertarServidor()