

const sendgridMail = require("@sendgrid/mail")

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

 
    // function emailEmailConfirmationInstructions(email, name, token) {
    //     // setup email data
    //     let mailOptions = {
    //         from: '"Blokkah Support" <mail@blokkah.io>', // sender address
    //         to: email, // list of receivers
    //         subject: 'Welcome to Blokkah - Please Confirm Your Email', // Subject line
    //         html: '<b>Hi </b>' +  name + '<br>Please click the link below to confirm your email address<br><br><button><a href="' + config.get('frontend_urls.email_confirmation_base_url') + '/' + token + '">Confirm Your Email Address</a></button>',
    //         text :""
    //     };

    //    triggerEmail(mailOptions);
    // }
    function emailPasswordResetInstructions(email, name, token) {
  
        let mailOptions = {
            from: 'mail@blokkah.io', // sender address
            to: email, // list of receivers
            subject: 'Blokkah - Password Reset', // Subject line
            html: `
                <p>Hi ${name},</p>
                <p>Please use the following token to reset your password:</p>
                <p><strong>${token}</strong></p>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p>Thank you,<br>The Blokkah Team</p>
            `,
            text: `Hi ${name},\nPlease use the following token to reset your password:\n${token}\nIf you did not request a password reset, please ignore this email.\n\nThank you,\nThe Blokkah Team`
        };
        

       triggerEmail(mailOptions);
    }
    function emailNewPasswordGeneration(email, name, token) {
  
        let mailOptions = {
            from: 'mail@blokkah.io', // sender address
            to: email, // list of receivers
            subject: 'Blokkah - Account Registration', // Subject line
            html: `
                <p>Hi ${name},</p>
                <p>Please use the following password to access your account:</p>
                <p><strong>${token}</strong></p>
                <p>Thank you,<br>The Blokkah Team</p>
            `,
            text: `Hi ${name},\nPlease use the following password to access your account:\n${token}\nthen change it using your own password.\n\nThank you,\nThe Blokkah Team`
        };
        

       triggerEmail(mailOptions);
    }

    // function emailPasswordResetConfirmation(email, name) {
    //     // setup email data with unicode symbols
    //     let mailOptions = {
    //         from: '"Blokkah Support" <mail@blokkah.io>', // sender address
    //         to: email, // list of receivers
    //         subject: 'Blokkah - Password Reset Successful', // Subject line
    //         html: '<b>Hi </b>' +  name + '<br>Your password has been successfully reset.<br><br>',
    //         text: ""
    //     };

    //     triggerEmail(mailOptions);
    // }
 

    function triggerEmail(mailOptions) {
        sendgridMail.send(mailOptions, (error, result) => {
            if (error) {
              console.log("Error While Sending Mail")
            } else {
            console.log("Email is Sent");
            }
        });
    }
    


    module.exports = {
        // emailEmailConfirmationInstructions,
        emailPasswordResetInstructions,
        emailNewPasswordGeneration
        // emailPasswordResetConfirmation
    }


 