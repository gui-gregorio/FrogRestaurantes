import bcrypt from "bcrypt"

export async function encryptPass(pass:string) {
    const hash = await bcrypt.hash(pass, 10) 
    return hash
    
}


