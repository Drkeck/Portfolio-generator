const fs = require("fs"); //file system
const inquirer = require("inquirer"); //npm package
const generatePage = require('./src/page-template.js'); //site builder
const profileDataArgs = process.argv.slice(2, process.argv.lenght);
const [name, github] = profileDataArgs;

inquirer
    .prompt([
    {
        type: 'input',
        name: 'name',
        message: 'what is your name?'
    }
    ])
    .then(answers => console.log(answers));
// fs.writeFile('index.html', generatePage(name,github), err => {
//     if (err) throw err;
//     console.log('portfolio complete! Check out index.html to see the output!');
// });