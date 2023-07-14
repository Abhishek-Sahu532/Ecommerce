const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.register = async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password,(saltOrRounds = 10))
    })
    try{
const savedUser  = await newUser.save();
return res.status(201).json(savedUser)
    }catch(e){

        return res.status(500).send(e)
    }
} 




exports.login = async (req,res)=>{
    try {
        
        const user  = await User.findOne({username: req.body.username})
   
        !user && res.status(404).json({msg:"User not found"}) // alternative of IFElse
        
        const inputPassword = req.body.password;
        
        const originalPassword = await bcrypt.compare(inputPassword, user.password); //it will check or compare the with saved password with user entered password

        originalPassword != inputPassword && res.status(401).json({msg: 'Wrong Password'}) //alterternative of IFElse

        const accessToken = jwt.sign( //CHECK THE USER IS ADMIN OR NOT
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            'secret',
            {expiredIn: '3d'}  //WILL EXPIRES AFTER THE 3 DAY, 3D STANDS FOR 3 DAY , 4D STANDS FOR 4 DAY
        );

        const  {password, ...other} = user._doc; //getting an object password, and other things //destructuring
        
        res.status(200).json({...other, accessToken})
   
    } catch (error) {
        return res.status(500).send(e)
    }
}