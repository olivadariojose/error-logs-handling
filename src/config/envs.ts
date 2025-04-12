import 'dotenv/config';
import * as joi from 'joi'

interface EnvVars{
    PORT: number
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
})
// ? ESTO NOS SIRVE PARA PERMITIR OTRAS VARIABLES DE ENTORNO QUE YA ESTAN CONFIGURADAS EN NODE POR DEFECTO
.unknown(true)


const {error, value} = envsSchema.validate(process.env)

if(error){
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
    port : envVars.PORT,
}

