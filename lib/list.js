
const chalk = require('chalk');
const templates = require("../template.json");


for (let key in templates) {
  let repo = templates[key];
  console.log(
    '  ' + chalk.yellow('★') +
    '  ' + chalk.blue(repo.name) +
    ' - ' + repo.desc);
}