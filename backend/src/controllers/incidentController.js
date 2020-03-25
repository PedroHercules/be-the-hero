const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const { page = 1} = request.query;
        const [count] = await connection('incidents').count();//Irá pegar a contagem total do casos

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page-1)*5)
            .select(['incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);//Irá retornar o total de itens ao cabeçalho de resposta
        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;//Irá pegar o ID da ong no cabeçalho, o mesmo nome que está no insomnia

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization; 

        const incident = await connection('incidents')
            .where('id',id)
            .select('ong_id')
            .first();
        
        if (incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted!!!' });//o 401 retorna acesso não autorizado, para mais codes pesquisar http status code
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
};