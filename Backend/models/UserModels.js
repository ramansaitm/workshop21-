const passwordComplexity = require("joi-password-complexity");
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs');
const res = require("express/lib/response");
const USerSchema=mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
        },
        phone:{
            type:String,
            require:true,
        },

        email:{
            type:String,
            require:true,
            unique :true,
        },
        password:{
            type:String,
            require:true,        },
        isAdmin:{
            type:Boolean,
            default:false,
            require:true,
        },
        pic: {
            type: String,
            required: true,
            default:
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
          },
        },
        {
          timestamps: true,
        }
);

USerSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
        next();
    }
   const salt=await bcrypt.genSalt(10)
   this.password=await bcrypt.hash(this.password,salt)
});

USerSchema.methods.matchPassword=async function (enterPassword)
{
    return await bcrypt.compare(enterPassword,this.password)
}
const User=mongoose.model("user",USerSchema)
module.exports=User;
