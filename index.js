const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const farmAuthRoutes = require('./routes/farmAuth');
const farmAdminRoutes = require('./routes/farmAdmin');
const { fetchLocations } = require('./handlers/location');
const { geocode } = require('./handlers/maps');
const { submitFarm } = require('./handlers/farm');
const {
  loginRequired,
  authRequired,
  adminRequired,
} = require('./middleware/auth');

const PORT = process.env.PORT || 5000;

const app = express();
const router = express.Router();

// Middleware
app.use(cors());

app.use(bodyParser.json({ limit: '100mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 100000,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/user', loginRequired, adminRequired, userRoutes);
app.use('/api/loc', router.get('/fetch', fetchLocations));
app.use('/api/maps', loginRequired, router.post('/geocode', geocode));
app.use(
  '/api/farm/approval',
  loginRequired,
  router.post('/submit', submitFarm)
);
app.use('/api/farm/auth', loginRequired, authRequired, farmAuthRoutes);
app.use('/api/farm/admin', loginRequired, adminRequired, farmAdminRoutes);

app.use((req, res, next) => {
  let err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
