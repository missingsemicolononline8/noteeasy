const mongoose = require('mongoose');
const {Schema} = mongoose;
const inviteSchema = new Schema({
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'notes'
    },
    collaboratorEmail : {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
              return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    }
});

module.exports = mongoose.model('invite',inviteSchema);
 