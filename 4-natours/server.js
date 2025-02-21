const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
