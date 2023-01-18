const nodemailer = require('../config/nodemailer');
const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {

    let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
       from: 'kanhus082@gmail.com',
       to: comment.user.email,
       subject: "Hi subham; New Comment Published at Codeal!",
       html: htmlString  
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}