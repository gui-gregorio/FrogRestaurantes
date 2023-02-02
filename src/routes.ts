import { FastifyInstance } from "fastify";
import { string, z, ZodSchema } from 'zod'
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
            password: z.string(),
            addresses: z.array(z.object({
                street: z.string(),
                city: z.string(),
                state: z.string(),
                zipCode: z.string()
            }))
        })
        // console.log(req.body)
        try{
            var user = userSchema.parse(req.body)

        } catch (error){
            res.statusCode = 400
            res.send({error: "Bad Request", message: error.message})
            return
        }
        
        console.log(user.addresses)
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
                password: encryptedPass,
                    address: {
                        create: user.addresses.map(address => ({
                            street: address.street,
                            city: address.city,
                            state: address.state,
                            zipCode: address.zipCode 
                        }))
                    }
                    
                
        }})
        console.log(user)
        res.statusCode = 200
        res.send("User registrated with success")
    })
}
