import inquirer from "inquirer";

// Define types for users
export type User = {
    name: string;
    email: string;
    password: string;
};

// Function to handle user signup
export function signup(): Promise<User> {
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
            message: 'Enter your email',
            validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        },
        {
            name: 'password',
            type: 'password',
            message: 'Create a password',
            validate: (value: string) => value.length >= 6
        }
    ]);
}

// Function to handle user login
export function login(users: User[]): Promise<User | null> {
    return inquirer.prompt([
        {
            name: 'email',
            type: 'input',
            message: 'Enter your email',
            validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        },
        {
            name: 'password',
            type: 'password',
            message: 'Enter your password',
            mask: '*',
            validate: (value: string) => value.length >= 6
        }
    ]).then(answers => {
        const user = users.find(u => u.email === answers.email && u.password === answers.password);
        return user || null;
    });
}
