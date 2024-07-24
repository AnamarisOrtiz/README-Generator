// TODO: Include packages needed for this application
const fs = require('fs'); 
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Welcome to the README generator, To start, please provide your full name:' ,
        validate: nameInput => {
            if (nameInput) {
                return true;

            } else {
                console.log('Please enter your name!');
                return false;
            }
        }
    }, 
    {
        type: 'input', 
        name: 'github',
        message: 'Enter your GitHub username:',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('It is important to link your GitHub repo so users know where to find more of your work!');
                return false;
            }
        }

    },
    {
        type: 'input', 
        name: 'email',
        message: 'Enter your email address:',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('It there are any questions provide a way for a user to contact you!');
                return false;
            }
        }

    },
    {
        type: 'input', 
        name: 'title',
        message: 'What is the title of your project?',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Every project requires a title. Please enter one!');
                return false;
            }
        }

    },
    {
        type: 'input', 
        name: 'description',
        message: 'Enter your project description:',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('It is important to provide a description of your project');
                return false;
            }
        }

    },
    {
        type: 'input',
        name: 'installation',
        message: 'Instructions for installation?',
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('Please provide instructions for installation to ensure users have the correct software to run your program!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Instructions for usage:',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Providing instructions for usage will help users properly navigate your project. Please try again.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'How can others contribute to this project?',
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                console.log('Please provide instructions on how others can contribute to your project.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Describe the tests and how to use them:',
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('Please provide instructions on how others can contribute to your project.');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmLicenses',
        message: 'Would you like to include a license?',
        default: false
    },
    {
        type: 'list',
        name: 'licenses',
        message: 'Which license would you like to include?',
        choices: ['MIT', 'GPL', 'CC--0', 'Boost', 'Apache', 'IBM'],
        when: ({ confirmLicenses }) => {
            if (confirmLicenses) {
                return true;
            } else {
                return false;
            }
        }
    },

];

// TODO: Create a function to write README file [also function not const fileName before data]
function writeToFile (fileName, data) {
  
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, err => {
            if (err) {
                reject (err);
                return;
            }
            resolve({
                ok: true,
                message: console.log('Sucessfully generated README , move into the "dist" folder to check it out!')
            });
        })
    })
}

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions);
}

// Function call to initialize app
init()
.then(userInput => {
    return generateMarkdown(userInput);
})
.then((readmeInfo ) => {
    return writeToFile("./dist/README.md", readmeInfo);
})
.catch(err => {
    console.log(err);
})

