const { sendEmailHandler, sendTelegramHandler } = require("../handlers/notification-handler")

const sendEmailController = async(req, res) => {
    try{
        const {email, newsContent} = req.body
        await sendEmailHandler(email, newsContent) //need to do validation
        res.status(200).json({message: "Email sent succesfully"})
    }catch (error) {
        console.error('Error sending email:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}


const sendTelegramController = async(req, res) => {
    try{
        const {email, newsContent} = req.body
        await sendTelegramHandler(email, newsContent) //need to do validation
        res.status(200).json({message: "Email sent succesfully"})
    }catch (error) {
        console.error('Error sending email:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    sendEmailController,
    sendTelegramController
}