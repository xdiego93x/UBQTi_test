const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var users = { method: 'GET',
  url: 'http://netzone.cl/bntf/api.users.prueba/skeleton/api/users',
  headers:
   { 'Postman-Token': '31bb760c-f1c0-4800-b729-99e19c31c8c1',
     'cache-control': 'no-cache',
     token: '%ca7b=E]bV?t_M8C(Q]qU{qzQTPJOX/%AoKVv3S`Z`"Uxh]uwBfnooPJ%DW9)]m' } };

var skills = { method: 'GET',
  url: 'http://netzone.cl/bntf/api.users.prueba/skeleton/api/skills',
  headers:
   { 'Postman-Token': '35500028-df5a-417d-9769-a295b6c7dd13',
     'cache-control': 'no-cache',
     token: '%ca7b=E]bV?t_M8C(Q]qU{qzQTPJOX/%AoKVv3S`Z`"Uxh]uwBfnooPJ%DW9)]m' } };

try {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.get('/user', function (req, res) {
        request(users, function (error, response, body) {
            if (error) throw new Error(error);
            res.send(body);
          });
    });

    app.get('/skill', function (req, res) {
      request(skills, function (error, response, body) {
          if (error) throw new Error(error);
          res.send(body);
        });
  });

    app.post('/imagen_perfil', function (req, res) {
      var id = req.body.id+'_photo';
      var imagen_perfil = { method: 'GET',
          url: 'http://netzone.cl/bntf/api.users.prueba/skeleton/api/image_perfil',
          headers:
          { 'Postman-Token': '211cbf5a-cc17-432c-834a-a858f15a6aa7',
        'cache-control': 'no-cache',
        iduser: id,
        token: '%ca7b=E]bV?t_M8C(Q]qU{qzQTPJOX/%AoKVv3S`Z`"Uxh]uwBfnooPJ%DW9)]m' } };

      request(imagen_perfil, function (error, response, body) {
        if (error) throw new Error(error);

        res.contentType('image/jpg');
        res.write(body, 'binary');
        //res.send(body);
      });
});

} catch (e) {
    console.log(e);
}

app.use(express.static(__dirname + '/'));

app.listen(3000);

console.log('Servidor http://localhost:3000');