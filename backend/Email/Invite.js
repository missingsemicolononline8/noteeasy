var Mailgen = require('mailgen');

let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Noteseasy',
        link: 'https://noteseasy.online/'// this can be change according to your requirement
    }
});

module.exports = (senderName,senderEmail,note,collaboratorEmail,collaboratorDetails) => {
    const response = {
        body: {
            name: collaboratorDetails ? collaboratorDetails.name : collaboratorEmail,
            intro: `${senderName} (${senderEmail}) shared a note with you.`,
            action: {
                instructions: note.title,
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Open in Noteseasy',
                    link: `https://noteseasy.online/invite?note=${note._id}&user=${encodeURIComponent(collaboratorEmail)}`
                }
            }
        }
    }
    return MailGenerator.generate(response)
}