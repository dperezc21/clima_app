require('colors');
const inquire = require('inquirer');

const pregunta = [
    {
        type:'list',
        name:'option',
        message:'¿Que desea hacer?',
        choices: [
            {
                value:1,
                name:`${'1.'.rainbow} Buscar Ciudad`
            },
            {
                value:2,
                name:`${'2.'.rainbow} Historial`
            },
            {
                value:0,
                name:`${'0.'.rainbow} Salir`
            }
        ]
    }
]


const menu = async()=>{
    console.clear();
    console.log('========================='.blue);
    console.log('  SELECCIONE UN OPCION'.red);
    console.log('========================='.blue);

    const result =await inquire.prompt(pregunta);
    return result.option;
    
}

const pausa = ()=>{
    const pregunta =[
        {
            type: 'input',
            name: 'enter',
            message: `Presiones ${ 'Enter'.green} para continuar.`,
        }
    ]

    const result = inquire.prompt(pregunta);
    return result;
}

const leerInput = async(message) =>{
    const question = [
        {
            type:'input',
            name:'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return "Por favor ingrese un valor";
                }
                return true;
            }
        }
    ];

    const input = await inquire.prompt(question);
    return input.desc; 
}

const listar = async(lugares) =>{

    const choices = lugares.map( (lugar, i) => {
        index = (i+1)+'.';
        return {
            value:lugar.id,
            name:`${index.blue} ${lugar.nombre}`
        };
    });

    choices.push({
        value:0,
        name: '0.'.blue +' cancelar'
    })

    const preguntas = [{
        type:'list',
        name:'id',
        message:'Selecciones el lugar',
        choices

        }]

    const {id} = await inquire.prompt(preguntas);
    return id;

}

module.exports = {
    menu,
    pausa,
    leerInput,
    listar
}