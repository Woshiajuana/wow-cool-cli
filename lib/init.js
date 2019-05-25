
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const download = require('download-git-repo');
const ora = require('ora');

const templates = require("../template.json");

module.exports = function (temName) {
  co(generator(temName));
};

let generator = function *(temName) {
  console.log('wow-cli init start generator project...\n');
  if (typeof temName === 'object' ||  !temName) {
    console.log('list of available templates:');
    for (let key in templates) {
      let repo = templates[key];
      console.log(`   ${chalk.green(repo.name)} : ${repo.desc}`);
    }
    temName = yield prompt('\nplease select the template type: ');
  }
  let template = templates[temName];
  if (!template) {
    console.log(chalk.red(`\n✘template [${temName}] not found`));
    process.exit(0);
  }
  let projectName = yield prompt('please enter the project name (wow-demo): ');
  if (!projectName) projectName = 'wow-demo';
  downloadAndGenerate(template, projectName);
};

function downloadAndGenerate (template, projectName) {
  const spanner = ora('downloading template ...');
  spanner.start();
  try {
    download(template.path, process.cwd() + '/' + projectName, function (err) {
      spanner.stop();
      if (err) {
        console.log(chalk.red('\n✘generator fail:'), err);
      } else {
        console.log(chalk.green('\n✔generator success:'), err);
      }
      process.exit(0);
    })
  } catch (err) {
    spanner.stop();
    console.log(chalk.red('\n✘generator fail:'), err);
    process.exit(0);
  }
}