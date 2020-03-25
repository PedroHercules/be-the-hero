const express = require('express'); //importa as funcionalidades do express
const cors = require('cors');//Irá importar o CORS
const routes = require('./routes');// ./ referencia o arquivo dentro da pasta
const app = express();//instanciando a aplicação, esta aplicação é que vai conter todas as funcionalidades

app.use(cors());
app.use(express.json());//Antes de todas as requisições, para converter o json em um obj JS
app.use(routes);

app.listen(3333);//Quando acessar o localhost:3333, quero acessar a essa aplicação
