const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Routes
const task = require('./routes/task.route')

// DB
mongoose.connect('mongodb://localhost:27017/todos', {useNewUrlParser: true});
let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Conexão bem sucedida");
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use('/tasks', task)


const porta = 3000
app.listen(porta, function() {
    console.log(`Backend rodando na porta ${porta}`);
})