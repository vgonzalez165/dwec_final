import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import path from 'path'; 


// Para poder acceder a la variable __filename desde un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Clave para el JWT
const secret = 'This 1s the S3cr3T';

let users = [
    {
        username: 'alumno',
        pass: '1234',
        id: 'b3e172ab-906f-4540-8a30-bcd921e1cbac'
    },
    {
        username: 'victor',
        pass: '1234',
        id: '0241ef5c-8fb2-47a0-9e8c-e4e1caf30638'
    }
];
let groups = [
    {
    group: 'Rayden',
    category: 'Rap',
    concerts: [
        {
            place: 'Palacio de Congresos de León',
            date:1686592800000 ,
            lat: 42.59,
            lon: -5.58,
            tickets: 500,
            available_tickets: 500,
            id: "7c0713e7-e5aa-4d44-9007-e5dbd4f41422",
        },
        {
            place: 'Auditorio de León',
            date:1682015400000  ,
            lat: 42.60,
            lon: -5.57,
            tickets: 300,
            available_tickets: 300,
            id: "9a54c175-024e-4e93-ab43-a13d5c9ce990",
        },
        {
            place: 'Plaza Mayor de La Bañeza',
            date:1682015400000  ,
            lat: 42.29,
            lon: -5.90,
            tickets: 300,
            available_tickets: 300,
            id: "592110d4-0cc7-48b6-8933-6d999c14c7d9",
        },
    ],
    price: 4000,
    img:'raiden.jpg'
    },
    {
        group: 'Rapsuskley',
        category: 'Rap',
        concerts: [
            {
                place: 'Plaza Mayor de Astorga',
                date:1686592800000 ,
                lat: 42.45,
                lon: -6.09,
                tickets: 1000,
                available_tickets: 1000,
                id: "d17c1330-6838-4243-87a1-4d596654f57f",
            },
            {
                place: 'El Toralín',
                date:1682015400000  ,
                lat: 42.55,
                lon: -6.59,
                tickets: 300,
                available_tickets: 300,
                id: "50e31b57-2c43-4ab6-a0da-f14dcc0d6434",
            },
            {
                place: 'Plaza Mayor de Sahagún',
                date:1682015400000  ,
                lat: 42.37,
                lon: -5.02,
                tickets: 300,
                available_tickets: 300,
                id: "5f041785-4179-4db3-b53b-1fe03e8e5cc5",
            },
        ],
        price: 4000,
        img:'rapsus.jpg'
    },
    {
        group: 'SFDK',
        category: 'Rap',
        concerts: [
            {
                place: 'Plaza Mayor de La Bañeza',
                date:1686592800000 ,
                lat: 42.29,
                lon: -5.90,
                tickets: 1000,
                available_tickets: 1000,
                price: 4000,
                id: "f3c403eb-6291-41ef-b57a-2f7ed93d4b22",
            },
            {
                place: 'La Robla',
                date:1682015400000  ,
                lat: 42.80,
                lon: -5.62,
                tickets: 300,
                available_tickets: 300,
                price: 3500,
                id: "c14c1291-aecf-4744-a493-06cc92beef15",
            },
        ],
        price: 4000,
        img:'sfdk.jpg'
    },
    {
        group: 'Nach',
        category: 'Rap',
        concerts: [
            {
                place: 'Plaza Mayor de La Bañeza',
                date:1686592800000 ,
                lat: 42.29,
                lon: -5.90,
                tickets: 1000,
                available_tickets: 1000,
                price: 4000,
                id: "95e85988-76e1-47f8-b9dd-e19e75258969",
            },
            {
                place: 'La Robla',
                date:1682015400000  ,
                lat: 42.80,
                lon: -5.62,
                tickets: 300,
                available_tickets: 300,
                price: 3500,
                id: "f592e663-62c1-416e-a9b7-d0807d95ca21",
            },
        ],
        price: 4000,
        img:'nach.jpg'
    },
    {
        group: 'Extremoduro',
        category: 'Rock',
        concerts: [
            {
                place: 'Plaza Mayor de La Bañeza',
                date:1686592800000 ,
                lat: 42.29,
                lon: -5.90,
                tickets: 1000,
                available_tickets: 1000,
                price: 4000,
                id: "117da59a-9d3b-4213-afde-0bbe5f0fef46",
            },
            {
                place: 'La Robla',
                date:1682015400000  ,
                lat: 42.80,
                lon: -5.62,
                tickets: 300,
                available_tickets: 300,
                price: 3500,
                id: "520a9a9e-6eca-4631-82c8-bf3d92b460b2",
            },
        ],
        price: 4000,
        img:'extremoduro.jpg'
    },
    
];




