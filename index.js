const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const routerApi = require('./routes');

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler.js');

const app = express();
const port = 3000;

app.use(express.json());

const whiteList= ['http://127.0.0.1:5500','http://myapp.com','http://localhost:3000'];
const options = {
  origin: (origin, callback) =>{
    if(whiteList.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors());

app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());

app.get('/',(req, res)=>{
  res.send('Hola mi server en express');
});

// app.get('/nueva-ruta',(req, res)=>{
//   res.send('Hola soy una nueva ruta');
// });

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log('Mi port ' + port);
});

