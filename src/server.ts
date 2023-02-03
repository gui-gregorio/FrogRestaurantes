import Fastfy from 'fastify'
import { appRoutes } from './routes'
import cors from '@fastify/cors'
import fastify from 'fastify'

const app = Fastfy()
app.register(cors)

app.register(appRoutes)

app.listen({ port: 3000 }).then(() => {
    console.log('HTTP Server running')
})