// const {name, location, stars, services} = req.body;

// Servidor web Express
let app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors()); 

const PORT = 5000;
app.listen( PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
})

function generateAccessToken(username) {
    return jwt.sign(username, secret, { expiresIn: '86400s' }); // Caducidad de 1 día
  }




// *************************************************************************
// Páginas estáticas
// *************************************************************************

// Raíz. Muestra la página HTML
app.get("/", (req, res, next) => {
    res.sendFile( path.join(__dirname, './index.html') );
});


// *************************************************************************
// Funciones de la API
// *************************************************************************

// POST /api/user
app.post("/api/user", (req, res, next) => {
    // Estructura del JSON
    // {
    //     username: '',
    //     pass: '',
    // }
    // Estructura del JSON de vuelta:
    // {
    //     success: true|false,
    //     msg: '',     // ERROR: Mensaje del error
    //     id: ''       // ÉXITO: identificador asignado al usuario
    // }
    
    let {username, pass} = req.body;

    // ERROR: algún campo está vacío
    if (!( username && pass )) {
        res.status(400)     // Bad request
           .json( {
                success: false,
                msg: "Es obligatorio indicar nombre de usuario y contraseña",
           });
        return;
    }

    // ERROR: el usuario que ya existe
    if ( users.find( item => item.username == username )) {
        res.status(409)     // Conflict
           .json( {
                success: false,
                msg: "El nombre de usuario ya existe",
           })
        return;
    }

    // ÉXITO. Aquí la guardo en memoria
    const id = randomUUID();
    users.push({
        id,
        username,
        pass,   
        active: true
    })
    res.status(200)
       .json( {
            success: true,
            id,
            msg: "Se ha creado el usuario",
        } )
    }
)

// POST /api/login
app.post("/api/login", (req, res) => {
    const {username, pass} = req.body;
    let user = users.find( (item) => item.username?.toLowerCase() == username?.toLowerCase() && item.pass == pass);
    if ( user ) {
        const token = generateAccessToken({ username: req.body.username });
        res.status(200).json({
            success: true,
            username,
            id: user.id,
            token
        });
    } else {
        res
            .status(401)
            .json({
                success: 'false',
                msg: 'Credenciales no válidas o error en la consulta'
            })
    }
})

// GET /api/user
// Únicamente para pruebas
app.get('/api/user', (req, res) => {
    res.status(200).json(users);
})



function isValidToken(token, username) {
    try {
        const json = jwt.verify(token, secret);
        return (json.username == username);
    } catch (e) {
        return false;
    }
}


// GET /api/group
// Filtro por nombre de grupo y por categoría
app.get('/api/group', (req, res) => {

    let {username, name:groupName, category} = req.query;
    let token = req.headers.authorization;

    if ( !users.find( item => item.username == username) || !token ) {
        res.status(400)
           .json({msg: 'Error con el nombre de usuario o con el JWT'});
    } else if (!token) {
        res.status(400)
           .json({msg: 'Error al validar las credenciales'})
    } else if(!isValidToken(token, username)) {
        res.status(400)
           .json({msg: 'Error de comprobación del JWT'})
    } else {
        let filteredGroups = groups;
        if (groupName) {
            filteredGroups = filteredGroups.filter (item => item.group.toLowerCase().includes(groupName.toLowerCase()));
        };
        if (category) {
            filteredGroups = filteredGroups.filter (item => item.category.toLowerCase().includes(category.toLowerCase()))
        };
        res.status(200).json(filteredGroups.map( ({group, price, category, concerts, img}) => {
            return {
                group,
                price,
                category,
                concerts,
                img
            }
        }));
    }
})


// PUT /api/concert/:id/ticket/:number?username=XXXX
// Compra el número de entradas indicadas para el concierto
app.put('/api/concert/:id/ticket/:number', (req, res) => {

    const id = req.params.id;
    const number = req.params.number;
    const {username}=req.query;
    let token = req.headers.authorization;

    if (!token || !username) {
        res.status(400)
           .json({msg: 'Error al validar las credenciales'})
    } else if(!isValidToken(token, username)) {
        res.status(400)
           .json({msg: 'Error de comprobación del JWT'})
    } else {
        const group = groups.find( ({group, concerts}) => {
            return concerts.some( item => item.id == id );
        });

        if (!group || isNaN(number)) {
            res.status(400)
               .json({msg: 'No se encuentra el concierto o número de entradas no válido'})
        } else {
            const concert = group.concerts.find( item => item.id == id);
            
            console.log(group);
            res.status(200).json({
                group: group.group,
                concert: concert.place,
                tickets: number,
                localizador: parseInt(Math.random()*(36**6)).toString(36)
            })
        }
    }







    


})

