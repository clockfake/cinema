const http = require('http');
const app = require('./serverapp');

const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);
