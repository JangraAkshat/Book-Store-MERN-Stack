const express = require('express')
const mongoose = require('mongoose')
const { PORT } = require('./config')
const booksRoute = require('./routes/bookRoutes')
const cors = require('cors')

const app = express()


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(express.json())
app.use('/books', booksRoute)


app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome To Library')
})

mongoose.connect('mongodb://localhost/bookstore')
    .then(() => {
        console.log('Connected to MongoDB...')
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`)
        })
    })
    .catch(err => console.error('Could not connect to MongoDB...', err))
