const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const artist = require('./routes/artist');
const song = require('./routes/song');
const user = require('./routes/user');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env'});
connectDB();

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(bodyParser.json());

app.use(logger);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/v1/song', song);
app.use('/api/v1/user', user);
app.use('/api/v1/artist', artist);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error is ${err.message}`);
    server.close(() => process.exit(1))
})
