var express = require('express');
const brcypt = require("bcryptjs")
var router = express.Router();
const jwt = require("jsonwebtoken");
const user = require("../model/user");

//here we have tio do the following :-
// 1. Get the user input
// 2. Validate the input
// 3. Validate if the user the same email already exists the input
// 4. using Brcypt we will encrypt the password
// 5. create a user in mongodb database
// finally we need to create a signed JWT token that shall be expired after 24 hours


/* GET home page. */
router.post('/register', async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            roles
        } = req.body;

        if (!(email && password && confirmPassword && email && firstName && lastName)) {
            res.status(400).send({ errors: ["All Fields are required"] });
        }

        if (password !== confirmPassword) {
            res.status(400).send({ errors: [`The password ${password} and confirm password ${confirmPassword} does not macth !`] });
        }

        const existingUser = await user.findOne({ email })

        // console.log("EXIST   " + existingUser)
        if (existingUser) {
            return res.status(400).send({ errors: [`The user with email : ${email} already exists`] });
        }

        // encrypt the password

        const enrcyptedPassword = await brcypt.hash(password, 10);
        const userDB = await user.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: enrcyptedPassword
        });

        // creating a token with some expiry time
        const token = jwt.sign({
            id: userDB._id,
            email: email.toLowerCase(),
            roles: roles || ['user']
        }, process.env.TOKEN_KEY, { expiresIn: "2h" });
        user.token = token

        res.status(201).json({ userDB })

    } catch (error) {
        console.log(error)
        res.send(400).json({ errors: ["Bad Request contact admin 854545"] })
    }
});

router.post('/login', async (req, res, next) => {
    try {
        // implementation goes here
        const { email, password } = req.body
        // 1. get the user input from req.body {email, password}
        if (!(email && password)) {
            return res.status(400).send({ errors: [`the email is : ${email} can not be blank`, `the password can not be blank ${password}`] })
        }
        // 2. validate it see validations done in register
        const userDb = await user.findOne({ email })
        if (userDb && (await brcypt.compare(password, userDb.password))) {
            const token = jwt.sign({
                id: userDb._id,
                email: email.toLowerCase(),
                roles: userDb.roles
            }, process.env.TOKEN_KEY, { expiresIn: "2h" });
            userDb.token = token
            return res.status(201).json({ user: userDb })
        }
        return res.status(401).json({ errors: ["Invalid credentials"] });
    } catch (error) {
        console.log(error)
    }

    // 3. validate from db if the user exist if yes then proceed otherwise send a json resone stating error look at register
    // 4. if the user with email exist in database then make a token assign the expiratory time 2hrs and respond with token generated
});
module.exports = router;
