
// 引入依赖
let program = require('commander');
let package = require('./package.json');
// let init = require('./bin/init');
// let list = require('./bin/list');

// 定义版本和参数依赖
program
  .usage('<command>')
  .version(package.version, '-v, --version');

program.command('init (template)')
  .description("Generate a new project")
  .alias('i')
  .action(function(template){
    console.log('init',template)
    // init(template);
  });

program.command('list')
  .description("List all the templates")
  .alias('l')
  .action(function(template){
    console.log('list',template)
    // list();
  });

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
