const path = require('path');

const envFilePath = path.join(__dirname, '..', '.env');

require('dotenv').config({ path: envFilePath });
