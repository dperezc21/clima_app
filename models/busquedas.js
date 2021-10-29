require('dotenv').config();
const { default: axios } = require("axios");
const fs = require('fs');


class Busquedas{
    historial = [];
    ruta ='./historial.json';
    constructor(){
        //this.leerBD();
    }

    async clima(longitud, latitud){

        try {
            const request = axios.create({
                baseURL : `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    'lat':latitud,
                    'lon':longitud,
                    'appid':process.env.OPENWATHER_KEY,
                    units:'metric',
                    lang: 'es'
                }
            });
            const result = await request.get();
            
            return {
                
                pronostico : result.data.weather[0].description,
                temp : result.data.main.temp,
                temp_min: result.data.main.temp_min,
                temp_max: result.data.main.temp_max,

            }
        } catch (error) {
            return [];
        }

    }

    async ciudad(lugar =''){

        try {
            const request = axios.create({
                baseURL : `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: {
            'access_token': process.env.MAP_BOX_KEY,
            'limit':5,
            'lenguage':'es',
            
            }
            });
            const result = await request.get();
            return result.data.features.map( lugar =>({
                
                id: lugar.id,
                nombre: lugar.place_name,
                longitud: lugar.center[0],
                latitud: lugar.center[1]
            
        }));
        } catch (error) {
            return error;
        }
        
    }

    guardarBD(){
        if (this.historial) fs.writeFileSync(this.ruta, JSON.stringify(this.historial));
    }

    leerBD(){

        if (!fs.existsSync(this.ruta)) return;
        
        const datos = fs.readFileSync(this.ruta, {encoding:'utf-8'});
        
        this.historial = JSON.parse(datos);
        

    }

    agregarHistorial(lugar = ''){
        if(this.historial.includes(lugar.toLowerCase()) | this.historial.length == 5 ){
            return;
        } 

        this.historial.unshift(lugar.toLowerCase());
    }



}

module.exports =Busquedas;