const http = require('http')
const data = require('./config')
http.createServer((req,response)=>{
response.writeHead(200, {'content-type':'application\json'})
response.write(JSON.stringify(data) )
response.end()
}).listen(3000)


