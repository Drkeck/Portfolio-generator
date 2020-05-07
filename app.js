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
        message: 'what is your name?'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your github?'
    },
    {
        type: 'input',
        name: 'about',
        message: 'Provide some info about you'
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
            message: 'what is the name of your project'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of your project (required)'
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
            message: 'enter github link to your project (required)'
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
    });

// fs.writeFile('index.html', generatePage(name,github), err => {
//     if (err) throw err;
//     console.log('portfolio complete! Check out index.html to see the output!');
// });