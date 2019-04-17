const http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html'})
    res.end('<h1>hellp world!</h1>')
}).listen(8080, () => {
    console.log('server success start : 8080')
})