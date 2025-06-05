const path = require('path');
const fs = require('fs');
const jsonServer = require('json-server');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8000;

const persistentDbPath = path.join('/data', 'db.json');
const baseDbPath = path.join(__dirname, 'db.json');

// Se o db.json no /data não existir, copia o base para lá
if (!fs.existsSync(persistentDbPath)) {
  if (fs.existsSync(baseDbPath)) {
    fs.copyFileSync(baseDbPath, persistentDbPath);
    console.log('Arquivo base db.json copiado para /data');
  } else {
    console.error('Arquivo base db.json não encontrado na pasta do projeto!');
    process.exit(1);
  }
}

const router = jsonServer.router(persistentDbPath);

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server rodando na porta ${port}`);
});
