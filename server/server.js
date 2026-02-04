const express = require('express');
const path = require('path');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

const app = express();
const port = 3000;

// Configurar o LiveReload
const liveReloadServer = livereload.createServer();
// Monitorar a pasta raiz do projeto (onde está o index.html e assets)
liveReloadServer.watch(path.join(__dirname, '../'));

// Middleware para injetar o script do livereload antes de servir o HTML
app.use(connectLiveReload());

// Servir arquivos estáticos (CSS, imagens, etc)
app.use(express.static(path.join(__dirname, '../')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Notificar o livereload quando o servidor reiniciar (útil para node --watch)
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
