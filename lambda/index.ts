import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'


const app = new Hono();

app.get('/', (c) => c.json("Hello from Hono!"))

export const handler = handle(app)