import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name:{ 
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true,
    },
    // imagePath:{
    //     type:String,
    //     default:''  
    //   }   
}, 
{
    timestamps: true, //add timestamps for any operations auto
  }
);




// Match user entered password to hashed password in database in middleware
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){

        next();

    }

    // Encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10); //10 charactor password only
    this.password = await bcrypt.hash(this.password, salt);
});


//checking when login authetication registering user  password and entered password
userSchema.methods.matchPassword =async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;