const inquirer = require("inquirer");
const puppeteer = require("puppeteer");
const login = require("./login");

inquirer
.prompt(
    [
        {
            type : "input",
            message : "Enter Your Email",
            name : "email"
        },
        {
            type: "password",
            message: "Enter Your Password",
            name : "password",
            mask : true
        }
    ]
)
.then(answers => {
    const {email , password} = answers;
    if(validateEmail(email))
        login(email,password);
    else
        console.log(`Entered Email ID ${email} is not valid , Enter Other Email Address`);
})
.catch(err => {
    console.log("Some Error occurred");
});

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}