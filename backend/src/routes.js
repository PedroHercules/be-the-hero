const express = require('express');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');


const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/ongs', ongController.index);//index está no arquivo ongController, dentro da pasta controllers
routes.post('/ongs', ongController.create);//create está no arquivo ongController, dentro da pasta controllers

routes.get('/profile', profileController.index);//listar casos especificos de uma ong

routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;//Exportar alguma variável de algum arquivo 
