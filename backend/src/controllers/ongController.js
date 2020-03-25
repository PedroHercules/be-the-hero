const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {//Exportar este método

    async index(request, response) {//Listar as ongs
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {//Irá inserir os dados na tabela ong
        const {name, email, whatsapp, city, uf} = request.body;//Acessa o body

        const id = crypto.randomBytes(4).toString('HEX');//Irá gerar 4 bytes de caracteres aleatórios e converter para string
        
        await connection('ongs').insert({//Depois de conectar, inserir os dados na tabela
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
    
        /**Como o INSERT pode demorar um pouco, precisa retornar o resultado da ong que foi criada só depois
         * de finalizar o INSERT, para isso definir a função que está sendo usada dentro da rota como
         * assincrona, utilizando o async antes da função, e colocar o await antes do INSERT, que vai
         * fazer o código aguardar enquanto finaliza para então retornar o JSON
        */
        
        return response.json({ id });//Retorna as informações em formato .json
    }
};