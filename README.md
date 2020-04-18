# FastFeet

Desafio feito para o Bootcamp Go Stack da Rocketseat. É uma aplicação para gestão de pedidos de uma transportadora.

Para simplificar o envio, juntei todas as aplicações no repositório e separei por pastas (backend, frontend e mobile). Porem o ideal é fazer um repositório para a API (backend), outro para a pagina web (frontend) e outro para aplicação mobile.

<b>Backend</b>

Para rodar a aplicação (prompt precisa estar na pasta backend):

- Criar containers do Postgres e Redis:

```
docker run --name fastfeetdb -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
docker run --name fastfeetredis -p 6379:6379 -d redis
```

- Iniciar as bases:

```
docker start fastfeetdb fastfeetredis
```

- Executar as migrations para criar o banco: 

```
yarn sequelize db:migrate
```

- Executar a seed do usuário admin: 

```
yarn sequelize db:seed:all
```


- Executar aplicação(cada comando em um terminal):

```
yarn dev
yarn queue
```

<b>Frontend</b>

Para rodar a aplicação (prompt precisa estar na pasta frontend):

```
yarn
yarn start
```

<b>Mobile</b>

Para rodar a aplicação (prompt precisa estar na pasta mobile):
<b>A aplicação mobile foi desenvolvida somente no sistema iOS.

<b>IOS</b>
```
yarn
react-native run-ios --simulator="iPhone 11 Pro Max"
```
