# GymPass style app

Uma aplicação de exemplo que simula funcionalidades básicas de um app de academia.

## Requisitos Funcionais (RFs)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário busca academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia.

## Regras de Negócio (RNs)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores.

## Requisitos Não Funcionais (RNFs)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token).

## Scripts
- `dev`: Roda a aplicação em modo de desenvolvimento.
- `start`: Roda a aplicação em produção, após ser compilada.
- `build`: Compila a aplicação.

## Como usar
1. Clone o repositório: `git clone https://github.com/natanaelvich/03-api-solid.git`
2. Instale as dependências: `npm install`
3. Inicie o servidor: `npm run dev`
4. Acesse `http://localhost:3000` para testar a API.
