const dotenv = require('dotenv')

dotenv.config()

async function _send_email(password){
    try{

        let emaiTemplateHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <main style="width: 100%; height: max-content;">
                    <section style="width: 100%; max-width: 500px; margin: 100px auto;">
                        <header style="height: 50px; width: 100%; background-color: #581845; border-top-right-radius: 10px; border-top-left-radius: 10px;"></header>
                        <section style="padding: 50px 25px 25px 25px">
                            <h2 style="font-family: 'Trebuchet MS', Arial, sans-serif;">Superuser informations:</h2>
                        </section>
                        <section style="padding: 0 25px; margin-top: 15px; margin-bottom: 50px;">
                            <div style="display: flex; align-items: center;">
                                <h4 style="font-family: 'Trebuchet MS', Arial, sans-serif; margin: 0; padding: 0;">Name: </h4><p style="font-family: 'Trebuchet MS', Arial, sans-serif; margin-left: 10px;">${process.env.SUPERUSER_NAME}</p>
                            </div>
                            <div style="display: flex; align-items: center; margin-top: 15px; padding: 0;">
                                <h4 style="font-family: 'Trebuchet MS', Arial, sans-serif; margin: 0; padding: 0;">Email: </h4><p style="font-family: 'Trebuchet MS', Arial, sans-serif; margin-left: 10px;">${process.env.SUPERUSER_EMAIL}</p>
                            </div>
                            <div style="display: flex; align-items: center; margin-top: 15px; padding: 0;">
                                <h4 style="font-family: 'Trebuchet MS', Arial, sans-serif; margin: 0; padding: 0;">Initial password: </h4><p style="font-family: 'Trebuchet MS', Arial, sans-serif; margin-left: 10px;">${password}</p>
                            </div>
                            <div style="margin-top: 25px;">
                                <a href="https://portfolio-4n0j.onrender.com/authentication/login" target="_blank">
                                    <button style="padding: 10px 13px;background-color: yellow;border: none;border-radius: 5px;box-shadow:1px 1px 10px #9797972d, -1px -1px 10px #90909035;cursor: pointer;color: #000;font-weight: bold;transition: 0.1s;outline: none;">Login</button>
                                </a>
                            </div>
                        </section>
                        <footer  style="height: 50px; width: 100%; background-color: #581845; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;"></footer>
                    </section>
                </main>
            </body>
            </html>
        `

        let EMAIL = {
            name: "Email from PORTFOLIO_3 platform.",
            subject: "Superuser creation.",
            sender : {
                name: "PORTFOLIO_3",
                email: "franciscoialy43@gmail.com"
            },
            to: [{
                name: `${process.env.SUPERUSER_NAME}`,
                email: `${process.env.SUPERUSER_EMAIL}`
            }],
            htmlContent: emaiTemplateHTML
        }

        await axios({
            method: 'POST',
            url: process.env.EMAIL_SERVER_URL,
            data: EMAIL,
            headers: {
                "Content-Type" : "application/json",
                "api-key" : process.env.EMAIL_API_KEY
            }
        }).then(() => {
            console.log("Superuser login sent to superuser email.")    
        }).catch((err) => {
            console.log({
                message: "Error sending superuser login to user email.",
                error: err
            })
        })
    }catch(_error){
        console.log({
            message: "Error sending superuser login to user email.",
            error: _error
        })
    }
}

module.exports = {
    send_email : _send_email
}