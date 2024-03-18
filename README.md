# 🍕 API de Pizzaria 🍕

Bem-vindo à documentação da API da Prosper Pizzaria! Esta API permite interações com usuários e pedidos de pizza. A seguir, são detalhadas instalação e configuração do servidor, as rotas disponíveis e os endpoints correspondentes.

## Instalação e Configuração do Servidor
## Configuração 🛠️ 

Antes de começar, você precisa configurar o ambiente:

1. **Instalação:**
   - Clone o repositório.
   - Instale as dependências usando `npm install`.

2. **Configuração do Banco de Dados:**
   - Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias. Você pode encontrar um exemplo de arquivo .env.example para referência.
   - Certifique-se de utilizar um banco de dados do tipo mySQL ou leia a documentação do Prisma ORM para adaptar ao banco de dados de sua preferência.
   ## Exemplo para usar um banco postgresql: Altere o provider dentro de `schema.prisma` e a variavel ambiente necessária será do tipo:
   `DATABASE_URL="postgresql://user:randompassword@localhost:5432/mydb?schema=public"`
      `datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }`
   - Execute as migrações do banco de dados usando `npx prisma migrate dev`.

4. **Inicialização do Servidor:**
   - Inicie o servidor com o comando `npm run dev`.
     
## Rotas 🔌

### 1. /user

Esta rota é responsável pela gestão de usuários da pizzaria.

#### Endpoints 🌐
  
- `GET /users/{id}`
  - Retorna as informações do usuário com o ID especificado.

- `POST /user/login`
  - Cria um novo usuário na pizzaria. Requer um corpo JSON com os detalhes do usuário.
`
{
  "user": "Nome do Usuário",
  "email": "exemplo@email.com",
  "password": "123456789",
}`

- `POST /users/logout`
  - Verifica se o usuario está logado caso esteja remove o cookie de autenticação.

### 2. /pizza

Esta rota é responsável pela gestão de pizzas da pizzaria. É uma rota bem simples

#### Endpoints 🌐

- `GET /pizza`
  - Retorna as informações de todas as pizzas disponíveis .
- `GET /pizza/{id}`
  - Retorna as informações da pizza com o ID especificado.


## Licença 📝

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
