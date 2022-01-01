const { query } = require("express");
const express = require("express");
const app = express();
const nunjucks = require("nunjucks")
const PORT = 3000;
const urlencodedParser = express.urlencoded({ extended: true });
const IP = '192.168.88.241';

let datas = {
    'rooms': {}
}

function randomString(i) {
    var rnd = "";
    while (rnd.length < i)
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};

nunjucks.configure("templates", {
    autoescape: true,
    express: app
})
app.use("/static", express.static("static"));
app.get("/", function (req, res) {
    res.render("index.njk");
});
app.post("/server", urlencodedParser, function (req, res) {
    data = req.body;
    data.ip = IP;
    url = randomString(10);
    data.url = url;
    datas['rooms'][url] = {};
    Object.assign(datas['rooms'][url], {
            'label_game':data.label_game,
            'creator': '',
            'party': {},
            'cost': data.cost,
            'date_start': data.date_start,
            'date_stop': data.date_stop,
            'random': {}
    })
    console.log(datas)
    res.render("game.njk", data)
});
app.get("/join/:room", function (req, res) {
    res.render("join.njk", {room:req.params.room});
});
app.post("/joining_in_room",urlencodedParser,  function (req, res) {
    let data_user = req.body;
    console.log(data_userSS);
    // datas['rooms']
    // data.url = url;
    // datas['rooms'][url] = {};
    // Object.assign(datas['rooms'][url], {
    //         'label_game':data.label_game,
    //         'creator': '',
    //         'party': {},
    //         'cost': data.cost,
    //         'date_start': data.date_start,
    //         'date_stop': data.date_stop,
    //         'random': {}
    // })
    console.log(data_user)
    console.log('-----------------------Сверху data_user а снизу data-----------------------')
    console.log(data)
    console.log('-----------------------Сверху data а снизу datas-----------------------')
    res.render("new_user.njk", data);
});
app.get("/join/:url", function (req, res) {
    res.render("join.njk", data);
});
app.get("/upload", function (req, res) {
    console.log("===ПРИГЛАСИТЬ===")
    res.render("upload.njk", data);
});
app.listen(PORT, IP, function () {
    console.log("===СЕРВЕР ЗАПУЩЕН===");
});