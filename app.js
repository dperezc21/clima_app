
require('dotenv').config();
const { menu, pausa, leerInput, listar } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() =>{
    let opt ="";
    const busquedas = new Busquedas();
    
    do {
        busquedas.leerBD();
        opt = await menu();
        switch (opt) {
            
            case 1:
                const lugar = await leerInput("Ciudad a buscar: ");
                const lugares = await busquedas.ciudad(lugar);
                const id = await listar(lugares);
                
                const lugarSeleccionado = lugares.find(l => l.id == id);
                if (!lugarSeleccionado) continue;
                busquedas.agregarHistorial(lugarSeleccionado.nombre);
                const {pronostico, temp, temp_min, temp_max}= await busquedas.clima(lugarSeleccionado.longitud,lugarSeleccionado.latitud);
                
                console.log("Informacion de la ciudad seleccionada.\n");
                console.log("Ciudad: "+lugarSeleccionado.nombre);
                console.log("Longitud: "+lugarSeleccionado.longitud);
                console.log("Latitud: "+lugarSeleccionado.latitud);
                console.log("Pronostico: "+pronostico);
                console.log("Temperatura: "+temp);
                console.log("Temperatura Minima: "+temp_min);
                console.log("Temperatura Maxima: "+temp_max);
                busquedas.guardarBD();
                break;
            case 2:
                busquedas.historial.forEach(lugar=>{
                    console.log(lugar);
                });
                break;
            case 0:
                
                break;
            
                
        
        }
        await pausa();
    } while (opt !== 0);
    

    

}

main();
//console.log(process.env.OPENWATHER_KEY);