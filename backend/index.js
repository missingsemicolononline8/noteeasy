const connectToMongo = require('./db');
const express = require("express");
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
connectToMongo()


app.get("/", (req,res) => {
    res.status(200)
    res.send("Hello");
})

app.listen(port,() => {
    console.log('Noteseasy backend listening on port http://localhost:',port)
});
