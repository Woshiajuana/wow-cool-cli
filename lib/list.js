
const chalk = require('chalk');
const templates = require("../template.json");

templates.forEach(repo => {
  console.log(
    '  ' + chalk.yellow('★') +
    '  ' + chalk.blue(repo.name) +
    ' - ' + repo.desc);
});