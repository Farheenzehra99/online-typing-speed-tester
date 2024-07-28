import chalk from "chalk";
import inquirer from "inquirer";
// Function to configure the typing test
export function configureTest() {
    return inquirer.prompt([
        {
            name: 'duration',
            type: 'list',
            message: 'Choose test duration',
            choices: ['1 minute', '3 minutes', '5 minutes'],
            filter: (value) => parseInt(value.split(' ')[0])
        },
        {
            name: 'difficulty',
            type: 'list',
            message: 'Choose the difficulty level',
            choices: ['Basic Sentence', 'Random Words', 'Technical Test']
        }
    ]);
}
// Function to simulate typing test execution
export async function executeTypingTest(testConfig) {
    console.log(`Starting ${testConfig.duration} minute ${testConfig.difficulty} test...`);
    console.log(chalk.yellow("Type as much as you can in the provided time."));
    const startTime = Date.now();
    const durationMs = testConfig.duration * 60 * 1000;
    let typedText = '';
    const inputPromise = new Promise((resolve) => {
        const timeout = setTimeout(() => {
            resolve(typedText);
        }, durationMs);
        inquirer.prompt([
            {
                name: 'typing',
                type: 'input',
                message: 'Start typing:',
                validate: (value) => value.trim() !== ''
            }
        ]).then((answers) => {
            clearTimeout(timeout);
            typedText = answers.typing;
            resolve(typedText);
        });
    });
    // Wait for the duration or user input completion
    const userInput = await inputPromise;
    // Calculate typing speed
    const charactersTyped = userInput.trim().length;
    // Calculate words per minute
    const elapsedTime = (Date.now() - startTime) / 1000 / 60; // in minutes
    // Assume average word length of 5 characters
    const averageWordLength = 5;
    const wordsTyped = charactersTyped / averageWordLength;
    const wpm = elapsedTime > 0 ? Math.round((wordsTyped / elapsedTime) * 60) : 0; // Convert words per minute and round to whole number
    console.log(chalk.red(`Test completed! Your typing speed is ${wpm} WPM.`));
    return wpm;
}
