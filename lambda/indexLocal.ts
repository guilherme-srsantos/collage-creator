import { Hono } from 'hono'
import authData from './types/authData';
import { topTracksFilter } from './types/topTracksFilter';
import { LastFmService } from './handlers/lastfmService';

const app = new Hono();

console.log("inicializando")
const auth: authData = { APIKEY: process.env.APIKEY, SECRET: process.env.APIKEY } 

if(auth.APIKEY){
    console.log("achou a chave")
}

if (auth.SECRET) {
    console.log("achou o segredo")
}

const lastfmService = new LastFmService(auth)


app.get('/', (c) => c.json("Hello from Honodddd!"))

app.post('/topalbuns', async(c) => {
    const body:topTracksFilter = await c.req.json()

    const albuns = await lastfmService.getMostListenedAlbuns(body)

    return c.json(albuns.album)
})

export default app
