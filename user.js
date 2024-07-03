import inquirer from "inquirer";
// function to handle user signup
export function signup() {
    return inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Enter your name',
            validate: (value) => value.trim() !== ''
        },
        {
            name: 'email',
            type: 'input',
            message: 'Enter your email:',
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        },
        {
            name: 'password',
            type: 'password',
            message: 'create a password',
            validate: (value) => value.length >= 6
        }
    ]);
}
//   function to handle user login
export function login() {
    return inquirer.prompt([
        {
            name: 'email',
            type: 'input',
            message: 'Enter Your email',
            validate: (vale) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vale.trim())
        },
        {
            name: 'password',
            type: 'input',
            message: ' Enter your password',
            mask: '*',
            validate: (value) => value.length >= 6
        }
    ]).then(() => true);
    //   Simulate a successful login
}
