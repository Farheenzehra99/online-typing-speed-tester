import chalk from 'chalk';
import { signup, login, User } from './user.js';
import { configureTest, executeTypingTest, TestConfig } from './testconfig.js';
import inquirer from 'inquirer';

// Function to greet the user and provide introduction
function welcomeAndIntroduction(): void {
    console.log(chalk.bold.bgYellowBright('Welcome to the Typing Speed Tester!'));
    console.log(chalk.blueBright('Let\'s measure your typing speed in Words Per Minute (WPM).'));
    console.log();
}

// Function to handle exit or restart
async function exitOrRestart(): Promise<boolean> {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Would you like to exit or restart the test?',
            choices: ['Exit', 'Restart']
        }
    ]);

    if (answer.action === 'Exit') {
        console.log(chalk.bold.bgRed('Thank you for using the Typing Speed Tester!'));
        console.log(chalk.greenBright('Remember, practice makes perfect. Keep improving your typing skills!'));
        return true;
    } else {
        return false;
    }
}

// Main function to run the typing speed tester application
async function main() {
    welcomeAndIntroduction();

    const users: User[] = [];

    // Sign up a new user
    const newUser: User = await signup();
    users.push(newUser);
    console.log(chalk.green(`Welcome, ${newUser.name}! You are successfully signed up.`));

    // Log in
    let isLoggedIn = false;
    let currentUser: User | null = null;
    while (!isLoggedIn) {
        currentUser = await login(users);
        if (currentUser) {
            isLoggedIn = true;
            console.log(chalk.bgYellowBright(`Welcome back, ${currentUser.name}!`));
        } else {
            console.log(chalk.red('Invalid email or password. Please try again.'));
        }
    }

    let exit = false;
    while (!exit) {
        // Configure test
        const testConfig: TestConfig = await configureTest();
        console.log(chalk.green(`Test duration: ${testConfig.duration} minutes, Difficulty: ${testConfig.difficulty}`));

        // Execute typing test
        const typingSpeed: number = await executeTypingTest(testConfig);
        console.log(chalk.blue(`Your typing speed is ${typingSpeed} WPM.`));

        // Exit or Restart
        exit = await exitOrRestart();
    }
}

// Run the main function
main();
