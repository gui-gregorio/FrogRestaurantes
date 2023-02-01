import { FastifyInstance } from "fastify";
import { string, z } from 'zod'
import { encryptPass } from "./utils/encrypt";
import { prisma } from "./lib/prisma"



export async function appRoutes(app: FastifyInstance){
    app.get('/', async (req, res) => {
        return ({teste: "Hello World"})
    })

    app.get('/users', async(res) => {
        const usersList = await prisma.user.findMany()
        return usersList
    })

    app.post('/register', async(req, res) => {
        const userSchema = z.object({
            name: z.string(),
            cpf: z.string().min(14).max(15),
            email: z.string().email(),
            password: z.string()
        })
        var user = userSchema.parse(req.body)
        const encryptedPass = await encryptPass(user.password)
        const existingCpf = await prisma.user.findUnique({
            where: {
                    cpf: user.cpf
                }
        })
        const existingEmail = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        })
        if(existingEmail){
            res.statusCode = 409
            res.send("Email already exists")
        }
        if (existingCpf){
            res.statusCode = 409
            res.send("Cpf already exists")
        }
        const newUser = await prisma.user.create({
            data:{
                name: user.name,
                cpf: user.cpf,
                email: user.email,
                password: encryptedPass
            }
        })
        console.log(req.body)
        res.statusCode = 200
        res.send("User registrated with success")
    })
}
