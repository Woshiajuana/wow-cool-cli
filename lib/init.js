
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
  let index;
  if (typeof temName === 'object' ||  !temName) {
    console.log(chalk.green('可用模板列表:'));
    for (let key in templates) {
      let repo = templates[key];
      console.log(
        '  ' + chalk.yellow('★') +
        '  ' + chalk.blue(repo.name) +
        ' - ' + repo.desc);
    }
    index = yield prompt('请选择模板类型:');
    path = temps2[temps[tempName]];
  }

  if (temps[tempName] || temps2[tempName]) {
    console.log('    ----------------------------------------');
    let projectName = yield prompt("    请输入项目名称(demo):");
    if (!projectName) {
      projectName = "demo"
    }
    console.log('    ----------------------------------------');
    downloadAndGenerate(path, projectName);
  } else {
    console.log(chalk.red(`   ✘模版[${tempName}]不存在`));
    process.exit(0);
  }
};

function downloadAndGenerate (path, projectName) {
  const spanner = ora('downloading template ...');
  spanner.start();
  download(path, process.cwd() + '/' + projectName, function (err) {
    spanner.stop();
    if (err) {
      console.log('    ', '----------------------------------------');
      console.log('    ',  chalk('x构建失败'), err);
      process.exit(0);
    }
  })
}