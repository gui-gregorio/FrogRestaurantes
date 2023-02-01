##API feita para estudos, simula uma API feita para ser utilizada por restaurante/lanchonete, utilizando NodeJS junto com Fastify, Bcrypt, Zod e Prisma.

O que está funcional:
    - Cadastro de clientes criptografando as senhas no BD
    - Retornar todos os usuários

Rotas:
    /register - Post (Cria um usuário no BD verificando se o CPF e o e-mail já são existentes no BD.)
    body:{
        "name": ,
        "cpf": ,
        "email": ,
        "password": ,
        "confirmpassword":
    }

    /users - Get (Retorna todos os usuários cadastrados)

Roadmap:
    - Possibilidade de cadastro de pedidos
    - Possibilidade de cadastro de produtos pelo restaurante
    - Envio ao restaurante quando um pedido for feito
    - Separar a aplicação em microserviços
    

Como rodar o projeto:
    - Clone o repositório
    - Dê npm install para instalar as dependências
    - Utilize o comando npm run dev