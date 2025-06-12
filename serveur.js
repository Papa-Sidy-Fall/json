const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Configuration CORS pour permettre les requêtes depuis Vercel
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://votre-app-vercel.vercel.app', // Remplacez par votre URL Vercel
    /\.vercel\.app$/ // Permet tous les sous-domaines Vercel
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

server.use(cors(corsOptions));
server.use(middlewares);

// Route de santé
server.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API WhatsApp Clone is running' });
});

// Middleware personnalisé pour les requêtes
server.use(jsonServer.bodyParser);

// Routes personnalisées si nécessaire
server.use('/api', router);
server.use(router);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log(`API disponible sur http://localhost:${port}`);
});