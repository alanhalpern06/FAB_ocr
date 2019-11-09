const path = require('path');
const express = require('express');
const upload = require('express-fileupload');
const _ = require('lodash');
const app = express();


const server = {}

server.run = run();
server.uploadFile = uploadFile();

function run(){

    app.listen(3030)
    app.get('/',(req,res) => {
        res.sendFile(path.join(__dirname,'index.html'));
    });
}

function uploadFile(){

    app.use(upload());
    app.post('/',function(req,res){

        if(req.files){
            var now = Date.now();
            var file = req.files.foo;
            if(Array.isArray(file) == true){
                _.forEach(_.keysIn(req.files.foo), (key) => {
                    let Singlefile = req.files.foo[key];
                    Singlefile.mv("./upload/."+now+Math.floor(Math.random() * 10)+".jpg",function(err){
                        if(err){
                            res.send('Ocorreu um erro no envio!');
                        }else{
                            res.send('Deu Certo');
                            //res.sendFile(path.join(__dirname,'index.html'));
                            //res.json({'MSG':'Enviado com Sucesso'});
                        }
                    });            
                }); 
            }else{
                    let Singlefile = req.files.foo;
                    Singlefile.mv("./upload/."+now+Math.floor(Math.random() * 10)+".jpg",function(err){
                        if(err){
                            res.send('Ocorreu um erro no envio!');
                        }else{
                            res.send('Deu certo');
                            //res.sendFile(path.join(__dirname,'index.html'));
                            //res.json({'MSG':'Enviado com Sucesso'});
                        }
                    });            
            }
        }
    });

}

