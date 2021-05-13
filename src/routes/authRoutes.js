const express = require('express');
const mongoose = require('mongoose');
const jtw = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup',async (req,res) =>{

    const {email,password} = req.body;

    try{
        const user = new User({email,password});

        await user.save()
    
        const token = jtw.sign({userId: user._id},'MY_SECRET_KEY');

        res.send({token:token});
    }
    catch(err)
    {
        res.status(422).send(err.message);
        return res;
    }



});

router.post('/signin',async (req,res) => {

    const {email,password} = req.body;

    if(!email || !password)
    {
        return res.status(422).send({error:'Must provide email and password'});
    }

    const user = await User.findOne({email:email});

    if(!user){
        return res.status(422).send({error:'Invalid password or email'});
    }

    try
    {
        await user.comparePassword(password);
        const token = jtw.sign({userId:user._id},'MY_SECRET_KEY');
        res.send({token:token});
    }
    catch(err)
    {
        return res.status(422).send({error:'Invalid password or email'});
    }


});

module.exports = router;