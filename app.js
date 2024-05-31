const express = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const pool = require('./pool');
const transporter = require('./transporter');
const app = express();
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const XlsxPopulate = require('xlsx-populate');
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/auto', (req, res) => {
    res.render('auto', {message: 0});
});
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function createUser(firstname, lastname, patronymic, username, password, email, role) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = { username, password: hashedPassword };
    const query = 'INSERT INTO users (firstname, lastname, patronymic, username, password, email, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
    pool.execute(query, [firstname, lastname, patronymic, username, hashedPassword, email, role])
        .then(() => console.log('User created successfully'))
        .catch(err => console.error('Error creating user:', err));
    return user;
}


function getUser(username, callback) {
    const query = 'SELECT * FROM users WHERE username = ?';
    pool.execute(query, [username])
        .then(([rows]) => {
            if (rows.length === 0) {
                return callback(null, null);
            }
            const user = rows[0];
            return callback(null, user);
        })
        .catch(err => callback(err, null));
}

function generateCode(length) {
    let charset = "0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        code += charset[randomIndex];
    }
    return code;
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

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    getUser(username, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('auto', {message: "Ошибка сервера, попробуйте позже"});
        }
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.render('auto', {message: "Неправильный логин или пароль"});
        }
        jwt.sign({ username: user.username }, jwtOptions.secretOrKey);

        console.log("Login success");
        res.render('admin', {user: user});
    });
});

app.post('/drop', async (req, res) => {
    try{
        const { email } = req.body;
        const verificationCode = generateCode(4);
        await transporter.sendMail({
            from: "iponyatova57@mail.ru",
            to: email,
            subject: "Восстановление пароля",
            text: `Ваш код верификации: ${verificationCode}`
        });
        return res.render('code', {verificationCode: verificationCode, email: email, message: 0});
    }catch(error){
        res.status(500);
    }
});

app.post('/code', (req, res) => {
    try{
        const { firstNum, secondNum, thirdNum, fourthNum, email, verCode } = req.body;
        const codeString = firstNum.toString() + secondNum.toString() + thirdNum.toString() + fourthNum.toString();
        if(codeString === verCode.toString()){
            return res.render('confirm', {message: -1, email: email});
        }else{
            return res.render('code', {verificationCode: verCode, email: email, message: "Неправильный код"});
        }
    }catch(error){
        res.send("Error");
        console.log(error);
    }
});

app.post('/confirm', (req, res) => {
    try{
        const { password, passwordRepeat, email } = req.body;
        if(password === passwordRepeat){
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            const updateQuery = 'UPDATE users SET password = ? WHERE email = ?';
            pool.execute(updateQuery, [hashedPassword, email]);
            res.render('index');
        }else{
            return res.render('confirm', {message: 0, email: email});
        }
    }catch(error){
        res.send("Error");
    }
});

app.get('/createuser', (req, res) => {
    res.render('user');
});

app.post('/adduser', (req, res) => {
    const { username, password, email } = req.body;
    createUser(username.toString(), password.toString(), email.toString());
    res.render('index');
});

app.post('/service', async (req, res) => {
    try{
        const { lastname, firstname, patronymic, service, phone, email } = req.body;
        let datetime = new Date();
        let datetimeString = datetime.toLocaleString().slice(0,10) + " " + datetime.toLocaleString().slice(11,17);
        const query = 'INSERT INTO services (firstname, lastname, patronymic, service, phone, email, status, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        pool.execute(query, [firstname, lastname, patronymic, service, phone, email, 'Ожидание', datetimeString])
            .then(() => console.log('Service created successfully'))
            .catch(err => console.error('Error creating service:', err));
        await transporter.sendMail({
            from: "iponyatova57@mail.ru",
            to: email,
            subject: "Заявка с сайта изыскатель плюс",
            html: `
            <div style="padding: 10px; text-align: center; background-color: #4DA3FF; color:#fff; border-radius:15px;">
            <h1 style="font-size: 20px;"> Уважаемый (ая) ${lastname} ${firstname} ${patronymic}, ваша заявка на услугу "${service}" успешно принята. Ожидайте обратной связи! </h1>
            </div>
            `
        });
        return res.render('message', {message: "Ваша заявка успешно отправлена", code: 1});
    }catch(error){
        return res.render('message', {message: "Произошла ошибка. Повторите позже", code: 0});
    }
});

