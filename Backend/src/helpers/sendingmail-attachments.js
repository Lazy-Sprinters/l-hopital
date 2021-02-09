const nodemailer=require('nodemailer');

const transporter=nodemailer.createTransport({
      service: 'gmail',
      auth:{
            user:'r20324pavitra@dpsrkp.net',
            pass:'PASSWORD'
      }
});
const mailOptions = {
      from: 'r20324pavitra@dpsrkp.net',
      to: 'anurajag117@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'that was easy',
      attachments:[
            {
                  filename:'test1.pdf',
                  path:'../../../../Pavitra Resume.pdf',
                  contentType:'application/pdf'
            }
      ]
}

let status=transporter.sendMail(mailOptions);
