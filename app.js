const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api', require('./routes/api.route'));
const upload = multer({
    dest: './upload/images',
})

app.post("/upload", upload.single('profile'), (req, res) => {
    console.log(req.file);
})
app.get('/', async(req, res, next) => {
    res.send({ message: 'Awesome it works' });
});
// app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`@http://localhost:${PORT}`));