app.post('/consultation', async (req, res) => {
    try{
        const { lastname, firstname, patronymic, phone, email, message } = req.body;
        let datetime = new Date();
        let datetimeString = datetime.toLocaleString().slice(0,10) + " " + datetime.toLocaleString().slice(11,17);
        const query = 'INSERT INTO consultations (firstname, lastname, patronymic, phone, email, message, status, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        pool.execute(query, [firstname, lastname, patronymic, phone, email, message, 'Ожидание', datetimeString])
            .then(() => console.log('Service created successfully'))
            .catch(err => console.error('Error creating service:', err));
        await transporter.sendMail({
            from: "iponyatova57@mail.ru",
            to: email,
            subject: "Заявка с сайта изыскатель плюс",
            html: `
            <div style="padding: 10px; text-align: center; background-color: #4DA3FF; color:#fff; border-radius:15px;">
            <h1 style="font-size: 20px;"> Уважаемый (ая) ${lastname} ${firstname} ${patronymic}, ваша заявка на консультацию успешно принята. Ожидайте обратной связи! </h1>
            </div>
            `
        });
        return res.render('message', {message: "Ваша заявка успешно отправлена", code: 1});
    }catch(error){
        console.log(error);
        return res.render('message', {message: "Произошла ошибка. Повторите позже", code: 0});
    }
});

app.post('/processservices', async (req, res) => {
    const number = req.body.number;
    const action = req.body.action;
    let status;
    if(action === "delete"){
        status = "Отклонена";
        const emailQuery = 'SELECT * FROM services WHERE id = ?';
        let email = await pool.execute(emailQuery, [number]);
        await transporter.sendMail({
            from: "iponyatova57@mail.ru",
            to: email[0][0].email,
            subject: "Заявка с сайта изыскатель плюс",
            html: `
            <div style="padding: 10px; text-align: center; background-color: #4DA3FF; color:#fff; border-radius:15px;">
            <h1 style="font-size: 20px;"> Просим прощения, ваша заявке на сайте Изыскатель Плюс отклонена по определённым причинам, попробуйте снова. </h1>
            </div>
            `
        });
    }else if(action === "defer"){
        status = "Отложена";
    }else if(action === "accept"){
        status = "Принята";
    }else{
        status = "Ожидание";
    }
    const updateQuery = 'UPDATE services SET status = ? WHERE id = ?';
    pool.execute(updateQuery, [status, number]);
    res.send('Сервис успешно обновлён');
});

app.post('/getservices', (req, res) => {
    const option = req.body.message;
    if (option === 'current'){
        const query = 'SELECT * FROM services WHERE status = ?';
        let data;
        pool.execute(query, ['Ожидание'])
            .then(([rows]) => {
                data = rows;
                return res.json(rows);
            })
    }else if(option === 'all'){
        const query = 'SELECT * FROM services';
        let data;
        pool.execute(query)
            .then(([rows]) => {
                data = rows;
                return res.json(rows);
            })
    }else{
        return res.send("Error");
    }
});


app.post('/processconsultations', async (req, res) => {
    const number = req.body.number;
    const action = req.body.action;
    let status;
    if(action === "delete"){
        status = "Отклонена";
        const emailQuery = 'SELECT * FROM consultations WHERE id = ?';
        let email = await pool.execute(emailQuery, [number]);
        await transporter.sendMail({
            from: "iponyatova57@mail.ru",
            to: email[0][0].email,
            subject: "Заявка с сайта изыскатель плюс",
            html: `
            <div style="padding: 10px; text-align: center; background-color: #4DA3FF; color:#fff; border-radius:15px;">
            <h1 style="font-size: 20px;"> Просим прощения, ваша заявка на сайте Изыскатель Плюс отклонена по определённым причинам, попробуйте снова. </h1>
            </div>
            `
        });
    }else if(action === "defer"){
        status = "Отложена";
    }else if(action === "accept"){
        status = "Принята";
    }else{
        status = "Ожидание";
    }
    const updateQuery = 'UPDATE consultations SET status = ? WHERE id = ?';
    pool.execute(updateQuery, [status, number]);
    res.send('Консультация успешно обновлена');
});

app.post('/getconsultations', (req, res) => {
    const option = req.body.message;
    if (option === 'current'){
        const query = 'SELECT * FROM consultations WHERE status = ?';
        let data;
        pool.execute(query, ['Ожидание'])
            .then(([rows]) => {
                data = rows;
                return res.json(rows);
            })
    }else if(option === 'all'){
        const query = 'SELECT * FROM consultations';
        let data;
        pool.execute(query)
            .then(([rows]) => {
                data = rows;
                return res.json(rows);
            })
    }else{
        return res.send("Error");
    }
});

