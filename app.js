const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');




// import routes here
const userRoutes = require('./src/controllers/Users/index');


// connect to database here 
mongoose.connect('mongodb+srv://ammarasc:' +
    process.env.MONGO_ATLAS_PW
    + '@offerdose-accounts.5gnkr.mongodb.net/offerDoseAccountsDB?retryWrites=true&w=majority'),
{
    useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", () => console.log("disconnected"));
db.once("open", () => console.log("Connected"));




app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requsted-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", 'GET,POST');
        return res.status(200).json({});
    }
    next();
});

// handling req for routes here
app.use('/user', userRoutes)



//  error handling here
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            massage: error.message
        }
    });
});

module.exports = app;