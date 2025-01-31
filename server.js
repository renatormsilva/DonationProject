// configure server
const express = require('express')
const server = express()

//configurar o servidor para apresentar arquivos estáticos
server.use(express.static('public'))

// habilitar body no formulário
server.use(express.urlencoded({ extended: true}))

// configurar a conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'vr81002745r',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

// configurando a template engine
const nunjucks = require('nunjucks')
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

// Lista de doadores 




// configure home page
server.get("/", function(req, res) {
    
    db.query("SELECT * FROM donors",function(err, result){
        if(err) return res.send("erro de banco de dados")
        const donors = result.rows
        return res.render("index.html", {donors})
    })
    
    
})


server.get("/medic.html",function(req, res){
    return res.render("medic.html")
})


server.get("/list.html",function(req, res){
    return res.render("list.html")
})

// start server and open door 3000
server.listen(3000, function(){
    console.log('iniciei o servidor.')
})

server.post("/", function(req, res) {
    // pegar dados no formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood
    const phone = req.body.phone

    if(name == "" || email == "" || blood == "" || phone == ""){
        return res.send("Todos os campos são obrigatórios")
    }

    // coloco valores dentro do banco de dados
    const query = 
        `INSERT INTO donors ("name", "email", "blood", "phone" )
         VALUES ($1, $2, $3, $4)`

    const values = [name, email, blood, phone]

    db.query(query, values, function(err){
        if(err) return res.send("erro no banco de dados")

        return res.redirect("/")

    })
    


    

})