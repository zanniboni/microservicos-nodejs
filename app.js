//Carregando módulos
const express = require('express') //Base do app
const handlebars = require('express-handlebars') //Utilizar handlebars + express
const app = express() // Definição do nosso app
const path = require('path')
const session = require('express-session') //Usado para definir sessões do navegador
const moment = require('moment') //Gerenciar horas nas publicações

// Configurar sessão
app.use(session({
    secret: "app",
    resave: true,
    saveUninitialized: true
}))

// Middleware
//Definição de variáveis globais no app
app.use((req, res, next) => {
    next()
})
// Configurar BodyParser d o express
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Handlebars
app.engine("handlebars", handlebars({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format("DD/MM/YYYY")
        }
    }
}))
app.set('view engine', 'handlebars')
//Public
app.use(express.static(path.join(__dirname, "public")))
   
app.get("/", (req, res) => {     
    res.render("index", {index: true})
})

app.get("/dias-de-vida", (req, res) => {     

    var now = moment(new Date()); //todays date
    var end = moment("1999-12-02"); // another date
    var duration = moment.duration(now.diff(end));
    var days = duration.asDays();
    days = (Math.round(days * -1) + 1) * -1;

    res.render("index", {dias: days, diasVida: true})
})

app.get("/final-da-faculdade", (req, res) => {     
    var now = moment(new Date()); //todays date
    var end = moment("2021-12-31"); // another date
    var duration = moment.duration(now.diff(end));
    var days = duration.asDays();
    days = Math.round(days * -1) + 1;

    res.render("index", {dias: days, diasFacul: true})
})

//Outros
var PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Servidor rodando!")
})