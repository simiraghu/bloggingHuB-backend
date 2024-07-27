const express = require('express')
const app = express()
const router = require('./router/index');
const cors = require('cors')
const bodyParser = require('body-parser');


require('dotenv').config()
require('./db/db')

app.use(express.json())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors())
app.use(router)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
})
