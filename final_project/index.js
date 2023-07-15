const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here

    const userName = req.body.userName
    const password = req.body.password

    if(!userName || !password){
        return res.status(404).json({message: "Login Error"})
    }

    if(authenticatedUser(userName, password)){
        let accessToken = jwt.sign(
            {
                data: password,
            },
            "access",
            {expiresIn: 60 * 60}
        )

        req.session.authorization = {
            accessToken,
            userName,
        }

        return res.status(200).send("User successfully logged in")
    }
    else {
        return res.status(208).json({message: "Invalid Login. Check username and passwork"})
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
