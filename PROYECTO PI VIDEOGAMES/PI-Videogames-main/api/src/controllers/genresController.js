const axios = require('axios');
const { Genres} = require('../db')

const getGenresAll =async()=>{
    let dbGenres = await Genres.findAll()
    if(!dbGenres || dbGenres.length === 0){
        const apiGenres = (await axios.get(`https://api.rawg.io/api/genres?key=bfb7270e0cce4ba0bf5f6667541c1c09`)).data.results;
        dbGenres = Genres.bulkCreate(apiGenres)
    }return dbGenres
};

module.exports={getGenresAll}