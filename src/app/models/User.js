const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema ({
    name: {
        type: String,
        required: false
    }, 
    email: {
        type: String,
        required: true,
    },
    cpf:{
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    birthDay:{
        type: String, 
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    password :{
        type: String, 
        required: true
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    }
},{
    timestamps: true
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash; 
    next();
});

module.exports  = model("User", UserSchema);