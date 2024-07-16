const express = require('express');
const app = express();
const axios = require('axios')
const notificationRoutes = require('./routes/notification-route'); // Import user route handlers



const bodyParser = require('body-parser')

const {MY_TOKEN, SERVER_URL} = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${MY_TOKEN}`
const URI = `/webhook/${MY_TOKEN}`
const WEBHOOK_URL = SERVER_URL+URI

app.use(express.json())
app.use(bodyParser.json())
require('dotenv').config()


// const init = async () => {
//     const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
//     console.log(res.data);
// }

// app.post(URI, async (req, res)=> {
//     console.log(req.body)
    
//     const chatId = req.body.message.chat.id
//     const text = req.body.message.text

//     await axios.post(`${TELEGRAM_API}/sendMessage`, {
//         chat_Id : chatId,
//         text: text
//     })
// })


const PORT = process.env.PORT || 3002

app.use('/', notificationRoutes);

app.listen(PORT, async () => {
    console.log(`Notification Service is running on port ${PORT}`);
    // await init()
});
