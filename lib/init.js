
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const templates = require("../template.json");
const download = require('download-git-repo');
const ora = require('ora');
const fs  = require('fs');
const exists = require('fs').existsSync;
const rm = require('rimraf').sync;

module.exports = function (temName) {
  co(generator(temName));
};

let generator = function *(temName) {
  console.log('wow-cli init start generator project...');
  if (typeof temName === 'object' ||  !temName) {
    console.log('\nlist of available templates:');
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
        process.exit(0);
      }
    })
  } catch (err) {
    spanner.stop();
    console.log(chalk.red('\n✘generator fail:'), err);
    process.exit(0);
  }
}