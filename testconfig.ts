#! user/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

//  define types for test configuration

export type TestConfig = {
    duration: Number; // duration in minutes
    difficulty: 'basic' |'intermediate'| 'advance';
};

//  function to configure the typing test
export function configureTest(): Promise<TestConfig> {
    return inquirer.prompt([
        {
            name: 'duration',
            type: 'list',
            message: 'choose test duration',
            choices: ['1 minute', '3 minutes','5 minutes'],
            filter: (value: string) => parseInt(value.split('')[0])
        },
        {
            name: 'difficulty',
            type: 'list',
            message: 'choose the difficulty level',
            choices: ['Basic Sentence', 'Random Words', 'Technical Test'],
        }
    ])
}

//  Function to simulate typing test execution
export async function executeTypingTest(testConfig: TestConfig): Promise<number> {
    console.log(`Starting ${testConfig.duration} minute ${testConfig.difficulty} test...`);
    // Wait for the specified duration
    await new Promise(resolve => setTimeout(resolve, (testConfig.duration as number) * 60 * 1000)); // Convert minutes to milliseconds
    // Simulate typing test logic
    const wpm = Math.floor(Math.random() * 50) + 50; // Random WPM between 50 to 100
    console.log(chalk.red(`Test completed! Your typing speed is ${wpm} WPM.`));
    return wpm;
}