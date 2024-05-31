const express = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { create } = require('domain');
const app = express();
const port = process.env.PORT || 3000;;


const pool = new Pool({
    host: 'localhost',
    database: 'node',
    password: '3363',
    port: 5432,
    user: 'postgres'
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('index');
});
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [];

function createUser(username, password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = { id: users.length + 1, username, password: hashedPassword };
    users.push(user);
    return user;
}

createUser('denis', '3363');

function getUser(username) {
    return users.find(user => user.username === username);
}

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
};  

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    const user = getUser(jwtPayload.username);
    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
}));

app.use(passport.initialize());

// app.post('/register', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password
//     const user = createUser(username, password);
//     console.log("User" + user);
//     res.json({ success: true, user });
// });

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = getUser(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
        return;
    }
    const token = jwt.sign({ username: user.username }, jwtOptions.secretOrKey);
    console.log("Login succes" + token);
    res.json({ success: true, token });
});

// app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.json({ success: true, message: 'Welcome to the protected route!' });
// });