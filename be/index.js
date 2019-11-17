const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router/router');
const passport = require('passport');





// const path = require('path');
// var history = require('connect-history-api-fallback');

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(history());
// parse application/json
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'dist')));
// passport 初始化
app.use(passport.initialize());

require('./tool/passport')(passport);

let port = 5000;

app.listen(port, () => {
    console.log("running in the " + port);
});
app.use(router);

