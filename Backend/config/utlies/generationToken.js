const jwt =require('jsonwebtoken')

const generationToken=(id)=>
{
    return jwt.sign({id},"raman1234")
};
module.exports=generationToken;