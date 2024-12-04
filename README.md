

## Descrição
Este projeto é uma API de autenticação construída com Node.js e TypeScript. Utiliza Express.js para o gerenciamento de rotas e MongoDB como banco de dados. O sistema permite o registro e login de usuários, com segurança garantida através de hashing de senhas e tokens JWT para autenticação.

## Estrutura do Projeto
- **src/controller**: Contém os controladores para lidar com as requisições de registro e login.
- **src/db**: Configuração da conexão com o banco de dados MongoDB.
- **src/middleware**: Middlewares, incluindo o tratamento de erros.
- **src/model**: Modelos de dados, como o modelo de usuário.
- **src/router**: Definição das rotas da API.
- **src/service**: Lógica de negócios, incluindo validação e autenticação de usuários.

## Dependências
- **express**: Framework para servidor web.
- **mongodb**: Driver para interagir com o MongoDB.
- **bcrypt**: Biblioteca para hashing de senhas.
- **jsonwebtoken**: Biblioteca para geração de tokens JWT.

## Scripts
- `npm start`: Inicia o servidor.


## Como Executar
1. Clone o repositório para sua máquina local.
2. Instale as dependências com `npm install`.
3. Inicie o servidor com `npm start`.
