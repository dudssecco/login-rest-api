require('dotenv').config()
const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./src/routes/routes');
const flashMessage = require('./src/middlewares/FlashMessages')

// Credencials
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const secret = process.env.SECRET;

// Config Body-Parser
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// Config View Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'src', 'views'));

// Config Express-Session
app.use(session({
    secret: secret, 
    resave: false,
    saveUninitialized: true
}));

// Config Connect-Flash
app.use(flash());
app.use(flashMessage.Messages);

// Use Archives Statics
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use(routes);

// Connection Database
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@studycluster.ksd9dvc.mongodb.net/?retryWrites=true&w=majority&appName=StudyCluster`)
.then(() => {
    app.listen(3000)
    console.log("Server is running on port 3000") 
})
.catch((err) => console.log(err))
