// Imports
const express = require('express');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const expressConfig = require('./config/expressConfig.js');
const { PORT } = require('./constants.js');
const routes = require('./router.js');

// Local variables
const app = express();

// Configs
handlebarsConfig(app);
expressConfig(app);

// Routing
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
