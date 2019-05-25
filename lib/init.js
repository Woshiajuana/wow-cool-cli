
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const templates = require("../template.json");
const download = require('download-git-repo');
const ora = require('ora');
const fs  = require('fs');
const exists = require('fs').existsSync
const rm = require('rimraf').sync;

let temps = {};
let temps2 = {};

module.exports = function (name) {
  getTemps(templates);
  co(generator(name));
};

function getTemps (templates) {
  for (let key in templates) {
    let item = templates.list[key];
    temps[key] = item.name;
    temps2[item.name] = item.path;
  }
}

let generator = function *(name) {
  let tempName = name;
  let path = temps2[name];
  if (typeof name === 'object' ||  !name) {
    console.log('    可用模板列表:');
    for( let key in temps) {
      let tempName = temps[key];
      console.log(
        '     ' + chalk.green(key) +
        ' : ' + chalk.green(tempName))
    }
    tempName = yield prompt("    请选择模板类型:");
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