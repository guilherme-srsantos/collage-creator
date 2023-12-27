import { Hono } from 'hono'
import  authData from './types/authData'
import { LambdaContext, LambdaEvent, handle } from 'hono/aws-lambda'

type Bindings = {
    event: LambdaEvent
    context: LambdaContext 
  }
  
const app = new Hono<{ Bindings: Bindings }>()
const auth: authData = { APIKEY: process.env.APIKEY, SECRET: process.env.APIKEY } 

if(auth.APIKEY){
    console.log("achou a chave")
}

if (auth.SECRET) {
    console.log("achou o segredo")
}
console.log("inicializando")

app.get('/', (c) => {
    return c.json("Hello from Hono!")

})

export const handler = handle(app)
