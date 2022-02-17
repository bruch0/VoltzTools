import './setup.js';
import app from './app.js';

app.listen(process.env.PORT);
console.log(`The server is running on port ${process.env.PORT}`)
