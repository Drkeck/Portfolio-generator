const fs = require("fs");
const generatePage = require('./src/page-template.js');
const profileDataArgs = process.argv.slice(2, process.argv.lenght);
const [name, github] = profileDataArgs;
// const printProfileData = profileDataArr => {
//     for (let i = 0; i < profileDataArr.length; i += 1) {
//         console.log(profileDataArr[i]);
//     }
//     console.log('==============================');
//     profileDataArr.forEach(profileItem => console.log(profileItem));
// }

// printProfileData(profileDataArgs);


fs.writeFile('index.html', generatePage(name,github), err => {
    if (err) throw err;

    console.log('portfolio complete! Check out index.html to see the output!');
});