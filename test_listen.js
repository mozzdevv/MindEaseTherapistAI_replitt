
const net = require('net');
const server = net.createServer();
try {
  server.listen({
    port: 5001,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    console.log('Listening on 5001');
    server.close();
  });
} catch (e) {
  console.error(e);
}
