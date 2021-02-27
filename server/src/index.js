const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.route');
const handleError = require('./middlewares/handleError');
const parseUser = require('./middlewares/parseUser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(parseUser);

app.use('/api/auth', authRoutes);

app.use(handleError);

app.listen(5000, () => {
  console.log('server started');
});
