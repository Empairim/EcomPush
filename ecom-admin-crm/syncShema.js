require('dotenv').config();
const fs = require('fs');

fs.cpSync(process.env.REACT_APP_ZOD_SCHEMA_DIR, './src/backendZodSchemas/', { recursive: true });