app.post("/saveuser", (req, res) => {
    const user = req.body;
    const updateQuery = 'UPDATE users SET firstname = ?, lastname = ?, patronymic = ?, username = ?, email = ?, role = ? WHERE id = ?';
    pool.execute(updateQuery, [user.firstname, user.lastname, user.patronymic, user.username, user.email, user.role, user.id])
    .then(() => res.send("Updated"))
    .catch((err) => res.send("Error" + err));
});

app.post("/changepassword", (req, res) => {
    const password = req.body;
    const query = 'SELECT * FROM users WHERE id = ?';
    console.log(req.body);
    pool.execute(query, [password.id])
        .then(([data]) => {
            if(bcrypt.compareSync(password.old, data[0].password)){
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(password.new, salt);
                const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
                pool.execute(updateQuery, [hashedPassword, password.id])
                .then(() => res.send("Updated"))
                .catch((err) => res.send("Error" + err));
            }else{
                res.send("0");
            }
        })
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully.');
        }
    });
};

app.post('/about', upload.fields([{ name: 'image1' }, { name: 'image2' }]), async (req, res) => {
    try {
        const { text, id } = req.body;
        const filenames = req.files ? Object.values(req.files).map(fileArray => fileArray[0].filename) : [];
        if(filenames.length === 1){
            if(filenames[0][5] == '1'){
                const query = "SELECT filename_one FROM about";
                pool.execute(query)
                    .then(data => {
                        deleteFile("./public/uploads/" + data[0][0].filename_one);
                    })
                await pool.query('UPDATE about SET filename_one = ?', [filenames[0]]);
            }else{
                const query = "SELECT filename_two FROM about";
                pool.execute(query)
                    .then(data => {
                        deleteFile("./public/uploads/" + data[0][0].filename_two);
                    })
                await pool.query('UPDATE about SET filename_two = ?', [filenames[0]]);
            }
        }else if(filenames.length === 2){
            const query = "SELECT * FROM about";
                pool.execute(query)
                    .then(data => {
                        deleteFile("./public/uploads/" + data[0][0].filename_one);
                        deleteFile("./public/uploads/" + data[0][0].filename_two);
                    })
            await pool.query('UPDATE about SET filename_one = ?, filename_two = ?', [filenames[0], filenames[1]]);
        }
        await pool.query('UPDATE about SET text = ?', [text]);
        const user = await pool.query("SELECT * from users WHERE id = ?", [id]);
        res.render('admin', {user: user[0][0]});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/imagesabout', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM about');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/servicecontent', upload.single('imageService'), async (req, res) => {
    try {
        const { id, textService } = req.body;
        if(req.file){
            const file = req.file.filename;
            const query = "SELECT filename FROM requests";
            pool.execute(query)
                .then(data => {
                    deleteFile("./public/uploads/" + data[0][0].filename);
                })
            await pool.query('UPDATE requests SET filename = ?', [file]);
        }
        await pool.query('UPDATE requests SET text = ?', [textService]);
        const user = await pool.query("SELECT * from users WHERE id = ?", [id]);
        res.render('admin', {user: user[0][0]});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/imagesrequests', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM requests');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/plusescontent', upload.single('imagePluses'), async (req, res) => {
    try {
        const { id, plusId, action, textPluses } = req.body;
        console.log(action + " " + plusId);
        if(action === "Добавить"){
            const query = "INSERT INTO pluses (filename, text) VALUES (?, ?)";
            pool.execute(query, [req.file.filename, textPluses]);
        }else if(action === "Изменить"){
            const queryDelete = "SELECT filename FROM pluses WHERE id = ?";
            pool.execute(queryDelete, [plusId])
                .then(data => {
                    console.log(data[0][0].filename);
                    deleteFile("./public/uploads/" + data[0][0].filename);
                })
            const query = "UPDATE pluses SET filename = ?, text = ? WHERE id = ?";
            pool.execute(query, [req.file.filename, textPluses, plusId]);
        }else{
            console.error(error);
            res.status(500).send('Server Error');
        }
        const user = await pool.query("SELECT * from users WHERE id = ?", [id]);
        res.render('admin', {user: user[0][0]});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/deletepluses', (req, res) => {
    const id = req.body.id;
    const plusId = req.body.plusId;
    const queryDelete = "SELECT filename FROM pluses WHERE id = ?";
    console.log(plusId);
    pool.execute(queryDelete, [plusId])
        .then(data => {
            console.log(data[0][0].filename);
            deleteFile("./public/uploads/" + data[0][0].filename);
        })
    const query = "DELETE FROM pluses WHERE id = ?";
    pool.execute(query, [plusId]);
    pool.query("SELECT * from users WHERE id = ?", [id])
        .then((data) => {res.render('admin', {user: data[0][0]})});
});

app.get('/imagespluses', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM pluses');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post("/contacts", async (req, res) => {
    try{
        const { id, phone, email, address, map } = req.body;
        const query = "UPDATE contacts  SET phone = ?, email = ?, address = ?, map = ?";
        await pool.execute(query, [phone, email, address, map]);
        const user = await pool.query("SELECT * from users WHERE id = ?", [id])
        res.render('admin', {user: user[0][0]});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


app.get('/getcontacts', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contacts');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post("/grade", async (req, res) => {
    try{
        let star = 0;
        const { service, name, text } = req.body;
        if(req.body.star){
            star = req.body.star;
        }
        const query = "INSERT INTO grades (service, name, text, star) VALUES (?, ?, ?, ?)";
        await pool.execute(query, [service, name, text, star]);
        return res.render('message', {message: "Спасибо за Ваш отзыв!", code: 1});
    } catch (error){
        console.error(error);
        return res.render('message', {message: "Что-то пошло не так, попробуйте позже.", code: 0});
    }
});

app.get("/getgrades", async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM (SELECT * FROM grades ORDER BY id DESC LIMIT 6) t ORDER BY id;');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get("/getallgrades", async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM grades');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post("/deletegrade", async (req, res) => {
    try {
        const query = "DELETE FROM grades WHERE id = ?";
        await pool.execute(query, [req.body.id]);
        res.send("Ok");
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post("/setservice", upload.fields([{ name: 'imageServicesTitle' }, { name: 'imageServicesInfo' }]), async (req, res) => {
    try {
        const { id, plusIdSer, action, titleName, titleText, infoTitle, infoText, infoSubtitle, infoList } = req.body;
        console.log(action + " " + plusIdSer);
        const filenames = req.files ? Object.values(req.files).map(fileArray => fileArray[0].filename) : [];
        if(action === "Добавить"){
            const query = "INSERT INTO services_item (title, filename, text) VALUES (?, ?, ?)";
            pool.execute(query, [titleName, filenames[0], titleText]);
            const queryTwo = "INSERT INTO services_info (title, text, filename, subtitle, list) VALUES (?, ?, ?, ?, ?)";
            pool.execute(queryTwo, [infoTitle, infoText, filenames[1], infoSubtitle, infoList]);
            const queryThree = "INSERT INTO services_list (service) VALUES (?)";
            pool.execute(queryThree, [titleName]);
        }else if(action === "Изменить"){
            const queryDelete = "SELECT filename FROM services_item WHERE item_id = ?";
            pool.execute(queryDelete, [plusIdSer])
                .then(data => {
                    console.log(data[0][0].filename);
                    deleteFile("./public/uploads/" + data[0][0].filename);
                })
            const queryDeleteTwo = "SELECT filename FROM services_info WHERE info_id = ?";
            pool.execute(queryDeleteTwo, [plusIdSer])
                .then(data => {
                    console.log(data[0][0].filename);
                    deleteFile("./public/uploads/" + data[0][0].filename);
                })
            const query = "UPDATE services_item SET title = ?, filename = ?, text = ? WHERE item_id = ?";
            pool.execute(query, [titleName, filenames[0], titleText, plusIdSer]);
            const queryTwo = "UPDATE services_info SET title = ?, text = ?, filename = ?, subtitle = ?, list = ? WHERE info_id = ?";
            pool.execute(queryTwo, [infoTitle, infoText, filenames[1], infoSubtitle, infoList, plusIdSer]);
            const queryThree = "UPDATE services_list SET service = ? WHERE id = ?";
            pool.execute(queryThree, [titleName, plusIdSer]);
        }else{
            console.error(error);
            res.status(500).send('Server Error');
        }
        const user = await pool.query("SELECT * from users WHERE id = ?", [id]);
        res.render('admin', {user: user[0][0]});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/imagesservicestitle', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM services_item');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/imagesservicestitle', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM services_item');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/deleteservice', (req, res) => {
    const id = req.body.id;
    const plusIdSer = req.body.plusIdSer;
    const queryDelete = "SELECT filename FROM services_item WHERE item_id = ?";
    pool.execute(queryDelete, [plusIdSer])
        .then(data => {
            console.log(data[0][0].filename);
            deleteFile("./public/uploads/" + data[0][0].filename);
        })
    const queryDeleteTwo = "SELECT filename FROM services_info WHERE info_id = ?";
    pool.execute(queryDeleteTwo, [plusIdSer])
        .then(data => {
            console.log(data[0][0].filename);
            deleteFile("./public/uploads/" + data[0][0].filename);
        })
    const query = "DELETE FROM services_item WHERE item_id = ?";
    pool.execute(query, [plusIdSer]);
    const queryTwo = "DELETE FROM services_info WHERE info_id = ?";
    pool.execute(queryTwo, [plusIdSer]);
    const queryThree = "DELETE FROM services_list WHERE id = ?";
    pool.execute(queryThree, [plusIdSer]);
    pool.query("SELECT * from users WHERE id = ?", [id])
        .then((data) => {res.render('admin', {user: data[0][0]})});
});

app.post('/setobjects', upload.single('imageObjects'), async (req, res) => {
    try {
        const { id, plusId, action, textObjects } = req.body;
        console.log(action + " " + plusId);
        if(action === "Добавить"){
            const query = "INSERT INTO objects (filename, text) VALUES (?, ?)";
            pool.execute(query, [req.file.filename, textObjects]);
        }else if(action === "Изменить"){
            const queryDelete = "SELECT filename FROM objects WHERE id = ?";
            pool.execute(queryDelete, [plusId])
                .then(data => {
                    console.log(data[0][0].filename);
                    deleteFile("./public/uploads/" + data[0][0].filename);
                })
            const query = "UPDATE objects SET filename = ?, text = ? WHERE id = ?";
            pool.execute(query, [req.file.filename, textObjects, plusId]);
        }else{
            console.error(error);
            res.status(500).send('Server Error');
        }
        const user = await pool.query("SELECT * from users WHERE id = ?", [id]);
        res.render('admin', {user: user[0][0]});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/imagesobjects', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM objects');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/deleteobjects', (req, res) => {
    const id = req.body.id;
    const plusId = req.body.plusId;
    const queryDelete = "SELECT filename FROM objects WHERE id = ?";
    console.log(plusId);
    pool.execute(queryDelete, [plusId])
        .then(data => {
            console.log(data[0][0].filename);
            deleteFile("./public/uploads/" + data[0][0].filename);
        })
    const query = "DELETE FROM objects WHERE id = ?";
    pool.execute(query, [plusId]);
    pool.query("SELECT * from users WHERE id = ?", [id])
        .then((data) => {res.render('admin', {user: data[0][0]})});
});

app.get('/getservicesitems', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM services_item');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/getservicesinfo', async (req, res) => {
    try {
        const id = req.body.id;
        const [rows] = await pool.query(`SELECT * FROM services_info WHERE info_id = ${id}`);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post("/exit", async (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post("/titlecontent", async (req, res) => {
    try{
        const { id, titleContent } = req.body;
        const query = "UPDATE title  SET text = ?";
        await pool.execute(query, [titleContent]);
        const user = await pool.query("SELECT * from users WHERE id = ?", [id])
        res.render('admin', {user: user[0][0]});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/gettitle', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM title');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


app.post('/download-excel', async (req, res) => {

    const id = req.body.id;
    // Путь к шаблону
    const templatePath = path.join(__dirname, 'template.xlsx');

    const query = "SELECT * FROM services WHERE id = ?";
    const service = await pool.execute(query, [id]);
    // Загрузка шаблона и заполнение данных
    XlsxPopulate.fromFileAsync(templatePath)
        .then(workbook => {
            const sheet = workbook.sheet(0);
            sheet.cell('A3').value(`Заявка №${service[0][0].id}`);
            sheet.cell('B4').value(service[0][0].lastname);
            sheet.cell('B5').value(service[0][0].firstname);
            sheet.cell('B6').value(service[0][0].patronymic);
            sheet.cell('B7').value(service[0][0].date);
            sheet.cell('B8').value(service[0][0].service);
            sheet.cell('B9').value(service[0][0].email);
            sheet.cell('B10').value(service[0][0].phone);

            return workbook.outputAsync();
        })
        .then(data => {
            // Установка заголовков для скачивания файла
            res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.end(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Ошибка при создании файла Excel');
        });
});

app.get('/getserviceslist', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM services_list');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});