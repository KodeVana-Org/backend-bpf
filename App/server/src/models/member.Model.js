const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: true,
        minlength: [2, `First name must be at least 1 character long.`],
        maxlength: [32, `First name must be at most 32 characters long.`],
        validate: {
          validator: function (v) {
            return /^[A-Z][a-zA-Z]*$/.test(v);
          },
          message: (props) =>
            `${props.value} is not a valid first name! First character must be capital and only letters are allowed.`,
        },
      },

    lastName: {
        type: String,
        // required: true,
        minlength: [1, `Last name must be at least 1 character long.`],
        maxlength: [32, `Last name must be at most 32 characters long.`],
        validate: {
          validator: function (v) {
            return /^[A-Z][a-zA-Z]*$/.test(v);
          },
          message: (props) =>
            `${props.value} is not a valid last name! First character must be capital and only letters are allowed.`,
        },
      },
    
    location: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
});


const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
