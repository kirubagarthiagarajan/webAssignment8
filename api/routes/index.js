const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');


//get all Users
router.get('/user/getAll', (req, res) => {
    User.find({}, (err, data) => {
        if (!err) {
            res.send(data);
        }
        else {
            console.log(err);
        }
    })
});

//save User
router.post('/user/create', (req, res) => {

    let nameRegex = /^[a-zA-Z ]+$/;
    let mailRegEx = /^[A-Za-z][A-Za-z0-9._%+-]{0,63}@northeastern.edu$/;
    let passwordRegEx = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    if (!req.body.fullName || !req.body.email || !req.body.password) {
        res.status(500).json({ code: 500, message: 'Full Name, Password and E-mail are required to create a User!' })
    }
    else if (!req.body.fullName.match(nameRegex)) {

        res.status(500).json({ code: 500, message: 'Full Name contains only alphabets and spaces!' })
    }
    else if (!req.body.email.match(mailRegEx)) {

        res.status(500).json({ code: 500, message: 'E-mail should be of format yourmail@northeastern.edu' })
    }
    else if (!req.body.password.match(passwordRegEx)) {

        res.status(500).json({ code: 500, message: 'Password should be strong. Password should atleast be 8 characters long, and contain atleast one upper case letter, one lower case letter, one digit and one special character!' })
    }
    else {
        const userData = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        });
        userData.save((err, data) => {
            if (!err) {

                res.status(200).json({ code: 200, message: 'User Created!', createdUser: data })
            } else {
                console.log(err);
            }
        });
    }
});


//login user
router.post('/user/login', (req, res) => {

    let mailRegEx = /^[A-Za-z][A-Za-z0-9._%+-]{0,63}@northeastern.edu$/;
    if (!req.body.email || !req.body.password) {

        res.status(200).json({ code: 199, message: 'Password and E-mail are required to login!' })
    }

    else if (!req.body.email.match(mailRegEx)) {

        res.status(200).json({ code: 401, message: 'E-mail should be of format yourmail@northeastern.edu' })
    }
    else {

        const filter = { email: req.body.email, password: req.body.password };

        User.findOne(filter, (err, data) => {
            if (!err && data != null) {

                res.status(200).json({ code: 200, message: 'Logged in!' });
            } else if (data == null || !data.length > 0) {

                res.status(200).json({ code: 500, message: 'Entered user name or password is incorrect' });
            }
            else if (err) {
                console.log(err);
            }
        });
    }
});


//updateUser
router.put('/user/edit/:email', async (req, res) => {
    let nameRegex = /^[a-zA-Z ]+$/;
    let passwordRegEx = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    if (!req.body.fullName.match(nameRegex)) {

        res.status(500).json({ code: 500, message: 'Full Name contains only alphabets and spaces!' })
    }
    else if (!req.body.password.match(passwordRegEx)) {

        res.status(500).json({ code: 500, message: 'Password should be strong. Password should atleast be 8 characters long, and contain atleast one upper case letter, one lower case letter, one digit and one special character!' })
    }
    else {
        const filter = { email: req.params.email };
        req.body.password = await bcrypt.hash(req.body.password, 15);

        const update = { fullName: req.body.fullName, password: req.body.password };

        User.findOneAndUpdate(filter, update, { new: false, upsert: false }, (err, data) => {
            if (!err && data != null) {
                res.status(200).json({ code: 200, message: 'User Updated Successfully' });
            } else if (data == null) {
                res.status(500).json({ code: 500, message: 'No User found with this E-mail' });
            }
            else if (err) {
                console.log(err);
            }
        });
    }


});

// Delete User
router.delete('/user/delete/:email', (req, res) => {
    const filter = { email: req.params.email };
    User.findOneAndDelete(filter, (err, data) => {
        if (!err & data != null) {
            res.status(200).json({ code: 200, message: 'User deleted', deletedUser: data })
        } else if (data == null) {
            res.status(500).json({ code: 500, message: 'No User found with this E-mail' });
        }
        else if (err) {
            console.log(err);
        }
    });
});



module.exports = router;