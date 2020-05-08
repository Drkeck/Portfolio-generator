const fs = require("fs"); //file system
const inquirer = require("inquirer"); //npm package
const generatePage = require('./src/page-template.js'); //site builder
const profileDataArgs = process.argv.slice(2, process.argv.lenght);
const [name, github] = profileDataArgs;

const promptUser = () => {
    return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'what is your name? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('please enter your name.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your github? (required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('please enter your github.');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some info for an "about me" section?',
        default: true
    },
    {
        type: 'input',
        name: 'about',
        message: 'Provide some info about you',
        when: ({confirmAbout}) => confirmAbout
    }
    ]);
};

const promptProject = portfolioData => {
   
    if(!portfolioData.projects) {
        portfolioData.projects = []
    }
    console.log(`
    =================
    Add a New project
    =================
    `);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'what is the name of your project',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('please enter project name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of your project (required)',
            validate: desInput => {
                if (desInput) {
                    return true;
                } else {
                    console.log('please enter desription.');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'what properties did you use in this project? (check all that apply)',
            choices: ['javascript', 'html', 'css', 'ES6', 'jquery', 'bootstrap', 'node']

        },
        {
            type: 'input',
            name: 'link',
            message: 'enter github link to your project (required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('please enter github link.');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'ConfirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.ConfirmAddProject) {
            return promptProject(portfolioData);
        }else{
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
        const pageHTML = generatePage(portfolioData);
        fs.writeFile('index.html', pageHTML, err => {
        if (err) throw err;
        console.log('portfolio complete! Check out index.html to see the output!');
    });
 });