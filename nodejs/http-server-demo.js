const http = require('http')
const url = require('url')

http.createServer((req,res)=>{
    // console.log(req.url)
    if(req.url !== '/favicon.ico'){
        console.log(url.parse(req.url,true).query)
    }
    res.writeHead( 200, {
        'Content-Type':"text/html;charset='utf-8'"
    })

    res.write(`
        <head>
            <meta charset="utf-8" />
        </head>
    `)
    res.write(`Hello NodeJS Server`)

    res.end()
}).listen(3000)