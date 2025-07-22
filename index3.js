import http from 'http';
import path from 'path';
import fs from 'fs'

const server = http.createServer((req,res)=>{
    if (req.url == '/') {
        fs.readFile('./box/index.html',(err,data)=>{
            if(err){
                console.log(err)
            }else{
                res.end(data)
            }
        })

    }else if(req.url == '/about'){
        fs.readFile('./box/about.html',(err,data)=>{
            if(err){
                console.log(err)
            }else{
                res.end(data)
            }
        })
    }
    
    
})

server.listen(3000)