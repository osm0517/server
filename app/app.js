const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const router = require('./src/routers')

const port = process.env.PORT || 5000;

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : true }));
app.use("/", router);
app.use(express.static('./src/public'));

app.listen(port, () => {
    console.log(`${port}에서 서버 가동`)
})