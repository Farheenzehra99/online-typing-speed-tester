import inquirer from "inquirer";

//  Define types for uses

export type user = {
    name: string;
    email: string;
    passward: string;
};

// function to handle user signup

export function signup(): Promise<user>{
    return inquirer.prompt([
    {
        name: 'name',
        type: 'input',
        message: 'Enter your name',
        validate: (value: string) => value.trim() !== ''
    },
    {
        name: 'email',
        type: 'input',
        message:'Enter your email:',
        validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
    },
    {
        name: 'password',
        type: 'password',
        message: 'create a password',
        validate: (value: string | any[]) => value.length >= 6

    }

    ]);
}
 
//   function to handle user login
export function login(): Promise<boolean> {
     return inquirer.prompt([
        {
            name: 'email',
            type: 'input',
            message: 'Enter Your email',
          validate: (vale: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vale.trim())
        },
       {
            name: 'password',
            type: 'input',
            message:' Enter your password',
            mask: '*',
            validate: (value: string | any[]) => value.length >= 6
        }
     ]).then(() => true);    
    //   Simulate a successful login

}  