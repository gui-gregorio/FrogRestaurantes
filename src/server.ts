import Fastfy from 'fastify'
import { appRoutes } from './routes'

const app = Fastfy()

app.register(appRoutes)

app.listen({ port: 3000 }).then(() => {
    console.log('HTTP Server running')
})